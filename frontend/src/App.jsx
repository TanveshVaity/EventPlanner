import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from './pages/auth';
import Bookings from './pages/bookings';
import Events from './pages/events';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/events" element={<Events />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;