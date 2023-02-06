import React, { useState } from "react";

import "./Profile.css";

import TestImg from "../assets/test.png";

const Profile = () => {
    const [firstName, setFirstName] = useState("Ethan");
    const [phoneNumber, setPhoneNumber] = useState("XXX-XXX-XXXX");

    const handleEditProfile = () => {
        alert("TODO: Editing profile...");
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
                </div>
            </div>
        </div>
    );
};

export default Profile;
