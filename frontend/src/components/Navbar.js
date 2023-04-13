import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import TestImg from "../assets/test.png";

import "./Navbar.css";

const Navbar = () => {
    let location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/" className="logo-link">
                <h1 className="logo">Tripful</h1>
            </Link>
            <div className="right-group">
                {location.pathname !== "/login" && (
                    <>
                        {location.pathname !== "/create-trip" && (
                            <Link
                                to="/create-trip"
                                className="create-trip-button"
                            >
                                Create Trip
                            </Link>
                        )}
                        {location.pathname !== "/invites" && (
                            <Link
                                to="/invites"
                                className="create-trip-button"
                            >
                                Manage Invites
                            </Link>
                        )}
                        {location.pathname !== "/profile" && (
                            <Link to="/profile">
                                <img
                                    className="user-profile"
                                    src={TestImg}
                                    alt="User"
                                />
                            </Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
