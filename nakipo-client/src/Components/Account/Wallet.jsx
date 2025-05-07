import '../../CSS/wallet.css'
import {useEffect, useState} from "react";



export default function Wallet({ userReports = [] }) {
    console.log(userReports);
    const [cities, setCities] = useState({});

    const fetchCityName = async (latitude =0 , longitude =0, index) => {
        try {
            if(latitude ==0 && longitude ==0) {
                setCities(prev => ({ ...prev, [index]: "לא נרשם מיקום" }));
                return;
            }
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=he`);
            const data = await response.json();
            const city = data.address?.city || data.address?.town || data.address?.village || "לא ידוע";
            setCities(prev => ({ ...prev, [index]: `ב${city}` }));
        } catch (error) {
            console.error('Error fetching city name:', error);
            setCities(prev => ({ ...prev, [index]: "במיקום לא ידוע" }));
        }
    };

    useEffect(() => {
        userReports.forEach((report, index) => {
            fetchCityName(report.location?.latitude, report.location?.longitude, index);
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
            {userReports.length > 0 &&
                [...userReports]
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort newest to oldest
                    .map((report, sortedIndex) => {
                        const originalIndex = userReports.findIndex(r => r === report); // get index for cities
                        return (
                            <tr key={sortedIndex}>
                                <td className="text-dark-blue">
                                    <p>ניקיון</p>
                                    <p>{cities[originalIndex] ? cities[originalIndex] : 'טוען עיר...'}</p>
                                    <p className="text-gray">{formatDate(report.date)}</p>
                                </td>
                                <td className="row justify-content-center text-dark">
                                    <img src="/files/3.png" height={25} className="col-auto p-0" alt="currency"/>
                                    <p className="col-8 text-center">מטבע</p>
                                </td>
                            </tr>
                        );
                    })}

            </tbody>
        </table>
    );
}
