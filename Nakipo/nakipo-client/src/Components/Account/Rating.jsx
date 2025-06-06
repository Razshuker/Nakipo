import '../../CSS/wallet.css'
import {useGetRatingQuery} from "./ratingApiSlice";
import {formatDate, getImageUrl, s3PublicFilesUrl, s3Url} from "../../Services/CommonConfigurations";
import React from "react";
import Loading from "../Loading";
import {useGetUserQuery} from "../Auth/AuthApiSlice";

export default function Rating(){
    const { data:user, isLoading:userLoading } = useGetUserQuery();
    const { data: ratingList, isLoading } = useGetRatingQuery(user?.city, {
        skip: !user?.city,
    });

if(isLoading || userLoading){
    return <Loading />;
}

            return (
            <table className="text-dark-blue" style={{ width: '100%', direction: 'rtl', borderCollapse: 'collapse' }}>
                <thead className="text-center">
                <tr className="row">
                    <th className="col-6">הגיבור</th>
                    <th className="col-6">מיקומך כרגע</th>
                </tr>
                </thead>
                <tbody>
                {ratingList && ratingList.map((user, index) => (
                    <tr key={index}>
                        <td className="row align-items-center">
                            <div className="col-4 p-0 mx-auto text-center">
                            <img src={user.image ?  (user.image.startsWith('https://') ? user.image : getImageUrl(user.image))
                                : s3PublicFilesUrl + "profile.png"} alt="user-image" height={45} width={45} className="rounded-circle"/>
                            </div>
                            <div className="col-8">
                            <p>{user.dogName}</p>
                            <p>{user.city}</p>
                            <p className="text-dark-blue">חודש {formatDate(Date.now())}</p>
                            </div>
                        </td>
                        <td className="row justify-content-center text-dark">
                            <img src={s3PublicFilesUrl+"4.png"} height={25} className="col-auto p-0" alt="rating"/>
                            <p className="col-8 text-center">מקום {index + 1}</p>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
    );
}