import React, { useState, useEffect } from "react"
//import Header from "../header/header"
import "./landing.css";
// import DragAndDrop from "../ddf";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["CSV"];

const LandingPage = () => {
    const navigate = useNavigate()
    const [res, setRes] = useState("");
    const [mail, setmail] = useState([]);
    const [data, setdata] = useState([]);
    const [selections, setSelections] = useState([]);
    const [deletemodal, setdeletemodal] = useState(false);
    const [count, setcount] = useState(0);
    const [predelete, setpredelete] = useState(false);
    const [postdelete, setpostdelete] = useState(false);
    const [preimport, setpreimport] = useState(false);
    const [postimport, setpostimport] = useState(false);
    const inputRef = useRef();

    const [file, setfile] = useState(null);
    const [importmodal, setimportmodal] = useState(false);
    const [importcomplete, setimportcomplete] = useState(true);
    const [uploadmodal, setuploadmodal] = useState(false);


    // const handleChange = (file) => {
    //     setfile(file);
    //     // console.log(file);ls
    // };














    const filehandle = (e) => {
        setfile(e.target.files[0]);
    }

    const toggleimportmodal = async () => {
        setimportmodal(true);
        uploadmodal(true);
    }


    const formsubmit = async () => {
        const user_data = localStorage.getItem("user")
        console.log(typeof(user_data));
        const req_user = JSON.parse(user_data);
        console.log(typeof(req_user));
        console.log(req_user._id)
        const formdata = new FormData();
        formdata.append("file", file);
        console.log(formdata);
        const res = await fetch("http://localhost:8086/contacts", {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("jwt"),
            },
            body: formdata, 
        })
        const response = await res.json();
        if (response.status == "success") {
            window.location.reload();
        }

    }


    //////////////////////////////


    const dltContact = async (e) => {
        fetch(`http://localhost:8086/contacts/:${e.target.name}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8', "Authorization": localStorage.getItem("jwt")
            },
        }).then((response) => response.json())
            .then((prevdata) => {
                console.log(prevdata);
                // setdata(prevdata);
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
        await fetch("http://localhost:8086/contacts", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8', "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify(selections),
        }).then((response) => response.json())
            .then((prevdata) => {
                console.log(prevdata);
                // setdata(prevdata);
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
        fetch("http://localhost:8086/contacts", {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((res) => {
            return res.json()
        }).then((final) => {
            setdata(final.info)
            if(final.message){
                navigate('/landing')   
            }
            console.log(final.message)
        }).catch((err) => {
            console.log(err)
        })
    //   console.log(res) 
    }, [count])

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
    // {
    //     navigate('/', {replace:true})
    //     window.history.replaceState('/landing',"/");
    // }

    const x = localStorage.getItem("jwt")
    const y = localStorage.getItem("user")
    const z = JSON.parse(y)
    const em = z.email
    console.log(em);
    console.log(JSON.parse(y))
    // const z = y.email;
    // console.log(z)
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
            if (flag == "true") {
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
    const [filename,setfilename]=useState("")

    const ondrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setfilename(file.name);
        setfile(file);
    };
    return (

        <div id="grid-container">

<div
                className="App floating-modal"
                onDrop={ondrop}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
            >
                <h3>Drag and Drop a CSV file to upload</h3>
                {filename && (
                    <>
                        <div>{filename}</div>
                        <h4>Press submit to upload the CSV file</h4>
                        <button onClick={formsubmit} className="modal-btn">Submit</button>
                        <button onClick={() => { setfilename(""); setpreimport(false); setpostdelete(false); setimportmodal(false) }} className="modal-btn"> Cancel</button>
                    </>
                )}
            </div>




            <div id='navbar'>
                <button>Select Date</button>
                <button>Filter</button>
                <button onClick={() => { setimportmodal(true); setpreimport(true) }} >Import</button>
                <button onClick={() => { setdeletemodal(true); setpredelete(true) }}>Delete</button>
                <button>Export</button>
            </div>
            {importmodal && (<div className="modalinput">
                <p>flaoting modal</p>
                {(preimport) ? (<div className="pre-upload-modal">
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22.5" cy="22.5" r="22.5" fill="#2DA5FC" fill-opacity="0.5" />
                        <path d="M19.5 30L14.5 30C13.9477 30 13.5 29.5523 13.5 29L13.5 13C13.5 12.4477 13.9477 12 14.5 12L24 12M24 12L28.5 16.5M24 12L24 16.5L28.5 16.5M28.5 16.5L28.5 21" stroke="black" stroke-width="2" />
                        <line x1="21" y1="27.5" x2="30" y2="27.5" stroke="black" stroke-width="2" />
                        <line x1="25" y1="22.5" x2="25" y2="31.5" stroke="black" stroke-width="2" />
                    </svg>


                    {/* <div className="DragDrop">
                        <h1>Hello To Drag & Drop Files</h1>
                        <FileUploader
                            multiple={true}
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        />
                        <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
                    </div> */}


                    <h3>Upload file</h3>
                    <input type="file" onChange={filehandle} />
                    <button onClick={() => { if (file !== null) { formsubmit(); setpreimport(false); setpostimport(true) } }} className="btns" >Submit</button>
                    <button onClick={() => { setpreimport(false); setpostdelete(false); setimportmodal(false) }} className="btns"> Cancel</button>
                </div>) : null}
                {/* <button onClick={() => setimportmodal(false)} className="btns"> Cancel</button> */}
                {postimport ? (<div className="postover">
                    <h4>Import Complete</h4>
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87489 7.64249C2.98846 6.7977 1.55126 6.7977 0.664826 7.64249C-0.221609 8.48728 -0.221609 9.85696 0.664826 10.7018L8.32281 18L23.3352 3.69286C24.2216 2.84807 24.2216 1.47839 23.3352 0.633595C22.4487 -0.211198 21.0115 -0.211198 20.1251 0.633595L8.32281 11.8815L3.87489 7.64249Z" fill="black" />
                    </svg>
                    <p>CSV file is uploaded</p>
                    <button onClick={() => { setpostimport(false); setpreimport(false); setimportmodal(false) }} className="btns"> Close</button>
                </div>) : null}
            </div>
            )
            }

            {deletemodal && (
                <>

                    {predelete ? <div className="delete-modal">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="22.5" cy="22.5" r="22.5" fill="#2DA5FC" fill-opacity="0.5" />
                            <path d="M15.1428 20.5714H28.8571V15C28.8571 14.4477 28.4094 14 27.8571 14H16.1428C15.5905 14 15.1428 14.4477 15.1428 15V20.5714Z" stroke="black" stroke-width="2" />
                            <rect x="11" y="18.7143" width="22" height="2.85714" fill="black" />
                            <rect x="23.5715" y="20.1429" width="11.4286" height="3.14286" transform="rotate(90 23.5715 20.1429)" fill="black" />
                        </svg>
                        <h3>Delete</h3>
                        <button onClick={() => { deletecontacts(); (selections.length !== 0 && setpredelete(false)); (selections.length !== 0 && setpostdelete(true)) }} className="btns">Ok</button>
                        <button onClick={() => setdeletemodal(false)} className="btns" >Cancel</button>
                    </div> : null}

                    {postdelete ?
                        <div className="delete-complete">
                            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87489 7.64249C2.98846 6.7977 1.55126 6.7977 0.664826 7.64249C-0.221609 8.48728 -0.221609 9.85696 0.664826 10.7018L8.32281 18L23.3352 3.69286C24.2216 2.84807 24.2216 1.47839 23.3352 0.633595C22.4487 -0.211198 21.0115 -0.211198 20.1251 0.633595L8.32281 11.8815L3.87489 7.64249Z" fill="black" />
                            </svg>
                            <h4>Contacts deleted</h4>
                            <button onClick={() => {
                                setpostdelete(false); setdeletemodal(false)
                            }}>Close</button>
                        </div>
                        : null}
                    {/* <button onClick={() => setdeletemodal(false)} >Cancel</button> */}
                </>

            )}



            <div id="aside"> Aside</div>
            <div>
                <input type="text" placeholder="search by email id " onChange={(e) => { setmail(e.target.value) }} />
                {/* <select   >
                    {(arr2.length !== 0) && (arr2.length <= 10) && <>{arr2.map((value, key) => {
                        return (
                            <>
                                <option key={key}>{value.email}</option>
                            </>
                        )
                    })}</>
                    }
                </select> */}
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
                <tbody>
                    {(arr2.length !== 0) && <>{arr2.map((value) => {
                        return (

                            <tr key={value._id} title={value.email} id="titlee">
                                <td >
                                    <input type="checkbox" name={value._id} onChange={selectionChange} /></td>
                                <td>{value.name}</td>
                                <td>{value.designation}</td>
                                <td>{value.company}</td>
                                <td>{value.industry}</td>
                                <td >{value.email}</td>
                                <td>{value.phone}</td>
                                <td>{value.country}</td>
                                <td><button id="edit">edit</button></td>
                                <td><button id="dlt" onClick={dltContact} name={value._id}>delete</button></td>
                            </tr>
                        )

                    })}</>}
                </tbody>
            </table>
            <button onClick={HandleLogout}>Logout</button>
        </div>
    )
}
export default LandingPage;