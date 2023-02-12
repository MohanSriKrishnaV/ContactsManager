import React from "react";
import {useNavigate} from "react-router-dom"
import { useEffect } from "react";
import "./header.css"
const Header = () => {
    const navigate = useNavigate()
    const HandleLogout = ()=>{
        localStorage.removeItem("jwt");
        window.location.reload();
        
        // window.history.replaceState('/landing',  "/");
    }

    useEffect(()=>{
        if(!localStorage.getItem("jwt")){
            navigate('/')
        }
    }, [])
      
    const y = localStorage.getItem("user")
    const z = JSON.parse(y)
    const em = z.email
    const na=em.split("@")[0]
    console.log(na)
    console.log(JSON.parse(y))

    return (
        <div id="cont">
            <div id="aside">
                <h1 id="as">LOGO</h1>
                <h4 id="dashboard">DashBoard</h4>
                <img src="https://img.icons8.com/m_outlined/600/000000/dashboard-layout.png" alt="ds" id="dash" width="20px"height="20px"/>
                <h3 id="total-contacts">Total Contacts</h3>
                 <img src="https://icons.veryicon.com/png/o/education-technology/ui-icon/contacts-77.png" alt="ds" id="totall" width="20px"height="20px"/>
                 
                 <button id="logout" onClick={HandleLogout} >Log out</button>
                <img src="https://www.svgrepo.com/show/132889/logout.svg" alt="lg" width="30px" height="20px" id="lg"/>

            </div>
            <div id="head">
            <h1 id="total"> Total Contacts</h1>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-389WzAn325Ac1klPwqeUVBlifPHrooJaaOtD9K4OXfGRht5y99mkoTyYRjtU1n1-iqI&usqp=CAU" alt="pp" width="40px" height="40px" id="pp"/>
            <h4 id="profile">{na}</h4>
            </div>
           
        </div>
    )
}
export default Header;

// const HandleLogout = ()=>{
//     localStorage.clear();
//     navigate('/login')
// }

// if(!localStorage.getItem("jwt")){
//     navigate('/login')
// }