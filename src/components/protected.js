import React, { useContext, useEffect, useState } from 'react';
import {auth} from "../firebase-config";
import {onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router';
import TodoContext from '../context/todoContext';
export default function Protected(props){

    const {user,setUser}= useContext(TodoContext);
    console.log(user)

    const {Component}=props;
    const navigate=useNavigate();

    





    
useEffect(()=>{
    
    const checkUser=  onAuthStateChanged(auth,(user)=>{
        if(!user)
        {
            console.log(user);
          navigate("/sign"); 
        }
        
        return checkUser;
})
},[]);
return(
    <div>
        <Component/>
    </div>
)}