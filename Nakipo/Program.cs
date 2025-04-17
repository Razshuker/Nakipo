using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.OpenApi.Models;
using MySqlConnector;
using Nakipo.Configurations;
using Nakipo.Repositories;
using Nakipo.Services;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);

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



builder.Services.AddMySqlDataSource(ApplicationConfiguration.DbSettings.MysqlConnectionString);
builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddSingleton<IUserRepository, UserRepository>();

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
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Weights Tracker"));
app.Use(async (context, next) =>
{
    context.Response.Headers["Cache-Control"] = "no-store, must-revalidate";
    await next();
});
app.UseHttpsRedirection();
// app.UseAuthentication();
// app.UseAuthorization();
app.MapHealthChecks("/health");
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");


app.Run();
