import Home from './components/home';
import Login from './components/login';
import Sign from './components/sign';
 import Work from './components/work';
 import Protected from './components/protected';
import './App.css';
import Task from './components/task';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import TodoContext from './context/todoContext';

function App() {
  const {name,space}= useContext(TodoContext);
  console.log(name,space);
  return (
    <div className="App">
      <Router> 
    {/* <Login/> */}
<Routes>
<Route path="/work" element={<Protected Component={Work}/>}/>
    <Route path="/" element={ <Protected Component={Home}/> }/>
    <Route path ="/sign" element={<Protected Component={Sign}/>}/>
    <Route path ="/login" element={<Protected Component={Login}/>}/>
    <Route path ="/task" element={<Protected Component={Task}/>}/>

</Routes>
    {/* <Sign/> */}
    {/* <Work/> */}
      </Router>
  

    </div>
  );
}

export default App;
