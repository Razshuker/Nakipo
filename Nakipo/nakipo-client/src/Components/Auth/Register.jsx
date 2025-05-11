import '../../CSS/auth.css'
import {useForm} from "react-hook-form";
import {useRegisterMutation} from "./AuthApiSlice";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import React from "react";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();    const [handleRegisterApi] = useRegisterMutation();

    function handleRegister(userData) {
        if (userData.password !== userData.passwordConfirmation) {
            alert("unmatched password");
            return;
        }
        delete userData.passwordConfirmation;
        console.log(userData);
        handleRegisterApi(userData).unwrap();
    }

    return (
        <>
            <div className="row justify-content-center dark-coral w-100 m-0">
            <img className="flipped col-auto" src={"/files/Face_03.gif"} height={100}/>
            </div>
        <div dir={"rtl"} className="p-1 register-page dark-coral">
            <h1 className="text-dark-blue text-center">יש מצב  שתרוויח</h1>
            <form onSubmit={handleSubmit(handleRegister)} className="mt-1 px-5">

                <TextField
                    label="שם מלא"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    error={!!errors.fullName}
                    inputProps={{ style: { textAlign: 'right', direction: 'rtl', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    InputLabelProps={{ style: { right: 0, left: 'unset', direction: 'rtl', textAlign: 'right', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
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
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    inputProps={{ style: { textAlign: 'right', direction: 'rtl', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    InputLabelProps={{ style: { right: 0, left: 'unset', direction: 'rtl', textAlign: 'right', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
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
                    margin="normal"
                    error={!!errors.dogName}
                    helperText={errors.dogName?.message}
                    inputProps={{ style: { textAlign: 'right', direction: 'rtl', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    InputLabelProps={{ style: { right: 0, left: 'unset', direction: 'rtl', textAlign: 'right', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
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
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    inputProps={{ style: { textAlign: 'right', direction: 'rtl', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    InputLabelProps={{ style: { right: 0, left: 'unset', direction: 'rtl', textAlign: 'right', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
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
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    inputProps={{ style: { textAlign: 'right', direction: 'rtl', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    InputLabelProps={{ style: { right: 0, left: 'unset', direction: 'rtl', textAlign: 'right', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
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
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    inputProps={{ style: { textAlign: 'right', direction: 'rtl', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    InputLabelProps={{ style: { right: 0, left: 'unset', direction: 'rtl', textAlign: 'right', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    {...register("city", {
                        required: "שדה חובה",
                        minLength: {
                            value: 2,
                            message: "יש להזין לפחות שני תווים",
                        },
                    })}
                />


                <TextField
                    label="סיסמה"
                    type="password"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    inputProps={{ style: { textAlign: 'right', direction: 'rtl', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    InputLabelProps={{ style: { right: 0, left: 'unset', direction: 'rtl', textAlign: 'right', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    {...register("password", {
                        required: "שדה חובה",
                        minLength: {
                            value: 2,
                            message: "יש להזין לפחות שני תווים",
                        },
                    })}
                />

                <TextField
                    label="אימות סיסמה"
                    type="password"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    error={!!errors.passwordConfirmation}
                    helperText={errors.passwordConfirmation?.message}
                    inputProps={{ style: { textAlign: 'right', direction: 'rtl', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    InputLabelProps={{ style: { right: 0, left: 'unset', direction: 'rtl', textAlign: 'right', fontFamily:"MyCustomFont, sans-serif", color: '#25115d' } }}
                    {...register("passwordConfirmation", {
                        required: "שדה חובה",
                        minLength: {
                            value: 2,
                            message: "יש להזין לפחות שני תווים",
                        },
                    })}
                />

                <FormControlLabel
                    required
                    control={
                        <Checkbox
                            sx={{
                                color: '#25115d', // Default color
                                '&.Mui-checked': {
                                    color: '#25115d', // Color when checked
                                },
                            }}
                        />
                    }
                    label={
                        <span>
      אני מאשר.ת <a href="#">תנאי שימוש</a>
    </span>
                    }
                />


                <button type="submit" className="btn denim text-white w-100 py-3 mt-4">
                    כן, אני רוצה
                </button>
            </form>
            {/*<img style={{*/}
            {/*    width: "100%",*/}
            {/*}} src="/files/q_1_1.png" alt="or" className="my-3"/>*/}
            <div className="mt-3 text-center">
                <p className="text-center">הרשמה באמצעות</p>
                <div className="register-with row">
                    <div className="col google">
                        <div className="blue-dianne p-3 m-2">GOOGLE</div>
                    </div>
                    <div className="col facebook">
                        <div className="blue-dianne p-3 m-2">FACEBOOK</div>
                    </div>
                </div>
            </div>
            <div className="mt-3 text-center">
                <p>משתמש רשום? <a href="/login" className="text-primary">התחבר</a></p>
            </div>
        </div>
        </>

    )
}