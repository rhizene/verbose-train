import React from "react";
import LoginStyle from "./Login.module.scss"

export default class Login extends React.Component {
    #login(){
    }

    render() {
        return <div className={LoginStyle.login}>
            <input type='text' name="username" />
            <br />
            <input type='password' name="password" />
            
            <hr />
            <button onClick={()=>this.#login()}>Submit</button>
        </div>
    }
}
