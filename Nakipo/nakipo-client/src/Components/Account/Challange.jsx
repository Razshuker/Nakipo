import {useGetBrandsQuery} from "./brandApiSlice";
import {formatDate, s3Url} from "../../Services/CommonConfigurations";
import React from "react";
import {useGetCuponMutation, useGetUserWalletQuery} from "../Auth/AuthApiSlice";
import {useNavigate} from "react-router-dom";
import Loading from "../Loading";

export default function Challange() {
    const {data: brands, isLoading: loadingBrands} = useGetBrandsQuery();
    const {data:userWallet, isLoading: loadingWallet} = useGetUserWalletQuery();
    const [getCupon, {data:user, isLoading:loadingCupon}] = useGetCuponMutation();

    const date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);

    const  onGetCupon =async (brand)=>{
        if(brand.name.toLowerCase() === "peteat"){
            await getCupon(brand.walletAmountToGetCupon).unwrap();
        }else {
            alert("no cupons yet!")
        }
    }

    if(loadingBrands || loadingWallet || loadingCupon){
        return <Loading />;
    }

    return (
        <>
            <div className="row m-1 g-2 justify-content-center">
                {brands && brands.length > 0 && brands.map((brand) => (
                    <div onClick={()=>onGetCupon(brand)} className="col-5 m-2 border border-1 text-center position-relative" key={brand.id}>
                        <div style={{
                            minHeight:"150px"
                        }} className="m-2 p-2">
                            <div className="logo">
                                {brand.logo ? <img src={s3Url+brand.logo} alt="" className="col-12"/> : <h2>{brand.name}</h2>}
                            </div>
                            <div className="brand-info">
                                <p className="text-dark-blue p-0 m-0">חודש {formatDate(Date.now())} <span className="text-denim">{brand.gift}</span></p>
                                <p style={{ color: "#7d7d7d" }} className="p-0 m-0">{formattedDate}</p>
                            </div>
                        </div>

                        {(userWallet < brand.walletAmountToGetCupon || brand?.name?.toLowerCase() !== 'peteat')  && (
                            <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#ebe5d996",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 10,
                                pointerEvents: "all",
                            }}>
                                <img src="/files/Lock.png" alt="Locked" height={50} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );

}