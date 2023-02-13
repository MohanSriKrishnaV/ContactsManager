import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import "./login.css"
const SignUp = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpass, setcpass] = useState("");
    const [response, setResponse] = useState([])
    const [error, setError] = useState({
        email: { isValid: true, message: "" }, password: { isValid: true, message: "" },
        cpass: { isValid: true, message: "" }
    })
    const HandleSignup = async (event) => {
        event.preventDefault()
        setemail("")
        setpassword("")
        setcpass("");

        const resp = await fetch("https://cmb-ipcy.onrender.com/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await resp.json();
        console.log(data.data);
        setResponse(data)
        if(data.data){
            navigate('/')
        }
    }
    const checkErrors = (type) => {
        switch (type) {
            case "email":
                if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
                    setError({...error, email:{isValid:false, message:"Please enter proper email address"}})  
                }else{
                    setError({...error, email:{isValid:true, message:""}})
                }
                break;
            case "password":
                if(password.length < 6 & password.length !== 0){
                    setError({...error, password:{isValid:false, message:"Password should have minimum length of 6"}})
                }else{
                    setError({...error, password:{isValid:true, message:""}})
                }
                break;
            case "cpass":
                if(password !== cpass ){
                    setError({...error, cpass:{isValid : false, message : "Password and confirm Password doesn't match"}})
                }else{
                    setError({...error, cpass:{isValid : false, message : ""}})
                }
                break;
        }
        console.log(error.email.message.length)
    }
    const isSubmitValid = email.length && password.length && cpass.length;
    return (
        <section id="login">
           <div id="eclips"></div>
            <div id="eclips2"></div>
            <img src="https://static.thenounproject.com/png/3169833-200.png" alt="dot" id="dots" width="100px" height="100px"/>
             <img src="https://static.thenounproject.com/png/3169833-200.png" alt="dot" id="dot2" width="100px" height="100px"/>
            <div>
                <h1 id="l">LOGO</h1>
                <h5 id="n">Create new Account</h5>
            </div>
            <form>
                <div>
                    <input type="email" id="email" placeholder="Mail id" onChange={(e) => setemail(e.target.value)} onBlur={(event) => { checkErrors("email") }} value={email} required />
                    <div id="mess">
                    {!error.email.isValid ? <div style={{color:"red"}}>{error.email.message}</div> : null}
                    </div>
                    
                </div>
                <br></br>
                <div>
                    <input type="password" id="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} onBlur={(event) => { checkErrors("password") }} value={password} required />
                    <div id="mess2">  {!error.password.isValid ? <div style={{color:"red"}}>{error.password.message}</div> : null}</div>
                   
                </div>
                <br></br>
                <div>
                    <input type="password" id="cpass" placeholder="Confirm Password" onChange={(e) => setcpass(e.target.value)} onBlur={(event) => { checkErrors("cpass") }} value={cpass} required />
                    <div id="mess1">
                    {!error.cpass.isValid ? <div style={{color:"red"}}>{error.cpass.message}</div> : null}
                    </div>
                   
                </div>
                <br></br>
                <div>
                    <button type="submit" onClick={HandleSignup} disabled={isSubmitValid === 0 || error.email.message.length !==0 || error.password.message.length !==0 || error.cpass.message.length !==0 || password !== cpass ? true : false} id="sign-up">Signup</button>
                </div>
                <Link to='/'>  <button type="submit" >SignIn</button> </Link>
                <div id="mess">
                {response.message ? <div style={{color:"red"}}>{response.message}</div> : null}
                </div>
                
            </form>
        </section>
    )
}


export default SignUp;