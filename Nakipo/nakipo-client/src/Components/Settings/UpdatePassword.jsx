import {useForm} from "react-hook-form";
import React from "react";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useUpdatePasswordMutation} from "../Auth/AuthApiSlice";
import Loading from "../Loading";

export default function UpdatePassword() {
    const {register, handleSubmit,formState: { errors },watch} = useForm();
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [updatePassword, {isLoading}] = useUpdatePasswordMutation();

    const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const onUpdatePassword = async (data)=>{
        delete data.passwordConfirmation;
    await updatePassword(data);
        alert("סיסמה עודכנה בהצלחה!");
        window.location.href ="/";
    }

    if(isLoading){
        return <Loading backgroundColor={"white"} />;
    }


    return (
                <form onSubmit={handleSubmit(onUpdatePassword)} className="mt-2 px-5">

                    <FormControl
                        sx={{m: 1, width: '100%'}}
                        variant="standard"
                        error={!!errors.currentPassword}
                    >
                        <InputLabel
                            htmlFor="standard-adornment-password"
                            style={{
                                right: 0,
                                left: 'unset',
                                direction: 'rtl',
                                textAlign: 'right',
                                fontFamily: "MyCustomFont, sans-serif",
                                color: '#25115d',
                            }}
                        >
                            סיסמה נוכחית
                        </InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showCurrentPassword ? 'hide the password' : 'display the password'}
                                        onClick={handleClickShowCurrentPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                    >
                                        {!showCurrentPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...register("currentPassword", {
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
                        />
                        {errors.currecntPassword && (
                            <span style={{color: 'red', fontSize: '0.8em', marginTop: '4px'}}>
                        {errors.currecntPassword.message}
                    </span>
                        )}
                    </FormControl>

                    <FormControl
                        sx={{m: 1, width: '100%'}}
                        variant="standard"
                        error={!!errors.newPassword}
                    >
                        <InputLabel
                            htmlFor="standard-adornment-password"
                            style={{
                                right: 0,
                                left: 'unset',
                                direction: 'rtl',
                                textAlign: 'right',
                                fontFamily: "MyCustomFont, sans-serif",
                                color: '#25115d',
                            }}
                        >
                            סיסמה חדשה
                        </InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showNewPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showNewPassword ? 'hide the password' : 'display the password'}
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                    >
                                        {!showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...register("newPassword", {
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
                        />
                        {errors.newPassword && (
                            <span style={{color: 'red', fontSize: '0.8em', marginTop: '4px'}}>
                        {errors.newPassword.message}
                    </span>
                        )}
                    </FormControl>

                    <FormControl
                        sx={{m: 1, width: '100%'}}
                        variant="standard"
                        error={!!errors.passwordConfirmation}
                    >
                        <InputLabel
                            htmlFor="standard-adornment-password"
                            style={{
                                right: 0,
                                left: 'unset',
                                direction: 'rtl',
                                textAlign: 'right',
                                fontFamily: "MyCustomFont, sans-serif",
                                color: '#25115d',
                            }}
                        >
                            אימות סיסמה חדשה
                        </InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showConfirmPassword ? 'hide the password' : 'display the password'}
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                    >
                                        {!showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...register("passwordConfirmation", {
                                required: "שדה חובה",
                                minLength: {
                                    value: 2,
                                    message: "יש להזין לפחות שני תווים",
                                },
                                validate: (value) =>
                                    value === watch("newPassword") || "הסיסמאות אינן תואמות"
                            })}
                            style={{
                                textAlign: 'right',
                                direction: 'rtl',
                                fontFamily: "MyCustomFont, sans-serif",
                                color: '#25115d',
                            }}
                        />
                        {errors.passwordConfirmation && (
                            <span style={{color: 'red', fontSize: '0.8em', marginTop: '4px'}}>
                        {errors.passwordConfirmation.message}
                    </span>
                        )}
                    </FormControl>

                    <button type="submit" className="btn denim text-white w-100 py-3 mt-4">עדכן סיסמה</button>
                </form>

    );
}