import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Admin from "./components/Pages/Admin";
import Dispatcher from './components/Pages/Dispatcher';
import Collector from './components/Pages/Collector';
import Login from './components/Pages/login';
import Register from './components/Pages/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Dispatcher" element={<Dispatcher />} />
        <Route path="/Collector" element={<Collector />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
