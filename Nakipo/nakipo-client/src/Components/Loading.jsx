import '../CSS/loading.css'

export default function Loading({backgroundColor = "transparent", text = "בטעינה..."}) {
    return (
        <div className={`${backgroundColor} loading`}>
            <img src="/files/loading.gif" alt="loading" width={150}/>
            {text != null && <p className={`${backgroundColor == "white" ? "text-dark-blue" : "text-dark-coral"} text-center`}>{text}</p>}
        </div>
    )
}