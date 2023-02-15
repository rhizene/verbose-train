import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginStyle from "./Login.module.scss";
import { authenticate } from "./LoginSlice";


export default function Login() {
    
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.login.authenticated);

    if(isAuthenticated) return null;

        
    return <div className={LoginStyle.login}>
        <h1>Log in</h1>
        <input type='text' name="username" />
        <br />
        <input type='password' name="password" />
        
        <hr />
        <button onClick={()=>dispatch(authenticate())}>Submit</button>
    </div>
}
