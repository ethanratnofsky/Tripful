import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase.config";
import { useAuth } from "../contexts/AuthContext";
import { formatPhoneNumber } from "../utils/utils";

import "./Profile.css";

import TestImg from "../assets/test.png";

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [user, setUser] = useState();
    const [phoneNumber, setPhoneNumber] = useState("XXX-XXX-XXXX");

    const fetchUser = async (userId) => {
        // TODO: use endpoint to fetch with tripId
        const response = await fetch(
            `${"http://127.0.0.1:5000"}/api/read-user?user_id=${userId}`
        );
        const data = await response.json();
        setUser(data);
        console.log(data);
    };

    const handleEditProfile = () => {
        alert("TODO: Editing profile...");
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User logged out.");
                navigate("/login");
            })
            .catch((error) => {
                console.log("Error logging out user:", error);
            });
    };

    useEffect(() => {
        fetchUser(currentUser.uid);
    }, []);

    return (
        <div className="profile-container">
            <div className="header">
                <img className="user-profile" src={TestImg} alt="User" />
                <div className="user-info">
                    <h1>Hey, {user?.name}!</h1>
                    <p>
                        <strong>Phone Number:</strong> +1{" "}
                        {formatPhoneNumber(currentUser.phoneNumber.slice(2))}
                    </p>
                    {/* <button onClick={handleEditProfile}>Edit Profile</button> */}
                    <button
                        className="delete-trip-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
