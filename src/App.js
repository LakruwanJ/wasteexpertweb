import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Admin from "./components/Pages/Admin";
import Dispatcher from './components/Pages/Dispatcher';
import Collector from './components/Pages/Collector';
import Login from './components/Pages/login';
import Register from './components/Pages/register';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/Dispatcher" element={<ProtectedRoute><Dispatcher /></ProtectedRoute>} />
        <Route path="/Collector" element={<ProtectedRoute><Collector /></ProtectedRoute>} />
        <Route path="/" element={<Admin />} /> {/* Or redirect to login */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
