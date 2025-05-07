import {useGetBrandsQuery} from "./brandApiSlice";
import {formatDate} from "../../Services/CommonConfigurations";
import React from "react";

export default function Challange() {
    const {data: brands} = useGetBrandsQuery();
    console.log(brands);
    return (
        <>
       <div className="row m-1">
           {brands && brands.length > 0 && brands.map((brand) => (
           <div className="col-6 border border-1" key={brand.id}>
            <div className="m-2 p-2">
               <div className="logo">
                   {brand.logo ? <img src={brand.logo} alt="" /> : <h2>{brand.name}</h2>}
               </div>
                <div className="brand-info">
                    <p className="text-dark-blue">חודש {formatDate(Date.now())} <span className="text-denim">{brand.gift}</span></p>

                </div>

            </div>
           </div>

           ))}
       </div>
        </>
    )
}