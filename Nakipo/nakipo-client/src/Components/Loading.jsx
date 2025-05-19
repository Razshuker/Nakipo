import '../CSS/loading.css'

export default function Loading({backgroundColor = "transparent"}) {
    return (
        <div className={`${backgroundColor} loading`}>
            <img src="/files/loading.gif" alt="loading" width={150}/>
        </div>
    )
}