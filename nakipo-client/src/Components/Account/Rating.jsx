import '../../CSS/wallet.css'
import {useGetRatingQuery} from "./ratingApiSlice";
import {baseUrl, formatDate} from "../../Services/CommonConfigurations";
import React from "react";

export default function Rating(){
const {data:ratingList} = useGetRatingQuery();



            return (
            <table className="text-dark-blue" style={{ width: '100%', direction: 'rtl', borderCollapse: 'collapse' }}>
                <thead className="text-center">
                <tr className="row">
                    <th className="col-6">הגיבור</th>
                    <th className="col-6">המקום</th>
                </tr>
                </thead>
                <tbody>
                {ratingList && ratingList.map((user, index) => (
                    <tr key={index}>
                        <td className="row align-items-center">
                            <div className="col-4">
                            <img src={user.image ? baseUrl + "/images/" + user.image : baseUrl+"/images/photo_638819697942684460.jpg"} alt="user-image" height={45} width={45} className="border rounded-circle border-2 border"/>
                            </div>
                            <div className="col-8">
                            <p>{user.dogName}</p>
                            {/*<p>{cities[index] ? `ב${cities[index]}` : 'טוען עיר...'}</p>*/}
                            <p className="text-dark-blue">חודש {formatDate(Date.now())}</p>
                            </div>
                        </td>
                        <td className="row justify-content-center text-dark">
                            <img src="/files/4.png" height={25} className="col-auto p-0" alt="rating"/>
                            <p className="col-8 text-center">מקום {index + 1}</p>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
    );
}