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
        <div dir={"rtl"} className="p-5 register-page dark-coral">
            <h1 className="text-dark-blue text-center">יש מצב  שתרוויח</h1>
            <form onSubmit={handleSubmit(handleRegister)} className="mt-1">

                <TextField
                    label="שם פרטי"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...register("firstName", {
                        required: "שדה חובה",
                        minLength: {
                            value: 2,
                            message: "יש להזין לפחות שני תווים",
                        },
                    })}
                />

                <TextField
                    label="שם משפחה"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...register("lastName", {
                        required: "שדה חובה",
                        minLength: {
                            value: 2,
                            message: "יש להזין לפחות שני תווים",
                        },
                    })}
                />

                <TextField
                    label="שם משתמש"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username?.message}
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
                    {...register("phone", {
                        required: "שדה חובה",
                        pattern: {
                            value: /^[0-9\s\-+()]{7,15}$/,
                            message: "מספר טלפון לא תקין",
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