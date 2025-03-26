// import { useState } from 'react'
// import './App.css'
// import Register from './components/Register'
// import Login from './components/Login'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
// <Register />
// <Login /> ``
//     </>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { isLoggedIn } from './services/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isLoggedIn() ? <div>Home</div> : <Navigate to="/login" />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;