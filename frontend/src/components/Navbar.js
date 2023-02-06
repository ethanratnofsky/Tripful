import React from "react";

import TestImg from "../assets/test.png";

import "./Navbar.css";

import { handleCreateTrip } from "../utils/tripUtils";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="logo">Tripful</h1>
            <div className="right-group">
                <button
                    className="create-trip-button"
                    onClick={handleCreateTrip}
                >
                    Create Trip
                </button>
                <img className="user-profile" src={TestImg} alt="User" />
            </div>
        </nav>
    );
};

export default Navbar;
