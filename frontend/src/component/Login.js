import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [apiError,setApiError] = useState("")
    const navigate = useNavigate(); 

    const onButtonClick = async() => {
        if(email && password){
            const res = await axios.post("http://localhost:8800/api/user/login",{email,password}).then(res=>{return res}).catch(err=>{return err}) 
             console.log("ehf",res)
            if(res?.response?.data?.status==false){
                setApiError(res?.response?.data?.msg)
            }else if(res?.data?.status==true){
               localStorage.setItem("token",res?.data?.token)
               props.setToken(res?.data?.token)
               navigate("/dashboard")
            }
        }else if(!email){
           setEmailError("Please Enter Email")
        }else{
        setPasswordError("Please Enter Password")    
        }
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>

        <h1>{apiError && apiError}</h1>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>
}

export default Login