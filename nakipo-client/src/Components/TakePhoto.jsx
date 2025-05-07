import React, { useRef, useState, useEffect } from "react";
import { useUploadPhotoMutation } from "./photoApiSlice";
import Header from "./Headers/Header";
import '../CSS/takePhoto.css'

export default function TakePhoto() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [streaming, setStreaming] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [error, setError] = useState(null);
    const [uploadPhoto, { isLoading }] = useUploadPhotoMutation();


    useEffect(() => {
        if (!isCameraOpen) return;

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStreaming(true);
                }
            } catch (err) {
                setError("לא ניתן להפעיל את המצלמה: " + err.message);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
                setStreaming(false);
            }
        };
    }, [isCameraOpen]);

    const handleOpenCamera = () => {
        setIsCameraOpen(true);
    };

    const handleCloseCamera = () => {
        setIsCameraOpen(false);
    };

    const takePhotoAndUpload = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!video || !canvas) return;

        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
            if (!blob) return;

            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

                    const formData = new FormData();
                    formData.append("photo", file);
                    formData.append("latitude", position.coords.latitude.toString());
                    formData.append("longitude", position.coords.longitude.toString());

                    const result = await uploadPhoto(formData).unwrap();
                    alert("✅ הועלה בהצלחה: " + result.file);
                    setIsCameraOpen(false);
                });
            } catch (err) {
                setError("שגיאה בהעלאה: " + err.message);
            }
        }, "image/jpeg");
    };

    return (
        <>
            <Header/>
        <div className="dark-blue camera-page">
            {!isCameraOpen ? (
                <>
                    <h1 className="text-dark-coral take-photo-title">צלם תמונה</h1>
                    {error && <p className="text-danger">{error}</p>}
                    <button onClick={handleOpenCamera} className="dark-blue border-0">
                        <img className="" src={"/files/Face_01.gif"} height={100}/>
                    </button>
                </>
            ) : (
                <div className="dark-blue camera-screen">
                    <button onClick={handleCloseCamera} className="back text-dark-coral">אחורה</button>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        width="100%"
                        height="100%"
                        style={{objectFit: "cover"}}
                    />
                    <canvas ref={canvasRef} width="300" height="225" style={{display: "none"}}/>
                    <div className="take-photo-btn">
                        <button onClick={takePhotoAndUpload} disabled={isLoading} className="dark-blue border-0">
                            <img className="mb-3" src={"/files/2.png"} height={70}/>
                        </button>
                        <h4 className="text-dark-coral"> {isLoading ? "מעלה..." : "צלם תמונה"}</h4>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
