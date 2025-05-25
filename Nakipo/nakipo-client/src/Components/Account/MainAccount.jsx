import AccountHeader from "../Headers/AccountHeader";
import Wallet from "./Wallet";
import {useLocation} from "react-router-dom";
import Challange from "./Challange";
import Feedo from "./Feedo";
import Rating from "./Rating";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useGetUserQuery} from "../Auth/AuthApiSlice";
import Loading from "../Loading";

export default function MainAccount() {
    const location = useLocation();
    let pathname = location.search;
    const {data: user, isLoading} = useGetUserQuery();

    let userReports = user ? user.reports : [];

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <>
            <AccountHeader/>
            {(pathname === "?wallet" || pathname === "") && <Wallet userReports={userReports}/>}
            {pathname === "?rating" && <Rating/>}
            {pathname === "?challange" && <Challange/>}
            {pathname === "?feedo" && <Feedo/>}

        </>
    )
}