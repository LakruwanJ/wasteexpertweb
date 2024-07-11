import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Admin from "./components/Pages/Admin";
import Dispatcher from './components/Pages/Dispatcher';
import Collector from './components/Pages/Collector';
import Login from './components/Pages/login';
import Register from './components/Pages/register';
import Map from './components/Basic/MyMapComponent';
import ProtectedRoute from './components/ProtectedRoute';
import DispatcherLogin from './components/Pages/DispatcherLogin';
import CollectorLogin from './components/Pages/CollectorLogin';



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/Admin" element={<Admin />} />
        <Route path="/Dispatcher" element={<Dispatcher />} />
        <Route path="/Collector" element={<Collector />} />
        <Route path="/map" element={<Map />} />

        <Route path="/Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/Dispatcher" element={<ProtectedRoute><Dispatcher /></ProtectedRoute>} />
        <Route path="/Collector" element={<ProtectedRoute><Collector /></ProtectedRoute>} />

        <Route path="/dispatcher-login" element={<DispatcherLogin />} />
        <Route path="/" element={<DispatcherLogin />} /> {/* Redirect to login or homepage */}

        <Route path="/collector-login" element={<CollectorLogin />} />
        <Route path="/" element={<CollectorLogin />} /> {/* Redirect to login or homepage */}

        
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
