import {useGetBrandsQuery} from "./brandApiSlice";
import {formatDate} from "../../Services/CommonConfigurations";
import React from "react";
import {useGetUserWalletQuery} from "../Auth/AuthApiSlice";

export default function Challange() {
    const {data: brands} = useGetBrandsQuery();
    const {data:userWallet} = useGetUserWalletQuery();
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);


    console.log(brands);
    return (
        <>
            <div className="row m-1">
                {brands && brands.length > 0 && brands.map((brand) => (
                    <div className="col-6 border border-1 text-center position-relative" key={brand.id}>
                        <div className="m-2 p-2">
                            <div className="logo">
                                {brand.logo ? <img src={brand.logo} alt="" /> : <h2>{brand.name}</h2>}
                            </div>
                            <div className="brand-info">
                                <p className="text-dark-blue p-0 m-0">חודש {formatDate(Date.now())} <span className="text-denim">{brand.gift}</span></p>
                                <p style={{ color: "#7d7d7d" }} className="p-0 m-0">{formattedDate}</p>
                            </div>
                        </div>

                        {/* ✅ Add overlay conditionally (e.g. if brand.blocked is true) */}
                        {userWallet < 3  && (
                            <div style={{
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