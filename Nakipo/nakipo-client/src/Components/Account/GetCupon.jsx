import Header from "../Headers/Header";
import {useGetUserQuery} from "../Auth/AuthApiSlice";
import {useEffect, useState} from "react";
import Loading from "../Loading";

export default function GetCupon() {
    const { data: user, isLoading } = useGetUserQuery();
    const [cuponCode, setCuponCode] = useState("אין קופון זמין");

    useEffect(() => {
        if (!isLoading && user?.cupons?.length > 0) {
            setCuponCode(user.cupons[user?.cupons?.length-1].cuponCode || "אין קופון זמין");
        }
    }, [user, isLoading]);

    const copyToClipboard = () => {
        if (cuponCode && cuponCode!= "אין קופון זמין") {
            navigator.clipboard.writeText(cuponCode).then(() => {
                alert("הקופון הועתק!");
            });
        }else {
            alert("אין קופון זמין")
        }
    };

    if(isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <div className="dark-blue text-dark-coral py-4 text-center">
                <h2>שרינג</h2>
            </div>
            <div style={{
                position:"relative"
            }} className="share-icon d-flex justify-content-center align-items-center">
            <img style={{
                position:"absolute",
                top: "-35px"
            }} src="/files/share.png" height="75"  alt="share" />
            </div>
            <div>
                <div style={{
                    marginTop:"100px"
                }} className="row w-75 justify-content-center mb-4 align-items-center mx-auto">
                    <div className="col-3 copy-btn p-3 denim text-center text-white" onClick={copyToClipboard}>
                        <img src="/files/copy.png" alt="copy" height={25}/>
                    </div>
                    <div className="col-9 cupon blue-dianne text-dark-blue p-3 text-center">
                        {cuponCode}
                    </div>
                </div>
                <p className="text-center" onClick={copyToClipboard}>
                    לחץ כדי להעתיק את הקופון
                </p>
            </div>
        </>
    );
}
