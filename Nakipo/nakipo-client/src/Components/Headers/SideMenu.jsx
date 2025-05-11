import React from 'react';
import MenuItem from "./MenuItem";
import {useGetUserQuery, useGetUserWalletQuery, useLogoutMutation} from "../Auth/AuthApiSlice";
import {baseUrl} from "../../Services/CommonConfigurations";

export default function SideMenu({ open, setOpen }) {
    const links = [
        {
            label: 'הארנק שלי',
            href: '/?wallet',
            iconPath: "/files/5_1_off.png"
        },
        {
            label: 'טבלת העיר',
            href: '/?rating',
            iconPath: "/files/5_2_off.png"
        },
        {
            label: 'אתגר החודש',
            href: '/?challange',
            iconPath: "/files/5_3_off.png"
        },
        {
            label: 'מוצרים לכלבים',
            href: 'https://peteat.co.il/',
            target:'_blank',
            iconPath: "/files/6_4.png"
        },
        {
            label: 'עקבו אחרינו',
            href: 'https://www.facebook.com/people/dogood/61575715186147/',
            target:'_blank',
            iconPath: "/files/6_5.png"
        },
        {
            label: 'קצת עלינו',
            href: '/about-us',
            iconPath: "/files/6_6.png"
        },
        {
            label: 'הגדרות',
            href: '/settings',
            iconPath: "/files/6_7.png"
        },
    ]
    const { data:user, isLoading: userLoading } = useGetUserQuery();
    const { data:userWallet, isLoading: walletLoading } = useGetUserWalletQuery();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
          await logout().unwrap();
          setOpen(false);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };


    return (
        <>
            {/* Overlay */}
            {open && (
                <>
                    <div
                        onClick={() => setOpen(false)}
                        className="white"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 9998,
                            pointerEvents: 'auto'
                        }}
                    >
                        <button onClick={() => setOpen(false)} className="close btn" style={{zIndex: 999}}>
                            <img src="/files/1_1.png" alt="mobile-menu" height={25}/>
                        </button>
                    </div>


                    {/* Side Menu */}
                    <div
                        className="denim"
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            height: '100%',
                            width: "80vw",
                            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                            zIndex: 9999,
                            transform: open ? 'translateX(0)' : 'translateX(-100%)',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                    >
                        <div className="row align-items-center text-dark-coral text-center dark-blue top-section px-2 py-4">
                            <div className="col-4">
                                <img src={user.image ? (baseUrl+"/images/"+user.image) : "/files/profile.png"} alt="user-image" width={70} height={70} className={user.image ? "rounded-circle" : "rounded-circle white p-2" }/>
                            </div>

                        <div className="col-8">
                            <p className="text-sm">היי {user && user.username}</p>
                            {/*<p className="text-xs">קוד לשיתוף: 4KLY565</p>*/}
                            <p className="text-xs">צברת החודש {userWallet} נקודות</p>

                        </div>
                        </div>
                        <nav className="p-4">
                            <ul className="space-y-4">
                                {links.map((link, index) => (
                                        <li key={index} className="link-li">
                                            <MenuItem label={link.label} href={link.href} icon={link.iconPath}
                                                      setOpen={setOpen} target={link.target}/>
                                        </li>
                                    )
                                )}
                                <li onClick={handleLogout}>
                                    <p className="col-auto m-0">התנתקות</p>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
            )}

        </>
    );
}

