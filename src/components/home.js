import "../style/home.css" 
import React, { useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import TodoContext from "../context/todoContext";
import { motion } from "framer-motion"

import { signOut,onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase-config"
 export default function Home(){
    console.log(process.env.REACT_APP_FIREBASE_API_KEY)
    const {setSpace,setColor,name,setName,user,setUser}= useContext(TodoContext);
    const navigate= useNavigate();
    const clickedWork=()=>{
        console.log("Clicked");
         setSpace("Work"); 
         setColor("#2f3061");
         navigate("/work")
        window.localStorage.setItem('MY_APP_STATE', JSON.stringify("Work"));
        window.localStorage.setItem('MY_AP_STATE', JSON.stringify("#2f3061"));

    }
    const clickedPersonal=()=>{
        console.log("Clicked");
        setSpace("Personal"); 
        navigate('/work') 
        setColor("#3CACAE");
        window.localStorage.setItem('MY_APP_STATE', JSON.stringify("Personal"));
        window.localStorage.setItem('MY_AP_STATE', JSON.stringify("#3CACAE"));

    }
    const logout = () => {
        signOut(auth);
      };
      useEffect(() => {
        onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
          })
            const usernames = window.localStorage.getItem('MY_name_STATE');
            if ( usernames !== null ) setName(JSON.parse(usernames)); 
    
        },[])
   
    return (
        <div className="home-container">
            <nav className="flx">
                <div className="logo">CheckMate</div>
                <div className="flx-row">
                <button className="SignUp"  style={{display:!user && "none"}} onClick={()=>{logout()}}>Log Out</button>
                <div className="profile">
                <div>{name.slice(0,2).toUpperCase()}</div>
                
              </div>
</div>
           
            </nav>
<div className="home-component ">
<div className="home-head"><h1 className="home-heading">Lets <span className="strike">check</span> task to do..!</h1>
</div>
<p className="home-text" > SELECT YOUR SPACE </p>
<div className="spaces flx">
<motion.button whileTap={{
    scale:[1,2,2,1,1],
    // rotate:[0,0,270,0,],
    // borderRadius:["50%","50%","20%","20%","50%","50%"]
    
}}    transition={{ duration: 1}}className="work-btn" onClick={clickedWork}
 >Work</motion.button>
          <motion.button whileTap={{
    scale:[1,2,2,1,1],
    // rotate:[0,0,270,0,],
    // borderRadius:["50%","50%","20%","20%","50%","50%"]
    
}}    transition={{ duration: 1}} className="personal-btn"   onClick={clickedPersonal} >Personal</motion.button>
</div>
</div>
        </div>
    )
 }