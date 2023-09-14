import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from './pages/Auth/Auth';
import Bookings from './pages/bookings';
import Events from './pages/events';
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
