import React, { useRef, useState } from "react";
import { useUploadPhotoMutation } from "./photoApiSlice";
import Header from "./Headers/Header";
import '../CSS/takePhoto.css';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import {s3PublicFilesUrl} from "../Services/CommonConfigurations";

export default function TakePhoto() {
    const [uploadPhoto, { isLoading }] = useUploadPhotoMutation();
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const getLocation = () =>
        new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => {
                    if (err.code === 1) {
                        setError("כדי להמשיך, יש לאפשר גישה למיקום שלך");
                    } else if (err.code === 2) {
                        setError("לא הצלחנו לקבל את המיקום שלך. נסה שוב.");
                    } else if (err.code === 3) {
                        setError("חיפוש המיקום לקח יותר מדי זמן. ודא שיש לך קליטה ונסה שוב.");
                    } else {
                        setError("שגיאה בקבלת מיקום. נסה שוב.");
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                }
            );
        });

    const HandleTakePhoto = async () => {
        const fileInput = fileInputRef.current;
        const file = fileInput?.files?.[0];

        if (!file) {
            setError("לא נבחרה תמונה");
            return;
        }
        const { latitude, longitude } = await getLocation();

        const formData = new FormData();
        formData.append("photo", file);
        formData.append("latitude", latitude.toString());
        formData.append("longitude", longitude.toString());

            try {
                const { latitude, longitude } = await getLocation(); // ← Wait for location

                const formData = new FormData();
                formData.append("photo", file);
                formData.append("latitude", latitude);
                formData.append("longitude", longitude);

                const result = await uploadPhoto(formData).unwrap();

                if (result.success) {
                    alert("✅ הועלה בהצלחה");
                } else {
                    setError("אין אפשרות להעלות תמונה נוספת היום");
                }
            } catch (err) {
                console.error(err);
                setError("לא ניתן להמשיך בלי שיתוף מיקום");
            }
    };

    return (
        <>
            <Header />
                {isLoading ? <Loading text={"מעלה תמונה..."} /> :
            <div className="camera-page">
                <form id="take-photo-form" onSubmit={(e) => {
                    e.preventDefault(); // ← prevent default so we can control it
                    HandleTakePhoto();
                }}>
                    <label htmlFor="formFile" className="mx-auto d-flex flex-column justify-content-center text-center">
                        <img className="col-4 mx-auto" src={s3PublicFilesUrl + "Face_01.gif"} alt="camera" />
                        <h1 className="text-dark-coral take-photo-title">צלם תמונה</h1>
                    </label>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        id="formFile"
                        style={{ display: "none" }}
                        onChange={() => {
                            document.getElementById("take-photo-form").requestSubmit();
                        }}
                    />
                </form>

                {error && <p className="text-danger">{error}</p>}
            </div>
}
        </>
    );
}
