import React, { useState } from "react";
const Import = () => {

    const [file, setfile] = useState();
    const [importmodal, setimportmodal] = useState(false);
    const [deletemodal, setdeletemodal] = useState(false);


    const filehandle = (e) => {
        setfile(e.target.files[0]);
    }

    const toggleimportmodal = () => {
        setimportmodal(true);
    }
    const toggledeletemodal = () => {
        setdeletemodal(true);
    }

    const formsubmit = async () => {
        console.log(file);
        const formdata = new FormData();
        formdata.append("file", file);
        console.log(formdata);
        await fetch("http://localhost:8086/contacts", {
            method: "POST",
            body: formdata
        })
    }

    const deletecontacts = async () => {
        await fetch("http://localhost:8086/contacts", {
            method: "DELETE"
        })
    }
    return (
        <>
            <button onClick={toggleimportmodal} >Import</button>
            <button onClick={toggledeletemodal}>Delete</button>

            {importmodal && (<div className="input-modal">
                <h2>Import modal</h2>
                <input type="file" onChange={filehandle} />
                <button onClick={formsubmit
                }>Submit</button>

            </div>)}



            {deletemodal && (<div className="delete-modal">
                <h2>delete modal</h2>
                <button>Delete</button>

            </div>)}




        </>
    )
}

export default Import

