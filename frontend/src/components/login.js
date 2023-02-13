import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css"

const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [response, setResponse] = useState([]);
    const [err, setErr] = useState({email : {isValid : true, message : ""}})
    
    const HandleLogin = async () => {
        const resp = await fetch("https://cmb-ipcy.onrender.com/api/login", {
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
        console.log(data)
        if (data.token) {
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            alert("Login successful")
            // window.location.href = '/landing'
            navigate('/landing');
        }
        setResponse(data)
        // console.log(response.message === "Login Successful")
        // console.log(JSON.stringify(response) === "Login Successful")
        // console.log(response.token)
    }

    const checkErrors = (type)=>{
        switch(type){
            case "1-email":
                if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
                    setErr({...err, email:{isValid:false, message:"Please enter proper email address"}})  
                }else{
                    setErr({...err, email:{isValid:true, message:""}})
                }
                break;
        }
    }

    return (
        <section id="login">
            <div id="eclips"></div>
            <div id="eclips2"></div>
           
             <img src="https://static.thenounproject.com/png/3169833-200.png" alt="dot" id="dots" width="100px" height="100px"/>
             <img src="https://static.thenounproject.com/png/3169833-200.png" alt="dot" id="dot2" width="100px" height="100px"/>
            <div>

                <h1 id="l">LOGO</h1>
                <h5 id="m">Enter your credentials to access your account</h5>
            </div>
            <div>
                <input type="email" placeholder="Enter Email" onChange={(e) => setemail(e.target.value)} onBlur={(event) => { checkErrors("1-email") }} id="l-email"/>
            </div>
            {!err.email.isValid ? <div style={{color:"red"}}>{err.email.message}</div> : null}
            <div>
                <input type="password" placeholder="Enter Password" onChange={(e) => setpassword(e.target.value)} id="l-password" />
            </div>
                <div id ="mess">
                {response.message ? <div style={{ color: "red" }}>{response.message}</div> : null}
                </div>
               
          
            <div>
                <button onClick={HandleLogin} id="sign-in" >Sign In</button>
                {/* {response.message !== "Login Successful" ? <button onClick={HandleLogin}>Sign In</button> : <Link to='/landing'><button onClick={HandleLogin}>Sign In</button></Link>}   */}
            </div>
            <div>
                <Link to='/registration'><button id="sign-upp" >Sign Up</button></Link>
            </div>
        </section>
    )
}

export default Login;