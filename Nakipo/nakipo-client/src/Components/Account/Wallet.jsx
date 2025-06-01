import '../../CSS/wallet.css'
import React, {useEffect, useState} from "react";
import {s3PublicFilesUrl, s3Url} from "../../Services/CommonConfigurations";
import { useLazyGetCityLocationQuery} from "./locationApiSlice";



export default function Wallet({ userReports = [] }) {
    console.log(userReports);
    const [triggerCityLocation] = useLazyGetCityLocationQuery();
    const [cities, setCities] = useState({});

    const fetchCityName = async (latitude = 0, longitude = 0, index, report) => {
        try {
            if (latitude === 0 || longitude === 0) {
                setCities(prev => ({ ...prev, [index]: "לא נרשם מיקום" }));
                return;
            }

            if (report.city) {
                setCities(prev => ({ ...prev, [index]: `ב${report.city}` }));
                return;
            }

            const result = await triggerCityLocation({ latitude, longitude }).unwrap();
            const city = result.city || "לא ידוע";
            setCities(prev => ({ ...prev, [index]: `ב${city}` }));
        } catch (error) {
            console.error('Error fetching city name:', error);
            setCities(prev => ({ ...prev, [index]: "במיקום לא ידוע" }));
        }
    };


    useEffect(() => {
        userReports.forEach((report, index) => {
            fetchCityName(report.location?.latitude, report.location?.longitude, index,report);
        });
    }, [userReports]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL'); // outputs dd/MM/yyyy automatically in Hebrew locale
    };

    return (
        <table style={{ width: '100%', direction: 'rtl', borderCollapse: 'collapse' }}>
            <thead className="text-center">
            <tr className="row">
                <th className="col-6">הפעולה</th>
                <th className="col-6">ההטבה</th>
            </tr>
            </thead>
            <tbody>
            {userReports.length > 0 ?
                [...userReports]
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort newest to oldest
                    .map((report, sortedIndex) => {
                        const originalIndex = userReports.findIndex(r => r === report); // get index for cities
                        return (
                            <tr key={sortedIndex}>
                                <td className="text-dark-blue row align-items-center">
                                    <div className="col-4 p-0 mx-auto text-center">
                                        <img src={report.image ? s3Url + report.image : ""} alt="user-image" height={45} width={45} className="rounded-circle"/>
                                    </div>
                                    <div className="col-8">
                                    <p>ניקיון</p>
                                    <p>{cities[originalIndex] ? cities[originalIndex] : 'טוען עיר...'}</p>
                                    <p className="text-gray">{formatDate(report.date)}</p>
                                    </div>
                                </td>
                                <td className="row justify-content-center text-dark">
                                    <img src={s3PublicFilesUrl + "3.png"} height={25} className="col-auto p-0" alt="currency"/>
                                    <p className="col-8 text-center">מטבע</p>
                                </td>
                            </tr>
                        );
                    })
                :
                <>
                    <tr>
                  <td className="text-center w-100">
            <h3 className="text-center my-5">לא נמצאו דיווחים</h3>
                  </td>
                    </tr>
                </>
            }

            </tbody>
        </table>
    );
}
