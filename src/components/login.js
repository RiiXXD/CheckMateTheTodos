import "../style/login.css";

import React, { useEffect, useState,useContext } from "react";
import {onAuthStateChanged, signInWithEmailAndPassword} from"firebase/auth"
import {auth} from "../firebase-config"
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import TodoContext from "../context/todoContext";

export default function Login(){
    const {user,setUser}= useContext(TodoContext);

    const navigate=useNavigate(); 
    const [emailLogin,setEmailLogin]=useState("");
    const [passwordLogin,setPasswordLogin]=useState("");
    
    const logInWithEmailAndPassword = async (email, password) => {
        
      try{
          signInWithEmailAndPassword(auth, email, password);
          console.log(user);
          navigate("/");
         }
          catch(error) {
          alert(error.message);
            
          };

    
      };
      
    
    return(
        <div className="login-container">
          <div className="login-card">
    <h2>Login</h2>
    <form>
        <input type="email" className="Login-email" placeholder=" Email.." onChange={(e)=>{setEmailLogin(e.target.value)}}required></input>
        <input type="password" className="Login-password" placeholder=" Password.." onChange={(e)=>{setPasswordLogin(e.target.value)}} required></input>
        <button className="login-btn" onClick={(e)=>{e.preventDefault(); logInWithEmailAndPassword(emailLogin,passwordLogin);}}>Login</button>
    </form>
</div>

        </div>
    )
}  