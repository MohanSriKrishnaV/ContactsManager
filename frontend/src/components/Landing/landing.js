import React, { useState, useEffect } from "react"
//import Header from "../header/header"
import "./landing.css"
const Landing = () => {
    const [mail, setmail] = useState([])
    const [data, setdata] = useState([])
    useEffect(() => {
        fetch("http://localhost:8086/getcontacts").then((res) => {
            return res.json()
        }).then((final) => {
            setdata(final.info)
        }).catch((err) => {
            console.log(err)
        })

    }, [])
    let arr2 = []
    if(data.length!==0 && mail.length!==0){
    for (let i = 0; i < data.length; i++) {
        let letter = data[i].email
        let flag = "true"
        for (let j = 0; j < mail.length; j++) {
            if (mail[j] !== letter[j]) {
                flag = "false"
                break
            }
        }
        if (flag == "true") {
            arr2.push(data[i])
        }
    }
   
} else{
    arr2=data
}
const handle=(val)=>{
    let arr=[]
    for(let i=0;i<data.length;i++){
        if(data[i].name===val.name){

        }else{
            arr.push(data[i])
        }
    }
    setdata(arr)
}
return (
    <div id="grid-container">
         <div id="aside"> hello </div>
         <div>
        <input type="text" placeholder="search by email id " onChange={(e) => { setmail(e.target.value) }} />
        <button id="deleteAll">DeleteAll</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                </tr>
            </thead>
            {(arr2.length !== 0) && <>{arr2.map((value, key) => {
                return (
                    <>

                        <tr key={key} title={value.email} id="titlee">
                            <td >  <input type="checkbox" /></td>
                            <td>{value.name}</td>
                            <td>{value.designation}</td>
                            <td>{value.company}</td>
                            <td>{value.industry}</td>
                            <td >{value.email}</td>
                            <td>{value.phone}</td>
                            <td>{value.country}</td>
                            <button id="edit">edit</button>
                            <button onClick={() => { handle(value) }}>delete</button>
                        </tr>

                    </>
                )

            })}</>}


        </table>
    </div>
)
}
export default Landing;