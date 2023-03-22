import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase.config";

import "./Profile.css";

import TestImg from "../assets/test.png";

const Profile = () => {
    const [phoneNumber, setPhoneNumber] = useState("XXX-XXX-XXXX");
    const [user, setUser] = useState([]);

    const navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setPhoneNumber(currentUser.phoneNumber);
            fetchUser(currentUser.uid);
        } else {
            console.log("User is not logged in.");
        }
    });

    const fetchUser = async (userId) => {
        // TODO: use endpoint to fetch with tripId
        const response = await fetch(
            `${"http://127.0.0.1:5000"}/api/read-user?user_id=${userId}`
        );
        const data = await response.json();
        setUser(data);
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

    return (
        <div className="profile-container">
            <div className="header">
                <img className="user-profile" src={TestImg} alt="User" />
                <div className="user-info">
                    <h1>Hey, {user.name}!</h1>
                    <p>
                        <strong>Phone Number:</strong> {phoneNumber}
                    </p>
                    <button onClick={handleEditProfile}>Edit Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
