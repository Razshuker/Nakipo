import {s3PublicFilesUrl} from "../Services/CommonConfigurations";

export default function DesktopView() {
    return (
    <div style={{
        backgroundImage: `url('${s3PublicFilesUrl}desk-bg.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100vh',
        overflow: 'hidden',
    }}  >
        <img src={s3PublicFilesUrl + "dg_logo.png"} className="text-center mx-auto p-4 my-3 d-block" height={100} />
        <img style={{position:'absolute', top:'0'}} src={s3PublicFilesUrl + "dg_01.png"} height={200}/>
        <div className="row justify-content-center align-items-center">
        <div className="col-3">
            <div style={{
                backgroundImage: `url('${s3PublicFilesUrl}dg_02.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                height: '70vh',
            }} className=" m-2 p-5 rounded rounded-xl">
<div style={{
    backgroundImage: `url('${s3PublicFilesUrl}text_01.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'top center',
    height: '100%',
    marginTop:'10%'
}}>
</div>
            </div>
        </div>
        <div className="col-3">
            <div style={{
                backgroundImage: `url('${s3PublicFilesUrl}dg_03.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
               height: '70vh',
            }} className=" m-2 p-5 rounded rounded-xl">
                <div style={{
                    backgroundImage: `url('${s3PublicFilesUrl}text_02.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'top center',
                    height: '100%',
                    marginTop:'10%'
                }}>
                </div>
            </div>
        </div>
        <div className="col-3">
            <div style={{
                height: '70vh',
                position: 'relative',
            }} className="dark-coral m-2 p-5 rounded rounded-xl">
                <div style={{
                    backgroundImage: `url('${s3PublicFilesUrl}text_03.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'top center',
                    height: '100%',
                    marginTop:'10%'
                }}>
                <img style={{
                    position: 'absolute',
                    bottom: '0',
                    left:'0',
                }} src={s3PublicFilesUrl + "Face_05.gif"} className="text-center mx-auto p-4 my-3" height={200} />
                </div>
            </div>
        </div>
        </div>
        <a href="mailto:hi@wedogood.co.il">
            <img
                src={s3PublicFilesUrl + "email.png"}
                className="text-center mx-auto p-4 my-3 d-block"
                height={70}
                style={{ width: "auto", cursor: "pointer" }}
                alt="Send Email"
            />
        </a>        </div>
    )
}