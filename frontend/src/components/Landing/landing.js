import React, { useState, useEffect } from "react"
import Header from "../Header/header";
import "./landing.css";




const LandingPage = () => {
    const [mail, setmail] = useState([]);
    const [data, setdata] = useState([]);
    const [selections, setSelections] = useState([]);
    const [deletemodal, setdeletemodal] = useState(false);
    const [count, setcount] = useState(0);
    const [predelete, setpredelete] = useState(false);
    const [postdelete, setpostdelete] = useState(false);
    const [preimport, setpreimport] = useState(false);
    const [postimport, setpostimport] = useState(false);
    

    const [file, setfile] = useState(null);
    const [importmodal, setimportmodal] = useState(false);
    
    const [uploadmodal, setuploadmodal] = useState(false);
    const [filename, setfilename] = useState("");
    

    const ondrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setfilename(file.name);
        setfile(file);
    };




    const filehandle = (e) => {
        setfile(e.target.files[0]);
        // console.log(file);
        console.log(e.target.files[0]);
    }

    const toggleimportmodal = async () => {
        setimportmodal(true);
        uploadmodal(true);
    }


    const formsubmit = async () => {
        const formdata = new FormData();
        formdata.append("file", file);
        console.log(formdata);
        const res = await fetch("https://cmb-ipcy.onrender.com/contacts", {
            method: "POST",
            headers: {
                 "Authorization": localStorage.getItem("jwt")
            },
            body: formdata
        })
        const response = await res.json();
        if (response.status === "success") {
            setcount(count + 1);
        }

    }


    const dltContact = async (e) => {
        fetch(`https://cmb-ipcy.onrender.com/contacts/:${e.target.name}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8', "Authorization": localStorage.getItem("jwt")
            },
        }).then((response) => response.json())
            .then((prevdata) => {
                console.log(prevdata);
               
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setcount(count + 1);
    }

    const toggledeletemodal = () => {
        setdeletemodal(true);
    }
    const deletecontacts = async () => {
        await fetch("https://cmb-ipcy.onrender.com/contacts", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8', "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify(selections),
        }).then((response) => response.json())
            .then((prevdata) => {
                console.log(prevdata);
               
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setcount(count + 1);
    }

    const selectionChange = (e) => {
        setSelections([...selections, { id: e.target.name }])
    }


    useEffect(() => {
        fetch("https://cmb-ipcy.onrender.com/contacts", {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((res) => {
            return res.json()
        }).then((final) => {
            setdata(final.info)
        }).catch((err) => {
            console.log(err)
        })
    }, [count])




    let arr2 = []
    if (data.length !== 0 && mail.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            let letter = data[i].email
            let flag = "true"
            for (let j = 0; j < mail.length; j++) {
                if (mail[j] !== letter[j]) {
                    flag = "false"
                    break
                }
            }
            if (flag === "true") {
                arr2.push(data[i])
            }
        }

    } else {
        arr2 = data
    }
    const handle = (val) => {
        let arr = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === val.name) {

            } else {
                arr.push(data[i])
            }
        }
        setdata(arr)
    }
    console.log(arr2);
     
    //--------------------------------------------------------------------------------------------------------
    return (

        <div >
              <Header/>
    
               <div id='navbar'>
                <div id="nav">
                <button id="date">Select Date</button>
                <img src="https://static.vecteezy.com/system/resources/previews/005/988/959/non_2x/calendar-icon-free-vector.jpg" alt="cal" width="20px" height="16px" id="cal"/>
                <button id="filter"> = Filters | </button>
                <button onClick={() => { setdeletemodal(true); setpredelete(true) }} id="delete">Delete</button>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5YB6_JEmZYzMp3fDaa96FNIkA2rEsmaChHA&usqp=CAU" alt="cal" width="20px" height="16px" id="del"/>
                
                <button onClick={() => { setimportmodal(true); setpreimport(true) }} id="import" >Import</button>
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbSoUAbUxGyIWnPNCy9u6ZBTElJYEwscYlYQ&usqp=CAU" alt="imp" id="imp" width="20px" height="16px" />
                
                <button id="export">Export</button>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ34lzsfNEzWJlXzrMOsUuuMeiC-SpYvZ9GMFw6eDR1DLgkpOA30gAzOajwcEX55sOdJII&usqp=CAU" alt="emp" id="emp" width="20px" height="16px"/>
                </div>
                
                
                <div id="search">
                <input type="text" placeholder="Search by Email Id... " onChange={(e) => { setmail(e.target.value) }} id="input"/>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSavfywdsD259gNd3UMQRFmakjN9i4FcXMKybM7XEwTYg&s" alt="src" width="20px" height="20px" id="src"/>
                {/* <select  id="select" >
                    {(arr2.length !== 0) && (arr2.length <= 5) && <>{arr2.map((value, key) => {
                        return (
                            <>
                                <option key={key}>{value.email}</option>
                            </>
                        )
                    })}</>
                    }
                </select> */}
            </div>
            <table id="table">
                <thead>
                    <tr id="pre">
                        <th></th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Company</th>
                        <th>Industry</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Country</th>
                        <th>Edit</th>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {(arr2.length !== 0) && <>{arr2.map((value) => {
                        return (
                              
                            <tr key={value._id} title={value.email}  id="titlee" > 
                                
                                <td ><input type="checkbox" name={value._id} onChange={selectionChange} /></td>
                                <td>{value.name}</td>
                                <td>{value.designation}</td>
                                <td>{value.company}</td>
                                <td>{value.industry}</td>
                                <td >{value.email}</td>
                                <td>{value.phone}</td>
                                <td>{value.country}</td>
                                <td><button id="edit">edit</button></td>
                                <td> <button id="dlt" onClick={(e) => { dltContact(e); setdeletemodal(true); setpostdelete(true) }} name={value._id}>delete</button></td>

                                </tr>
                        )

                    })}</>}
                </tbody>
            </table>
            </div>




            {importmodal && (<div className="modalinput">
                {(preimport) ? (
                
                
                // <div className="pre-upload-modal floating-modal">
                //     <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                //         <circle cx="22.5" cy="22.5" r="22.5" fill="#2DA5FC" fill-opacity="0.5" />
                //         <path d="M19.5 30L14.5 30C13.9477 30 13.5 29.5523 13.5 29L13.5 13C13.5 12.4477 13.9477 12 14.5 12L24 12M24 12L28.5 16.5M24 12L24 16.5L28.5 16.5M28.5 16.5L28.5 21" stroke="black" stroke-width="2" />
                //         <line x1="21" y1="27.5" x2="30" y2="27.5" stroke="black" stroke-width="2" />
                //         <line x1="25" y1="22.5" x2="25" y2="31.5" stroke="black" stroke-width="2" />
                //     </svg>
                //     <h3>Upload file</h3>
                //     <div>
                //         <input type="file" onChange={filehandle} />
                //     </div>
                //     <button onClick={() => { if (file !== null) { formsubmit(); setpreimport(false); setpostimport(true) } }} className="modal-btn">Submit</button>
                //     <button onClick={() => { setpreimport(false); setpostdelete(false); setimportmodal(false) }} className="modal-btn"> Cancel</button>
                // </div>
                <div
                        className="App floating-modal"
                        onDrop={ondrop}
                        onDragOver={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <h3 id="csv1">Import CSV File</h3>
                        <h5 id="csv">Drag and Drop CSV File to upload</h5>
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" id="svg">
                        <circle cx="22.5" cy="22.5" r="22.5" fill="#2DA5FC" fill-opacity="0.5" />
                         <path d="M19.5 30L14.5 30C13.9477 30 13.5 29.5523 13.5 29L13.5 13C13.5 12.4477 13.9477 12 14.5 12L24 12M24 12L28.5 16.5M24 12L24 16.5L28.5 16.5M28.5 16.5L28.5 21" stroke="black" stroke-width="2" />
                         <line x1="21" y1="27.5" x2="30" y2="27.5" stroke="black" stroke-width="2" />
                         <line x1="25" y1="22.5" x2="25" y2="31.5" stroke="black" stroke-width="2" />
                     </svg>
                     
                     <button onClick={() => { setfilename(""); setpreimport(false); setpostdelete(false); setimportmodal(false) }} className="modal-btn" id="can"> Cancel</button>
                        {filename && (
                            <>
                                <div id="fff">{filename}</div>
                               
                               <button onClick={() => { formsubmit(); setpreimport(false); setpostimport(true) }} className="modal-btn" id="sub">Submit</button>
                               
                            </>
                        )}
                    </div>
                
                ) : null}
                {/* <button onClick={() => setimportmodal(false)} className="btns"> Cancel</button> */}
                {postimport ? (<div className="postover floating-modal">
                    <h4>Import Complete</h4>
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87489 7.64249C2.98846 6.7977 1.55126 6.7977 0.664826 7.64249C-0.221609 8.48728 -0.221609 9.85696 0.664826 10.7018L8.32281 18L23.3352 3.69286C24.2216 2.84807 24.2216 1.47839 23.3352 0.633595C22.4487 -0.211198 21.0115 -0.211198 20.1251 0.633595L8.32281 11.8815L3.87489 7.64249Z" fill="black" />
                    </svg>
                    <p>CSV file is uploaded</p>
                    <button onClick={() => { setpostimport(false); setpreimport(false); setimportmodal(false) }} className="modal-btn"> Close</button>
                </div>) : null}
            </div>
            )
            }

            {deletemodal && (
                <>
                    {predelete ? <div className="delete-modal floating-modal">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="22.5" cy="22.5" r="22.5" fill="#2DA5FC" fill-opacity="0.5" />
                            <path d="M15.1428 19.7143H28.8571V31C28.8571 31.5523 28.4094 32 27.8571 32H16.1428C15.5905 32 15.1428 31.5523 15.1428 31V19.7143Z" stroke="black" stroke-width="2" />
                            <path d="M15.1428 20.5714H28.8571V15C28.8571 14.4477 28.4094 14 27.8571 14H16.1428C15.5905 14 15.1428 14.4477 15.1428 15V20.5714Z" stroke="black" stroke-width="2" />
                            <rect x="11" y="18.7143" width="22" height="2.85714" fill="black" />
                            <rect x="23.5715" y="20.1429" width="11.4286" height="3.14286" transform="rotate(90 23.5715 20.1429)" fill="black" />
                        </svg>

                        <h3>Delete</h3>
                        <button onClick={() => { deletecontacts(); (selections.length !== 0 && setpredelete(false)); (selections.length !== 0 && setpostdelete(true)) }} className="modal-btn">Ok</button>
                        <button onClick={() => setdeletemodal(false)} className="modal-btn" >Cancel</button>
                    </div> : null}
                    {postdelete ?
                        <div className="delete-complete floating-modal">
                            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87489 7.64249C2.98846 6.7977 1.55126 6.7977 0.664826 7.64249C-0.221609 8.48728 -0.221609 9.85696 0.664826 10.7018L8.32281 18L23.3352 3.69286C24.2216 2.84807 24.2216 1.47839 23.3352 0.633595C22.4487 -0.211198 21.0115 -0.211198 20.1251 0.633595L8.32281 11.8815L3.87489 7.64249Z" fill="black" />
                            </svg>
                            <h4>Contacts deleted</h4>
                            <button onClick={() => {
                                setpostdelete(false); setdeletemodal(false)
                            }} className="modal-btn" >Close</button>
                        </div>
                        : null}
                    {/* <button onClick={() => setdeletemodal(false)} >Cancel</button> */}
                </>
            )}


            
            
        </div>
    )
}
export default LandingPage;