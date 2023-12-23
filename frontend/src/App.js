
import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './component/Dashboard';
import Login from './component/Login'
import Register from './component/Register'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Gallary from './component/Gallary';


function App() {

  const [token,setToken] = useState()


  useEffect(()=>{
    
    if(window !== 'undefined'){
      const tokenData =   localStorage.getItem("token")
      console.log("dhbchgds",tokenData)
      setToken(tokenData)
    }
  },[token])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/create/:type' element={<Gallary/>}/>
      </Routes>
  </Router>
  );
}

export default App;
