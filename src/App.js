import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Admin from "./components/Pages/Admin";
import Dispatcher from "./components/Pages/Dispatcher";
import Collector from "./components/Pages/Collector";
import Login from "./components/Pages/login";
import Register from "./components/Pages/register";
import Map from "./components/main/Map";
import MapSmartbin from "./components/main/MapSmartbin";
import ProtectedRoute from "./components/ProtectedRoute";
import DispatcherLogin from "./components/Pages/DispatcherLogin";
import CollectorLogin from "./components/Pages/CollectorLogin";
import ScheduleLocInArea from "./components/Data/ScheduleLocInArea";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/dispatcher-login" element={<DispatcherLogin />} />
        <Route path="/collector-login" element={<CollectorLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute userType="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dispatcher"
          element={
            <ProtectedRoute userType="dispatcher">
              <Dispatcher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collector"
          element={
            <ProtectedRoute userType="collector">
              <Collector />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map-smartbin"
          element={
            <ProtectedRoute userType="dispatcher">
              <MapSmartbin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/abc"
          element={
            <ProtectedRoute userType="dispatcher">
              <ScheduleLocInArea />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;