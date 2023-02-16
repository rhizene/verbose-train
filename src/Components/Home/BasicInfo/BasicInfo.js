import { faEnvelope, faHashtag, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import my from "../resume";
import BasicInfoStyle from "./BasicInfo.module.scss";


export default function BasicInfo() {    
    return <section>
        <h1>{my.name}</h1>
        <div className={BasicInfoStyle.info}>
        <div title="Address"><FontAwesomeIcon icon={faHouse}/> </div>
            <div>{my.address}</div>
            <div title="Cellphone number"><FontAwesomeIcon icon={faHashtag}/> </div>
            <div><a href={"tel:"+my.cellphone}>{my.cellphone}</a></div>
            <div title="Email Address"><FontAwesomeIcon icon={faEnvelope}/> </div>
            <div><a href={"mailto:"+my.mail}>{my.mail}</a></div>
        </div>
    </section>
}
    