// import { createContext,useState } from "react";

//   const TodoContext=createContext();


//  export const ContextProvider =({children})=>{ //default? Ruko check kr rha


// const [space,setSpace]=useState({});


// // const workClicked=()=>{
// // setSpace({"work":"work",});
// // }


// // const personalClicked=()=>{
// //     setSpace({"personal":"personal",});
// //     }


// return (
//     <TodoContext.Provider value={{space}}>{children}
//     </TodoContext.Provider>
// )


// }


// export default TodoContext;

import { createContext,useState } from "react";

const TodoContext= createContext();

export const StateProvider=({children})=>
{
    const [name,setName]=useState("");
    const [space,setSpace]=useState("")
    const [color,setColor]=useState("")
    const [authenticated,setAuthenticated]=useState(false);
    const[user,setUser]=useState("");


    return(
        <TodoContext.Provider value={{name,setName,space,setSpace,color,setColor,authenticated,setAuthenticated,user,setUser}}>{children}</TodoContext.Provider>
    )
}

export default TodoContext;