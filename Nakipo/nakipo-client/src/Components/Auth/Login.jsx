import React from 'react'
import {useForm} from 'react-hook-form'
import {useGoogleLoginMutation, useLoginMutation} from "./AuthApiSlice";
import {TextField} from "@mui/material";
import '../../CSS/auth.css'
import {useNavigate} from "react-router-dom";


export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [login,{loading}] = useLoginMutation();
    const nav = useNavigate();
    const [googleLogin] = useGoogleLoginMutation();


    const handleLogin = async (userData) => {
        console.log({...userData,nav});
        await login({...userData,nav}).unwrap();
    };

    const handleGoogleLogin = async () => {
        try {
            const client = window.google.accounts.id;
            client.initialize({
                client_id: "962429869854-7vjm85cs5nsh2urlsa3ibsgosv07qsfu.apps.googleusercontent.com",
                callback: async (response) => {
                    if (response.credential) {
                        try {
                            await googleLogin({
                                credential: response.credential,
                                nav
                            }).unwrap();
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

    return (
        <div className="login-page dark-coral">
        <div className="row justify-content-end w-100 m-0 pe-5 pt-0">
            <img className="flipped col-auto" src={"/files/Face_02.gif"} height={100}/>
        </div>

            <div className="pt-2 px-5">
                <h1 className="text-dark-blue text-center">נרשמים ומתחילים</h1>
                <form onSubmit={handleSubmit(handleLogin)} className="pt-3">
                    <TextField
                        label="שם משתמש"
                        type="text"
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
                        })}
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
                    />

                    <div className="d-grid mt-4">
                        <button className="btn denim text-white btn-block  w-100 py-3 mt-4" type="submit">
                            התחבר
                        </button>
                    </div>
                </form>
                <a style={{
                    color:"#000",
                }} href="#">
                <p className="text-center mt-4">שכחתי סיסמה</p>
                </a>

                <img style={{
                    width: "100%",
                }} src="/files/q_1_1.png" alt="or" className="my-3"/>

                <div className="mt-2 text-center">
                    <p className="text-center">התחברות באמצעות</p>
                    <div className="register-with row">
                        <div className="col-6 google">
                            <div className="blue-dianne p-3 m-2" onClick={handleGoogleLogin}>GOOGLE</div>
                        </div>
                        <div className="col-6 facebook">
                            <div className="blue-dianne p-3 my-2">FACEBOOK</div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <p>חדש פה? <a href="/register" className="text-primary">צור חשבון</a></p>
                </div>
            </div>

        </div>

    )
}
