import '../../CSS/header.css'
import {useState} from "react";
import SideMenu from "./SideMenu";
import {useGetUserWalletQuery} from "../Auth/AuthApiSlice";
import {useNavigate} from "react-router-dom";
import Loading from "../Loading";


export default function Header() {

    const [open, setOpen] = useState(false);
    const { data:userWallet, isLoading } = useGetUserWalletQuery();
    const nav = useNavigate();

    if(isLoading){
        return <Loading />;
    }

    return (
        <header className="header dark-blue text-center text-white">
            <div className="top-bar row justify-content-between align-items-center dark-blue py-3">
                <div className="col-auto side-menu px-4" onClick={() => setOpen(true)}>
                   <img src="/files/1.png" alt="mobile-menu" height={25} />
                </div>
                <div className="col-auto right row px-4 header-wallet align-items-center">
                    <img onClick={()=> nav("/takePhoto")} className="col-auto" src={"/files/Face_02.gif"} height={30}/>
                    <div onClick={()=>nav("/?wallet")} className="col-auto wallet white text-dark-blue d-flex align-items-center">{userWallet} מטבעות</div>
                </div>

            </div>
            <SideMenu open={open} setOpen={setOpen} />

        </header>
    )
}