import React, { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase.config";

import "./Profile.css";

import TestImg from "../assets/test.png";

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("XXX-XXX-XXXX");

    const navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setFirstName(currentUser.uid);
            setPhoneNumber(currentUser.phoneNumber);
        } else {
            console.log("User is not logged in.");
        }
    });

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
                    <h1>Hey, {firstName}!</h1>
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
