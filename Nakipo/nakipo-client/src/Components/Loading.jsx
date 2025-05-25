import '../CSS/loading.css'
import {s3PublicFilesUrl} from "../Services/CommonConfigurations";

export default function Loading({backgroundColor = "transparent", text = "בטעינה..."}) {
    return (
        <div className={`${backgroundColor} loading`}>
            <img src={s3PublicFilesUrl + "loading.gif"} alt="loading" width={150}/>
            {text != null &&
                <p className={`${backgroundColor === "white" ? "text-dark-blue" : "text-dark-coral"} text-center`}>{text}</p>}
        </div>
    )
}