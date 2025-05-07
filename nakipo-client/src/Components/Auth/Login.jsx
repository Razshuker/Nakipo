import React from 'react'
import {useForm} from 'react-hook-form'
import {useLoginMutation} from "./AuthApiSlice";
import {TextField} from "@mui/material";
import '../../CSS/auth.css'
import {useNavigate} from "react-router-dom";



export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [login,{data:userInfo,loading}] = useLoginMutation();
    const nav = useNavigate();


    const handleLogin = async (userData) => {
        console.log({...userData,nav});
        await login({...userData,nav}).unwrap();
    };

    return (
        <div className="login-page dark-coral">
        <div className="row justify-content-end w-100 m-0 pe-5 pt-0">
            <img className="flipped col-auto" src={"/files/Face_02.gif"} height={100}/>
        </div>

            <div className="p-5">
                <h1 className="text-dark-blue text-center">נרשמים ומתחילים</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
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
                            style: {textAlign: 'right'},
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
                            style: {textAlign: 'right'},
                        }}
                    />

                    <div className="d-grid mt-4">
                        <button className="btn denim text-white btn-block" type="submit">
                            התחבר
                        </button>
                    </div>
                </form>

            <div className="mt-3 text-center">
                <p className="text-center">התחברות באמצעות</p>
                <div className="register-with row">
                    <div className="col google"><div className="blue-dianne p-3 m-2">GOOGLE</div></div>
                    <div className="col facebook"><div className="blue-dianne p-3 m-2">FACEBOOK</div>
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
