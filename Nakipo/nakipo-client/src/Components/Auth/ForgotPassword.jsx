import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useForgotPasswordMutation } from './AuthApiSlice';
import '../../CSS/auth.css';
import Loading from "../Loading";

export default function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [forgotPassword,{isLoading}] = useForgotPasswordMutation();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (data) => {
        try {
            await forgotPassword(data.email);
            setSubmitted(true);
        } catch (error) {
            console.error('Failed to send reset email:', error);
        }
    };

    if(isLoading) {
        return <Loading backgroundColor={"white"}/>;
    }

    return (
        <div className="auth-container">
            <div className="row justify-content-end w-100 m-0 pe-5 pt-0">
                <img className="flipped col-auto" src={"/files/Face_02.gif"} height={100}/>
            </div>
                {submitted ?   <div className="auth-form text-center p-4 mt-4">
                    <h2>בדוק בתיבת הדואר הנכנס שלך</h2>
                    <p>אם קיים חשבון עם כתובת האימייל שסיפקת, תקבל הוראות לאיפוס הסיסמה.</p>
                </div>
                :
            <div className="auth-form text-center p-4 mt-4">
                <h2>איפוס סיסמה</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <button type="submit" className="btn denim text-white w-100 py-3 mt-4">
                        שלח קישור לאיפוס סיסמה
                    </button>
                </form>
            </div>
                }
        </div>
    );
} 