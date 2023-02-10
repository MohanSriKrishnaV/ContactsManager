import React, { useState } from "react";

const SignUp = () => {
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

        const resp = await fetch("http://localhost:8086/api/register", {
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
            window.location.href = '/login'
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
        <section>
            <form>
                <div>
                    <input type="email" id="email" placeholder="Mail id" onChange={(e) => setemail(e.target.value)} onBlur={(event) => { checkErrors("email") }} value={email} required />
                    {!error.email.isValid ? <div style={{color:"red"}}>{error.email.message}</div> : null}
                </div>
                <br></br>
                <div>
                    <input type="password" id="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} onBlur={(event) => { checkErrors("password") }} value={password} required />
                    {!error.password.isValid ? <div style={{color:"red"}}>{error.password.message}</div> : null}
                </div>
                <br></br>
                <div>
                    <input type="password" id="cpass" placeholder="Confirm Password" onChange={(e) => setcpass(e.target.value)} onBlur={(event) => { checkErrors("cpass") }} value={cpass} required />
                    {!error.cpass.isValid ? <div style={{color:"red"}}>{error.cpass.message}</div> : null}
                </div>
                <br></br>
                <div>
                    <button type="submit" onClick={HandleSignup} disabled={isSubmitValid === 0 || error.email.message.length !==0 || error.password.message.length !==0 || error.cpass.message.length !==0 || password !== cpass ? true : false}>Signup</button>
                </div>
                {response.message ? <div style={{color:"red"}}>{response.message}</div> : null}
            </form>
        </section>
    )
}


export default SignUp;