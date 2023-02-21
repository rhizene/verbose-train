import fetchCertificates from "Actions/fetchCertificates";
import BasicInfo from "Components/Home/BasicInfo/BasicInfo";
import Certification from "Components/Home/Certification/Certification";
import { useDispatch, useSelector } from "react-redux";
import HomeStyle from "./Home.module.scss";



export default function Home() {    

    const isAuthenticated = useSelector(state => state.login.authenticated);
    const dispatch = useDispatch();

    if(!isAuthenticated) return null;

    dispatch(fetchCertificates());
        
    return <div className={HomeStyle.home}>
        <BasicInfo />
        <Certification />
    </div>
}
