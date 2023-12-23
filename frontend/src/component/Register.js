import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const Register = (props) => {
    const [username,setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [usernameError,setUserNameError] = useState("")
    const [apiError,setApiError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = async() => {
        if(username && email && password){
            const res = await axios.post("http://localhost:8800/api/user/register",{username,email,password}).then(res=>{return res}).catch(err=>{return err}) 
            console.log("error",res)
            if(res?.response?.data?.status==false){
                setApiError(res.response.data.msg)
            }else{
                navigate("/login")
            }
        }else if(!email){
           setEmailError("Please Enter Email")
        }else if(!password){
          setPasswordError("Please Enter Password")    
        }else{
          setUserNameError("Please Enter User Name")
        }
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Register</div>
        </div>
        <h1>{apiError && apiError}</h1>
        <br />
        <div className={"inputContainer"}>
            <input
                value={username}
                placeholder="Enter your user name here"
                onChange={ev => setUserName(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{usernameError}</label>
        </div>
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
                value={"Register"} />
        </div>
    </div>
}

export default Register