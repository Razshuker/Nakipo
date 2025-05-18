import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormControl, Input, InputLabel, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useValidateResetTokenMutation, useResetPasswordMutation } from './AuthApiSlice';
import '../../CSS/auth.css';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [validateToken] = useValidateResetTokenMutation();
    const [resetPassword] = useResetPasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    useEffect(() => {
        const validateResetToken = async () => {
            if (!token || !email) {
                navigate('/login');
                return;
            }

            try {
                const result = await validateToken({ email, token }).unwrap();
                setIsValidToken(result.isValid);
            } catch (error) {
                console.error('Failed to validate token:', error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        validateResetToken();
    }, [token, email, validateToken, navigate]);

    const onSubmit = async (data) => {
        if (data.newPassword !== data.passwordConfirmation) {
            alert("הסיסמאות אינן תואמות");
            return;
        }

        try {
            await resetPassword({
                email,
                token,
                newPassword: data.newPassword
            }).unwrap();
            
            alert("הסיסמה עודכנה בהצלחה!");
            navigate('/login');
        } catch (error) {
            console.error('Failed to reset password:', error);
            alert("שגיאה באיפוס הסיסמה. נסה שוב מאוחר יותר.");
        }
    };

    if (isLoading) {
        return <div>טוען...</div>;
    }


    return (
        <div className="auth-container">
            <div className="row justify-content-end w-100 m-0 pe-5 pt-0">
                <img className="flipped col-auto" src={"/files/Face_02.gif"} height={100}/>
            </div>
            {!isValidToken ?  <div className="auth-form text-center mt-5">
                <h2>קישור לא תקין</h2>
                <p>הקישור לאיפוס הסיסמה אינו תקין או שפג תוקפו.</p>
            </div>
            :

            <div className="auth-form text-center p-4 mt-4">
                <h2>איפוס סיסמה</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                        <InputLabel htmlFor="new-password" style={{
                            right: 0,
                            left: 'unset',
                            transformOrigin: 'top right'
                        }}>סיסמה חדשה</InputLabel>
                        <Input
                            id="new-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register("newPassword", {
                                required: "שדה חובה",
                                minLength: {
                                    value: 6,
                                    message: "הסיסמה חייבת להכיל לפחות 6 תווים",
                                },
                            })}
                            style={{
                                textAlign: 'right',
                                direction: 'rtl',
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {errors.newPassword && (
                            <span style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>
                                {errors.newPassword.message}
                            </span>
                        )}
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                        <InputLabel htmlFor="confirm-password" style={{
                            right: 0,
                            left: 'unset',
                            transformOrigin: 'top right'
                        }}>אימות סיסמה</InputLabel>
                        <Input
                            id="confirm-password"
                            type={showPasswordConfirm ? 'text' : 'password'}
                            {...register("passwordConfirmation", {
                                required: "שדה חובה",
                                validate: (value) =>
                                    value === watch("newPassword") || "הסיסמאות אינן תואמות"
                            })}
                            style={{
                                textAlign: 'right',
                                direction: 'rtl',
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                        onMouseDown={(e) => e.preventDefault()}
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

                    <button type="submit" className="btn denim text-white w-100 py-3 mt-4">
                        איפוס סיסמה
                    </button>
                </form>
            </div>
            }
        </div>
    );
} 