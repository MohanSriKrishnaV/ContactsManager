import React from "react";
import Login from "./components/login";
import SignUp from "./components/registration";
import LandingPage from "./components/landing";
import {BrowserRouter, Route, Routes} from "react-router-dom"
const App = ()=>{
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/landing" element={<LandingPage/>}></Route>
      <Route path="*" element={<h1>404 page not found</h1>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App