import Header from "./Header";
import '../../CSS/header.css';
import { useLocation, useNavigate } from "react-router-dom";
import {useGetUserQuery} from "../Auth/AuthApiSlice";
import Loading from "../Loading";

export default function AccountHeader() {
    const nav = useNavigate();
    const location = useLocation();
    let pathname = location.search;
    const { data:user, isLoading } = useGetUserQuery();

    function changeTab(tabLink) {
        nav(tabLink);
    }

    if(isLoading){
        return <Loading />;
    }

    return (
        <header>
            <Header />
            <div className="user-info dark-blue text-dark-coral py-4 text-center">

                <h2>היי {user && user.username}</h2>

            </div>

            <div className="bottom-bar row row-cols-2">
                <div className="col wallet p-0">
                    <div
                        onClick={() => changeTab("/?wallet")}
                        className={`${(pathname === "?wallet" || pathname === "") ? "text-dark-coral denim" : "dark-coral text-dark-blue"} mt-1 me-1 mb-1 py-2 px-3`}
                    >
                        <img
                            src={(pathname !== "?wallet" || pathname !== "") ? "/files/5_1_blue.png" : "/files/5_1_off.png"}
                            height={15}
                            className="col-auto p-0"
                            alt="wallet"
                        />
                        <p className="col-auto">הארנק שלי</p>
                    </div>
                </div>

                <div className="col rating-table p-0">
                    <div
                        onClick={() => changeTab("/?rating")}
                        className={`${pathname === "?rating" ? "text-dark-coral denim" : "dark-coral text-dark-blue"} mt-1 ms-1 me-1 mb-1 py-2 px-3`}
                    >
                        <img
                            src={pathname !== "?rating" ? "/files/5_2_blue.png" : "/files/5_2_off.png"}
                            height={15}
                            className="col-auto p-0"
                            alt="rating"
                        />
                        <p className="col-auto">טבלת העיר</p>
                    </div>
                </div>

                <div className="col challange p-0">
                    <div
                        onClick={() => changeTab("/?challange")}
                        className={`${pathname === "?challange" ? "text-dark-coral denim" : "dark-coral text-dark-blue"} me-1 mb-1 py-2 px-3`}
                    >
                        <img
                            src={pathname !== "?challange" ? "/files/5_3_blue.png" : "/files/5_3_off.png"}
                            height={15}
                            className="col-auto p-0"
                            alt="challange"
                        />
                        <p className="col-auto">אתגר החודש</p>
                    </div>
                </div>

                <div className="col feedo p-0">
                    <div
                        onClick={() => changeTab("/?feedo")}
                        className={`${pathname === "?feedo" ? "text-dark-coral denim" : "dark-coral text-dark-blue"} ms-1 me-1 mb-1 py-2 px-3`}
                    >
                        <img
                            src={pathname !== "?feedo" ? "/files/5_4_blue.png" : "/files/5_4_off.png"}
                            height={15}
                            className="col-auto p-0"
                            alt="feedo"
                        />
                        <p className="col-auto">ד״ר פידו</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
