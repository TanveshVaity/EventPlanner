import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"

const Navbar = () =>{
    return(
        <header className="main-nav">
            <div className="main-nav-logo">
                <h1>Event Planner</h1>
            </div>
            <nav className="main-nav-items">
                <ul>
                    <li><NavLink to="/events">Events</NavLink></li>
                    <li><NavLink to="/bookings">Bookings</NavLink></li>
                    <li><NavLink to="/auth">Authenticate</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;