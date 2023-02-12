import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [response, setResponse] = useState([]);
    const HandleLogin = async () => {
        const resp = await fetch("http://localhost:8086/api/login", {
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
            // window.location.href = '/landing'
            navigate('/landing');
        }
        setResponse(data)
        // console.log(response.message === "Login Successful")
        // console.log(JSON.stringify(response) === "Login Successful")
        // console.log(response.token)
    }
    return (
        <section>
            <div>
                <input type="email" placeholder="Enter Email" onChange={(e) => setemail(e.target.value)} />
            </div>
            <br></br>
            <div>
                <input type="password" placeholder="Enter Password" onChange={(e) => setpassword(e.target.value)} />
                {response.message ? <div style={{ color: "red" }}>{response.message}</div> : null}
            </div>
            <br></br>
            <div>
                <button onClick={HandleLogin}>Sign In</button>
                {/* {response.message !== "Login Successful" ? <button onClick={HandleLogin}>Sign In</button> : <Link to='/landing'><button onClick={HandleLogin}>Sign In</button></Link>}   */}
            </div>
            <br></br>
            <div>
                <Link to='/registration'><button>Sign Up</button></Link>
            </div>
        </section>
    )
}

export default Login;