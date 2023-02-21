import { faEnvelope, faHashtag, faHouse, faPersonWalkingArrowLoopLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from "Components/Login/LoginSlice";
import { useDispatch } from "react-redux";
import my from "../resume";
import BasicInfoStyle from "./BasicInfo.module.scss";


export default function BasicInfo() {
    const dispatch = useDispatch();

    return <section className={BasicInfoStyle.section}>
        <div className={BasicInfoStyle.subContainer}>
            <div className={BasicInfoStyle.info}>
                <div title="Address"><FontAwesomeIcon icon={faHouse}/> </div>
                <div>{my.address}</div>
                <div title="Cellphone number"><FontAwesomeIcon icon={faHashtag}/> </div>
                <div><a href={"tel:"+my.cellphone}>{my.cellphone}</a></div>
                <div title="Email Address"><FontAwesomeIcon icon={faEnvelope}/> </div>
                <div><a href={"mailto:"+my.mail}>{my.mail}</a></div>
            </div>
            <div>
                <button className={BasicInfoStyle.logout} onClick={()=>dispatch(logout())} title='Log out'><FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft}/> </button>
                <h1 className={BasicInfoStyle.name}>{my.name}</h1>    
            </div>
        </div>
    </section>
}
    