import Header from "./Headers/Header";
import '../CSS/About.css'
import React from "react";
import {s3PublicFilesUrl} from "../Services/CommonConfigurations";

export default function About(){

    return (
        <>
            <Header/>
            <img src={s3PublicFilesUrl + "Logo_1.png"} height={55} className="d-flex mx-auto mt-4"/>
            <div className="about px-3 py-2">
            <p className="text-center">תכנית נאמנות לבעלי כלבים, השתתפות בהגרלות, הנחות שוות ואפילו מוצרים במתנה!</p>
            <p className="bold">שומרים יחד על עיר נקייה – בכל טיול!
            </p>
            <p>הקהילה שלנו נוצרה מתוך שיתוף פעולה ייחודי עם עיריות ומועצות ברחבי ישראל, במטרה להציע פתרון יצירתי, קהילתי וחדשני לבעיה מוכרת בכל עיר: פסולת כלבים במרחב הציבורי.
                באמצעות הסמארטפון, אנו מאפשרים לבעלי כלבים לשתף מיקומים של איסוף צרכים בזמן אמת, לצבור נקודות, לזכות בפרסים – ובעיקר, לקחת חלק בשמירה על עיר נקייה ונעימה יותר לכולנו.
            </p>
            <p className="bold">איך זה עובד?
            </p>
            <ul className="ul-about">
                <li>יוצרים פרופיל אישי (לכלב!)</li>
                <li>משתפים תמונה של שקית האיסוף</li>
                <li>צוברים נקודות שמזכות בפרסים</li>
                <li>משתתפים בתחרויות ואתגרים בין תושבים</li>
                <li>מממשים את המטבעות בעסקים ברחבי העיר</li>
            </ul>
            <p>למה להצטרף?</p>
            <ul>
                <li>להיות חלק מקהילה אכפתית ופעילה</li>
                <li>לקבל מבצעים מותאמים אישית והטבות בלעדיות</li>
                <li>לתרום לסביבה ירוקה ובריאה יותר</li>
                <li>לעזור לעירייה באכיפה חכמה וממוקדת</li>
                <li>לקדם מודעות ואחריות חברתית</li>
            </ul>
<p>באמצעות שילוב בין אחריות סביבתית, גישה טכנולוגית חכמה ומעורבות קהילתית, האפליקציה יוצרת חוויית טיול חדשה – כזו שמטיבה עם כולם: כלבים, בני אדם והסביבה.</p>
            <p className="bold text-center">כיף שאתם איתנו (:</p>
            </div>
        </>
    )
}


