import React, {useState} from "react";
import SettingsHeader from "./SettingsHeader";
import UpdateAccountDetails from "./UpdateAccountDetails";
import UpdatePassword from "./UpdatePassword";

export default function Settings(){
    const [settings,setSettings] = useState("account");


    return (
        <>
        <SettingsHeader settings={settings} setSettings={setSettings} />
            {settings === "account" && <UpdateAccountDetails/>}
            {settings === "password" && <UpdatePassword/>}
        </>
    )
}