import {useNavigate} from "react-router-dom";

export default function MenuItem({label, href, icon, setOpen, target = null}) {

    const nav = useNavigate();

    console.log(target);
    const navRedirect = (path) => {
        if (target === "_blank") {
            window.open(path, "_blank");
        } else {
            nav(path);
        }
        setOpen(false);
    }

    return (
        <div className="menu-icon row align-items-center text-dark-coral my-4" onClick={() => navRedirect(href)}>
            <img
                src={icon}
                height={25}
                className="col-auto "
                alt="icon"
            />
            <p className="col-auto m-0">{label}</p>
        </div>
    )
}