import BasicInfo from "Components/Home/BasicInfo/BasicInfo";
import Certification from "Components/Home/Certification/Certification";
import { logout } from "Components/Login/LoginSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";



export default function Home() {    

    const isAuthenticated = useSelector(state => state.login.authenticated);
    const dispatch = useDispatch();

    if(!isAuthenticated) return null;
        
    return <div>
        <button onClick={()=>dispatch(logout())}>Log out</button>
        <BasicInfo />
        <Certification />
    </div>
}
