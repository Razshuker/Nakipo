import Header from "./Headers/Header";
import '../CSS/About.css'

export default function About(){

    return (
        <>
            <Header/>
            <div className="dark-blue text-dark-coral py-4 text-center">
                <h2>פטאיט</h2>
                <p>אוכל לחברים לחיים</p>
            </div>
            <div className="about dark-coral text-dark-blue p-3">
                <h3>כחלק מיוזמה עירונית להפחתת פסולת חיות מחמד במרחב הציבורי, גם אנחנו הצטרפנו למאמץ.</h3>
                <p className='p-about'>איסוף נקודות: כל שקית פסולת שמושלכת לפח - מזכה אותך במטבע</p>
                <p className='p-about'>כל 50 מטבעות = 50 שקלים למימוש אצלנו באונליין, עם שליח עד הבית</p>
                <a href="https://peteat.co.il/" target="_blank" className="peteatBtn denim text-dark-coral">www.peteat.co.il</a>
                <img src="/files/peteat-logo.png" alt="peteatLogo" height={100} className="d-flex justify-content-center mx-auto"/>
            </div>
        </>
    )
}


