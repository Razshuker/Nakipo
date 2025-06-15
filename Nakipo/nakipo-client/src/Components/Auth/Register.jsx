import '../../CSS/auth.css'
import {useForm} from "react-hook-form";
import {useRegisterMutation, useGoogleLoginMutation} from "./AuthApiSlice";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import UpdateAccountDetails from "../Settings/UpdateAccountDetails";
import {
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loading from "../Loading";
import {s3PublicFilesUrl} from "../../Services/CommonConfigurations";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [handleRegisterApi, {isLoading: registerLoading}] = useRegisterMutation();
    const [googleRegister,{isLoading: googleLoading}] = useGoogleLoginMutation();
    const nav = useNavigate();
    const [googleUser, setGoogleUser] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((prev) => !prev);

    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();

    const handleRegister = async (userData)=> {
        if (userData.password !== userData.passwordConfirmation) {
            alert("unmatched password");
            return;
        }
        delete userData.passwordConfirmation;
        const formData = new FormData();
        formData.append("email", userData.email);
        formData.append("fullName", userData.fullName);
        formData.append("city", userData.city);
        formData.append("phone", userData.phone);
        formData.append("username", userData.username);
        formData.append("password", userData.password);
        formData.append("dogName", userData.dogName);

        if (userData.imageFile && userData.imageFile.length > 0) {
            formData.append("imageFile", userData.imageFile[0]);
        }

        await handleRegisterApi(formData).unwrap();
    }

    const handleGoogleRegister = async () => {
        try {
            const client = window.google.accounts.id;
            client.initialize({
                client_id: "962429869854-7vjm85cs5nsh2urlsa3ibsgosv07qsfu.apps.googleusercontent.com",
                callback: async (response) => {
                    if (response.credential) {
                        try {
                            const result = await googleRegister({
                                credential: response.credential,
                            }).unwrap();
                        if(result.dogName != null){
                            nav("/takePhoto")
                        }
                            setGoogleUser(result);
                        } catch (err) {
                            console.error('Google login failed:', err);
                        }
                    }
                },
            });
            client.prompt();
        } catch (err) {
            console.error('Google Login Failed:', err);
        }
    };

    if(registerLoading || googleLoading){
        return (
            <Loading backgroundColor={"white"}/>
        )
    }

    return (
        <>
            <div className="row justify-content-center dark-coral w-100 m-0">
            <img className="flipped col-auto" src={s3PublicFilesUrl + "Face_03.gif"} height={100}/>
            </div>
            {googleUser ?
                <UpdateAccountDetails user={googleUser} buttonContext={"סיום הרשמה"} />
                :
        <div dir={"rtl"} className="p-1 register-page dark-coral">
            <h1 className="text-dark-blue text-center">יש מצב  שתרוויח</h1>
            <form onSubmit={handleSubmit(handleRegister)} className="mt-1 px-5">

                <div className="mb-3">
                    <label htmlFor="formFile" className="mx-auto d-flex justify-content-center">
                        <img src={s3PublicFilesUrl + "profile.png"} alt="profile image" height={80} className={"white rounded-circle p-1 "} />
                    </label>
                    <input className="" type="file" id="formFile"  {...register("imageFile")}/>
                </div>

                <TextField
                    label="שם מלא"
                    variant="standard"
                    fullWidth
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

                <FormControl
                    sx={{ m: 1, width: '100%' }}
                    variant="standard"
                    error={!!errors.password}
                >
                    <InputLabel
                        htmlFor="register-password"
                        style={{
                            right: 0,
                            left: 'unset',
                            direction: 'rtl',
                            textAlign: 'right',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d',
                        }}
                    >
                        סיסמה
                    </InputLabel>
                    <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        {...register("password", {
                            required: "שדה חובה",
                            minLength: {
                                value: 2,
                                message: "יש להזין לפחות שני תווים",
                            },
                        })}
                        style={{
                            textAlign: 'right',
                            direction: 'rtl',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d',
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.password && (
                        <span style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>
      {errors.password.message}
    </span>
                    )}
                </FormControl>


                <FormControl
                    sx={{ m: 1, width: '100%' }}
                    variant="standard"
                    error={!!errors.passwordConfirmation}
                >
                    <InputLabel
                        htmlFor="register-password-confirmation"
                        style={{
                            right: 0,
                            left: 'unset',
                            direction: 'rtl',
                            textAlign: 'right',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d',
                        }}
                    >
                        אימות סיסמה
                    </InputLabel>
                    <Input
                        id="register-password-confirmation"
                        type={showPasswordConfirm ? 'text' : 'password'}
                        {...register("passwordConfirmation", {
                            required: "שדה חובה",
                            minLength: {
                                value: 2,
                                message: "יש להזין לפחות שני תווים",
                            },
                            validate: (value) =>
                                value === watch("password") || "הסיסמאות אינן תואמות"
                        })}
                        style={{
                            textAlign: 'right',
                            direction: 'rtl',
                            fontFamily: "MyCustomFont, sans-serif",
                            color: '#25115d',
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPasswordConfirm}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {!showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.passwordConfirmation && (
                        <span style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>
      {errors.passwordConfirmation.message}
    </span>
                    )}
                </FormControl>

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
      אני מאשר.ת <a href="/terms" target={"_blank"}>תנאי שימוש</a>
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
                    <div className="col-6 google">
                        <div className="blue-dianne p-3 m-2" onClick={handleGoogleRegister}>GOOGLE</div>
                    </div>
                    <div className="col-6 tiktok">
                        <div className="blue-dianne p-3 m-2" onClick={handleTikTokRegister}>TIKTOK</div>
                    </div>
                </div>
            </div>
            <div className="mt-3 text-center">
                <p>משתמש רשום? <a href="/login" className="text-primary">התחבר</a></p>
            </div>
        </div>
            }
        </>

    )
}