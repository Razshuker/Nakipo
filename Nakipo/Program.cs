using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MySqlConnector;
using Nakipo.Configurations;
using Nakipo.Models;
using Nakipo.Repositories;
using Nakipo.Services;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ApplicationConfiguration.HashToken))
        };
    });

builder.Host.UseNLog();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo() { Title = "Nakipo", Version = "v1" });
});

builder.Services.AddHealthChecks()
    .AddCheck("default", () => HealthCheckResult.Healthy());


// builder.Services.AddMySqlDataSource(ApplicationConfiguration.DbSettings.MysqlConnectionString);
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection(nameof(MongoDBSettings)));
builder.Services.AddSingleton<MongoDbContext>(_ => new MongoDbContext(ApplicationConfiguration.DbSettings.MongodbConnectionString, ApplicationConfiguration.DbSettings.MongodbDatabase));
builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<IWalletService, WalletService>();
builder.Services.AddSingleton<IWalletRepository, WalletRepository>();
builder.Services.AddSingleton<IRatingService, RatingService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowCredentials()     
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithExposedHeaders("Authorization");
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        // Disable caching in development
        if (app.Environment.IsDevelopment())
        {
            ctx.Context.Response.Headers["Cache-Control"] = "no-cache, no-store";
        }
    }
});
app.UseRouting();
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Nakipo"));
app.Use(async (context, next) =>
{
    context.Response.Headers["Cache-Control"] = "no-store, must-revalidate";
    await next();
});
app.UseHttpsRedirection();
// app.UseAuthentication();
// app.UseAuthorization();
app.UseCors("AllowReactApp");
app.MapHealthChecks("/health");
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");


app.Run();

