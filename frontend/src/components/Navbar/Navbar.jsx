import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import AuthContext  from "../../context/auth-context"; 

const Navbar = () => {
    const { token , logout} = useContext(AuthContext);
  
    return (
      <header className="main-nav">
        <div className="main-nav-logo">
          <h1>Event Planner</h1>
        </div>
        <nav className="main-nav-items">
          <ul>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            {token && (
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
            )}
            {!token && (
              <li>
                <NavLink to="/auth">Authenticate</NavLink>
              </li>
            )}
            {token && (
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
};
  
export default Navbar;