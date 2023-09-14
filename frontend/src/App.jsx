import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from './pages/Auth/Auth';
import Bookings from './pages/Bookings';
import Events from './pages/Events';
import Navbar from './components/Navbar/Navbar';
import AuthContext from './context/auth-context';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (authToken, authUserId) => {
    setToken(authToken);
    setUserId(authUserId);
    localStorage.setItem('token', authToken);
    localStorage.setItem('userId', authUserId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken && storedUserId) {
      login(storedToken, storedUserId);
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        <Navbar />
        <main className="main-content">
          <Routes>
            {!token && <Route path="/" element={<Navigate to="/auth" />} />}
            {token && <Route path="/" element={<Navigate to="/events" />} />}
            {token && <Route path="/auth" element={<Navigate to="/events" />} />}
            {!token && <Route path="/auth" element={<Auth />} />}
            <Route path="/events" element={<Events />} />
            {token && <Route path="/bookings" element={<Bookings />} />}
          </Routes>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
