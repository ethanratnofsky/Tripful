import React from "react";
import { Link } from "react-router-dom";

import TestImg from "../assets/test.png";

import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo-link">
                <h1 className="logo">Tripful</h1>
            </Link>
            <div className="right-group">
                <Link to="/create-trip" className="create-trip-button">
                    Create Trip
                </Link>
                <Link to="/profile">
                    <img className="user-profile" src={TestImg} alt="User" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
