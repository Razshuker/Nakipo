import {s3Url} from "../../Services/CommonConfigurations";
import {TextField} from "@mui/material";
import React from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useGetUserQuery, useUpdateUserMutation} from "../Auth/AuthApiSlice";

export default function UpdateAccountDetails({user, buttonContext = "עדכון פרטים"}) {
    const [updateUser, {isLoading: updateLoading}] = useUpdateUserMutation();
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


const handleForm =async (data)=> {
    console.log(data);
    const updatedUser = {
        ...user,
        email: data.email,
        fullName: data.fullName,
        city: data.city,
        phone: data.phone,
        dogName: data.dogName,
        username: data.username,
        password: "***", // or data.password if needed
        imageFile: data.imageFile, // 👈 include image from file input if exists
    };

    const formData = new FormData();

    formData.append("email", updatedUser.email);
    formData.append("image", updatedUser.image);
    formData.append("id", updatedUser.id);
    formData.append("fullName", updatedUser.fullName);
    formData.append("city", updatedUser.city);
    formData.append("phone", updatedUser.phone);
    formData.append("username", updatedUser.username);
    formData.append("password", updatedUser.password);
    formData.append("dogName", updatedUser.dogName);

    if (updatedUser.cupons.length > 0) {
        formData.append("cupons", JSON.stringify(updatedUser.cupons));
    }

    if (updatedUser.imageFile && updatedUser.imageFile.length > 0) {
        formData.append("imageFile", updatedUser.imageFile[0]);
    }

    await updateUser(formData).unwrap();
    if(buttonContext =="עדכון פרטים"){
    alert("פרטי המשתמש עודכנו בהצלחה!");
     nav("/");
    }else{
        nav("/takePhoto");
    }
}


return (
    <>
        {user &&
            <form onSubmit={handleSubmit(handleForm)} className="mt-2 px-5">
                <div className="mb-3">
                    <label htmlFor="formFile" className="mx-auto d-flex justify-content-center">
                        <img src={user.image ?  (user.image.startsWith('https://') ? user.image : s3Url + user.image)
                            : "/files/profile.png"} alt="profile image" height={80} className={"white rounded-circle p-1 "} />
                    </label>
                    <input className="" type="file" id="formFile" {...register("imageFile")}/>
                </div>

                <TextField
                    label="שם מלא"
                    variant="standard"
                    fullWidth
                    defaultValue={user.fullName ? user.fullName : ""}
                    margin="normal"
                    error={!!errors.fullName}
                    inputProps={{
                        style: {
                            textAlign: 'right',
                            direction: 'rtl',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            right: 0,
                            left: 'unset',
                            direction: 'rtl',
                            textAlign: 'right',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    helperText={errors.fullName?.message}
                    {...register("fullName", {
                        required: "שדה חובה",
                        minLength: {
                            value: 2,
                            message: "יש להזין לפחות שני תווים",
                        },
                    })}
                />


                <TextField
                    label="בחירת שם משתמש"
                    variant="standard"
                    fullWidth
                    defaultValue={user.username ? user.username : ""}
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    inputProps={{
                        style: {
                            textAlign: 'right',
                            direction: 'rtl',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            right: 0,
                            left: 'unset',
                            direction: 'rtl',
                            textAlign: 'right',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    {...register("username", {
                        required: "שדה חובה",
                        minLength: {
                            value: 2,
                            message: "יש להזין לפחות שני תווים",
                        },
                    })}
                />
                <TextField
                    label="שם הכלב"
                    variant="standard"
                    fullWidth
                    defaultValue={user.dogName ? user.dogName : ""}
                    margin="normal"
                    error={!!errors.dogName}
                    helperText={errors.dogName?.message}
                    inputProps={{
                        style: {
                            textAlign: 'right',
                            direction: 'rtl',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            right: 0,
                            left: 'unset',
                            direction: 'rtl',
                            textAlign: 'right',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    {...register("dogName", {
                        required: "שדה חובה",
                        minLength: {
                            value: 2,
                            message: "יש להזין לפחות שני תווים",
                        },
                    })}
                />

                <TextField
                    label="מייל"
                    type="email"
                    variant="standard"
                    fullWidth
                    defaultValue={user.email ? user.email : ""}
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    inputProps={{
                        style: {
                            textAlign: 'right',
                            direction: 'rtl',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            right: 0,
                            left: 'unset',
                            direction: 'rtl',
                            textAlign: 'right',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    {...register("email", {
                        required: "שדה חובה",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "כתובת מייל לא תקינה",
                        },
                    })}
                />

                <TextField
                    label="טלפון"
                    type="tel"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    defaultValue={user.phone ? user.phone : ""}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    inputProps={{
                        style: {
                            textAlign: 'right',
                            direction: 'rtl',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            right: 0,
                            left: 'unset',
                            direction: 'rtl',
                            textAlign: 'right',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    {...register("phone", {
                        required: "שדה חובה",
                        pattern: {
                            value: /^[0-9\s\-+()]{7,15}$/,
                            message: "מספר טלפון לא תקין",
                        },
                    })}
                />

                <TextField
                    label="עיר"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    defaultValue={user.city ? user.city : ""}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    inputProps={{
                        style: {
                            textAlign: 'right',
                            direction: 'rtl',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            right: 0,
                            left: 'unset',
                            direction: 'rtl',
                            textAlign: 'right',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d'
                        }
                    }}
                    {...register("city", {
                        required: "שדה חובה",
                        minLength: {
                            value: 2,
                            message: "יש להזין לפחות שני תווים",
                        },
                    })}
                />


                <button type="submit" className="btn denim text-white w-100 py-3 my-3">
                    {buttonContext}
                </button>
            </form>
        }
    </>
)
}