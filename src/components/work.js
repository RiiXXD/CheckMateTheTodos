import "../style/work.css";
import React, { useContext, useEffect, useState } from "react";
import TodoContext from "../context/todoContext";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { collection,addDoc,where } from "firebase/firestore";
import { motion } from "framer-motion"

import{auth,db} from "../firebase-config"
import { async } from "@firebase/util";


export default function Work(){
    const [back,setBack]=useState("");
    const [title,setTitle]=useState("");
const[sucessStatus,setSucessStatus]=useState(false);
    const [hidden,setHidden]=useState(true);
    // const[user,setUser]=useState("");
    const {space,setSpace,color,setColor,setName,name}= useContext(TodoContext);
    const navigate=useNavigate();
    useEffect(() => {
        const data = window.localStorage.getItem('MY_APP_STATE');
        if ( data !== null ) setSpace(JSON.parse(data));
        const clr = window.localStorage.getItem('MY_AP_STATE');
        if ( clr !== null ) setColor(JSON.parse(clr)); 
        const usernames = window.localStorage.getItem('MY_name_STATE');
        if ( usernames !== null ) setName(JSON.parse(usernames)); 

      }, []);
      
const list = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },      }

   
    // const hide=()=>{
    // setHidden(true);
    // setSucessStatus(false);
    // }
      const handleAdd=  (e)=>{
        e.preventDefault();
            const checkUser=  onAuthStateChanged(auth,(user)=>{
                if(user)
                {
     console.log(`i am also working from work ${user.uid}`);
                    if(title!=="") // check if the user has given input or not then only changes db
                    {
                          addDoc(collection(db,`userData/users/${user.uid}`),
                        {
                title:title,
                completed:false,
                userId:user.uid,
                space,
                name,
                        })
                        console.log(`${user.uid} added me`)
                        setSucessStatus(true);
                        setHidden(false);
                    }
                }
                else
                {
                   navigate("/login")
                }

            })
            setTitle("");

            return checkUser;

        
       
    };
 
    // useEffect(()=>{
    //     // window.localStorage.setItem('MY_APP_STATE', JSON.stringify(space));
    // },[space]) //this one? Abhi hta de ise iska kaam nhi hai
return(
    <motion.div 
     initial="hidden"
    animate="visible"
    transition={{ duration: 1}}
    variants={list}
    className="main-container" style={{backgroundColor:color }}>
<nav>
<button className="back" onClick={()=>{ setBack(true);
     navigate("/")
     }}>Back</button>
<h1>{space}</h1>
</nav>
{/* <div className="sucess-alert" style={{display:sucessStatus===true && "none" }} >
        <span>Sucessfully added!</span>
        <button onClick={hide}>x</button>
    </div> */}
<form onSubmit={handleAdd}>
<div className="Work-function">
 
    <input value={title} type="text" placeholder="type your todo...." className="todo-input" onChange={(e)=>{setTitle(e.target.value)}}></input>
    <button type="submit" className="add-btn" onClick={handleAdd} >Add</button>
</div>

</form>
<button className="TaskShow" onClick={()=>{if(name!==null){navigate("/task")}}}>Show My Task</button>
<svg xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 1440 250"><path 
 fill="#f5deb3" fill-opacity="1" 
 d="M0,160L24,170.7C48,181,96,203
 ,144,181.3C192,160,240,96,288,
 80C336,64,384,96,432,138.7C480
 ,181,528,235,576,218.7C624,203
 ,672,117,720,106.7C768,96,816,160,
 864,192C912,224,960,224,1008,213.3C1056,
 203,1104,181,1152,176C1200,171,1248,181,
 1296,186.7C1344,192,1392,192,1416,192L1440,
 192L1440,320L1416,320C1392,320,1344,320,1296,
 320C1248,320,1200,320,1152,320C1104,320,1056,
 320,1008,320C960,320,912,320,864,320C816,320,
 768,320,720,320C672,320,624,320,576,320C528,
 320,480,320,432,320C384,320,336,320,288,
 320C240,320,192,320,144,320C96,320,48,320,24,
 320L0,320Z"></path></svg>
 </motion.div>


)}