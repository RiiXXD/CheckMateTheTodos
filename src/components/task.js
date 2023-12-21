import React,{useState,useEffect, useContext} from "react";
import "../style/task.css";
import {useNavigate} from "react-router";

import {collection,query,onSnapshot,doc,updateDoc,deleteDoc, where} from "firebase/firestore";
import{db,auth} from "../firebase-config";
import {MdOutlineDownloadDone, MdDeleteSweep } from "react-icons/md";

import {onAuthStateChanged} from "firebase/auth"
import TodoContext from "../context/todoContext";

export default function Task(){
    const {name,setName,space,setSpace}= useContext(TodoContext)
    const[todos,setTodos]=useState([]);
    const [user,setUser] =useState();
    const [newTitle,setNewTitle] =useState();
    const navigate= useNavigate();

    onAuthStateChanged(auth,(currentUser)=>{
if(currentUser){
    setUser(currentUser);

} 
else{
console.log("User not present")
}     })
const handleChange=(e)=>{
    e.preventDefault();
    if(todos.completed=== true ){
        setNewTitle(todos.title);
    }
    // else{
    //     todos.title=""; // but why we normally dont do like this right? NOrmally hum onclick pe ek function run krate hai. Tune props pass kra jo ki object haik function hai
    //     setNewTitle(e.target.value);
    // }
    
        };

   useEffect(()=>{
    const usernames = window.localStorage.getItem('MY_name_STATE');
    if ( usernames !== null ) setName(JSON.parse(usernames)); 
    const data = window.localStorage.getItem('MY_APP_STATE');
    if ( data !== null ) setSpace(JSON.parse(data));

    if(user){
        console.log(`i am from task ${name} with${user.uid} and ${space}`);
        const q= query(collection(db,`userData/users/${user.uid}`),where("space","==",`${space}`));
        const unsub = onSnapshot(q, (querySnapshot) => {  
            let todosArray = [];
            querySnapshot.forEach((doc) => {
              todosArray.push({ ...doc.data(), id: doc.id });
      
            });
            setTodos(todosArray);
            console.log(todos)
          });
          
          // return ()=> unsub();  //await?????
           console.log(todos?true:false);
           return ()=>unsub();
      
        }
    
    


   },[user])

   const handleEdit = async (todos, title) => {
    await updateDoc(doc(db, `userData/users/${user.uid}`, todos.id), { title: title });
  };

  const toggleComplete = async (todos) => {
    await updateDoc(doc(db, `userData/users/${user.uid}`, todos.id), { completed: !todos.completed }); 
    
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `userData/users/${user.uid}`, id));  
  };


    return(
        <div className="task">
                     <header className="flx">
              <div className="logo">CheckMate</div>
             <div className="flx">
<div className="navigation">
  <button className="HomeNav" onClick={()=>{navigate("/")}}>Home</button>
  <button className="WorkNav"onClick={()=>{navigate("/work")}}>{space}</button>

</div>
 <div className="profile">

                <div>{name.slice(0,2).toUpperCase()}</div>
              </div>
            </div>

            </header>
            <label className="total">You have got {todos.length} task on your list</label>

           <div className="task-container">
 
             {todos && todos.map((todo)=>{
           return( <div className="show-task">
           <input className="todo-list" type="text" style={{textDecoration:todo.completed && "line-through", backgroundColor:todo.completed && "rgb(48, 107, 52,0.8)"}} value={todo===""?newTitle:todo.title} onChange={handleChange}></input>
           <div className="functionality">
               {/* <button className="edit" onClick={()=>{handleEdit(todo,newTitle)} }><AiFillEdit/></button> */}
               <button className="done"onClick={()=>{toggleComplete(todo)}}><MdOutlineDownloadDone/></button>
               <button  className="del"onClick={()=>handleDelete(todo.id)}><MdDeleteSweep/></button>
          </div>
       </div>)

            })}
            
           </div>
        </div>
    )
 }






// const [title,setTitle]=useState("");
//     const [completed,setCompleted]=useState(false);
//     const [todos,setTodos]=useState([]);
//     const [user,setUser]=useState();

//     useEffect( () => {
//         onAuthStateChanged(auth,(currentUser)=>{
// setUser(currentUser);
//         }) 
//         if(user){
//           const q = query(collection(db, `userData/users/${user.uid}`));
//           const unsub = onSnapshot(q, (querySnapshot) => {  
//             let todosArray = [];
//             querySnapshot.forEach((doc) => {
//               todosArray.push({ ...doc.data(), id: doc.id });
      
//             });
//             setTodos(todosArray);
//           });
          
//           // return ()=> unsub();  //await?????
//            console.log(todos)
//            return ()=>unsub();
      
//         }
//         else{
//           console.log("I AM WORKING")
//         }
//         }, [user]);

//         const handleEdit = async (todos, title) => {
//             await updateDoc(doc(db, `userData/users/${user.uid}`, todos.id), { title: title });
//           };
        
//           const toggleComplete = async (todos) => {
//             await updateDoc(doc(db, `userData/users/${user.uid}`, todos.id), { completed: !todos.completed }); 
//           };
        
//           const handleDelete = async (id) => {
//             await deleteDoc(doc(db, `userData/users/${user.uid}`, id));  
//           };
        
           
//         const handleChange=(e)=>{
//         e.preventDefault();
        
//         if(todos.completed=== true ){
//             setTitle(todos.title);
//         }
//         else{
//             todos.title=""; // but why we normally dont do like this right? NOrmally hum onclick pe ek function run krate hai. Tune props pass kra jo ki object haik function hai
//             setTitle(e.target.value);
//         }
//             };
        
//     return(
//      <div>
//         {todos && todos.map((todo)=>{
//           return(
//                       <div>
//                     <input  style={{textDecoration:todo.completed && "line-through"} } type="text" value={todo.title==="" ?title :todo.title} className="list" onChange={handleChange}></input>
//                     <div className="functional">
//         <button onClick={()=>toggleComplete(todo)} className="todo-complete">Done</button>
//         <button onClick={()=>handleEdit(todo,title)} className="btn-edit">Edit</button>
//         <button onClick={()=>handleDelete(todo.id)} className="btn-delete">delete</button>
//         </div> 
//           </div>
//           )
        
//         })}</div>
        
//     )
