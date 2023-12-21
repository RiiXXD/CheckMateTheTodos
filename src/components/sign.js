import "../style/sign.css";
import {auth} from "../firebase-config";
import TodoContext from "../context/todoContext";

import {createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import React, { useEffect, useState ,createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";

export default function Sign(){
  const navigate=useNavigate();


  const {setAuthenticated,setName,name,user,setUser}= useContext(TodoContext)
  useEffect(() => {
    onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        setAuthenticated(true);
      
        })
    },[])
    
    const [emailSign,setEmailSign]=useState("");
    const [passwordSign,setPasswordSign]=useState("");
    const [username,setUsername]=useState("");
    const registerWithEmailAndPassword = async (name,email, password) => {
        try {
          const res = await createUserWithEmailAndPassword(auth,email, password);
                  setEmailSign("");

          console.log(email);
          const user=(res.user);
          user.displayName=name;
          window.localStorage.setItem('MY_name_STATE', JSON.stringify(name));

          } catch (err) {
          console.error(err);
          alert(err.message);
        }
                setUsername(" ");
        setPasswordSign(" ");

      
      };
useEffect(()=>{
  if(user){
    navigate("/")
  }
},[user])
    return(
        <div className="sign-container">
          <div className="sign-card">
    <h2>Sign Up</h2>
    <form>
        <input type="text" className="Sign-user" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
        <input type="email" className="Sign-email" placeholder=" Email.." required onChange={(e)=>{setEmailSign(e.target.value)}}></input>
        <input type="password" className="Sign-password" placeholder=" Password.." onChange={(e)=>{setPasswordSign(e.target.value)}} required></input>
        <button className="sign-btn" onClick={(e)=>{ e.preventDefault(); registerWithEmailAndPassword(name,emailSign,passwordSign)}}>Sign Up</button>
    </form>
    <small className="member-check">Already a member? <button className="login-navigation"onClick={()=>{navigate("/login");
}}>Login</button></small>


</div>

        </div>
    )
}  