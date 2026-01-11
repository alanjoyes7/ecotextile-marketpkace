import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import Buyers from "./pages/Buyers";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import MyListings from "./pages/MyListings";

// TEMPORARY: Bypass login - comment out when you want login back
const BYPASS_LOGIN = true;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Show navbar on all pages except login/register when not bypassed */}
          <Routes>
            <Route path="/login" element={BYPASS_LOGIN ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={BYPASS_LOGIN ? <Navigate to="/" /> : <Register />} />
            <Route path="*" element={<Navbar />} />
          </Routes>

          <div style={{ flex: 1 }}>
            <Routes>
              {/* Public routes - redirect to home when bypassing */}
              <Route path="/login" element={BYPASS_LOGIN ? <Navigate to="/" /> : <Login />} />
              <Route path="/register" element={BYPASS_LOGIN ? <Navigate to="/" /> : <Register />} />

              {/* Protected routes - now accessible without login when bypassed */}
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/buyers" element={<Buyers />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/my-listings" element={<MyListings />} />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;