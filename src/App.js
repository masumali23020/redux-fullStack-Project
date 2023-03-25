import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import AddTask from './components/pages/AddTask';
import EditeTask from './components/pages/EditeTask';
import Home from './components/pages/Home';


function App() {
  return (
    <div >
     <>
     <Router >
     <Navbar />
     

      <Routes>
      
        <Route path='/' element={   <Home />} />
        <Route path='/addtask' element={   <AddTask />} />
        <Route path='/edittask/:taskId' element={   <EditeTask />} />
      </Routes>

     </Router>
     <ToastContainer position='top-center' theme='colored' />
   
     </>
     
    </div>
  );
}

export default App;
