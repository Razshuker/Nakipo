import AccountHeader from "../Headers/AccountHeader";
import Wallet from "./Wallet";
import {useLocation} from "react-router-dom";
import Challange from "./Challange";
import Feedo from "./Feedo";
import Rating from "./Rating";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useGetUserQuery} from "../Auth/AuthApiSlice";

export default function MainAccount() {
    const location = useLocation();
    let pathname = location.search;
    const { data: user, isLoading, error } = useGetUserQuery();

    let userReports = user ?  user.reports : [];
    console.log(user);

    return (
        <>
        <AccountHeader />
            {(pathname === "?wallet" || pathname === "" )&& <Wallet userReports={userReports} />}
            {pathname === "?rating" && <Rating/>}
            {pathname === "?challange" && <Challange/>}
            {pathname === "?feedo" && <Feedo/>}

        </>
    )
}