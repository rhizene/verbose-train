import { getCertificates } from "Components/Home/Certification/CertificationSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginStyle from "./Login.module.scss";
import { authenticate } from "./LoginSlice";


export default function Login() {
    const isAuthenticated = useSelector(state => state.login.authenticated);
    const dispatch = useDispatch();
    const [loggingIn, setLoggingIn] = useState(false);

    if(isAuthenticated) return null;

    function login(){
        setLoggingIn(true);

        setTimeout(()=>{
            setLoggingIn(false);
            dispatch(authenticate());
        }, 3000);
    }

        
    return <div className={LoginStyle.login}>
        <h1>Log in</h1>
        <input type='text' name="username" placeholder="username"/>
        <br />
        <input type='password' name="password" placeholder="password"/>
        
        <div className={LoginStyle.loadBarContainer}>
            <div className={[LoginStyle.loadBar, loggingIn ? LoginStyle.loggingIn : null].join(' ')}>
                {loggingIn ? '+' : null}
            </div>
        </div>
        
        <button onClick={()=>login()}>Submit</button>
    </div>
}
