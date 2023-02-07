import React, { useState, useEffect } from "react";

import "./Login.css";

const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = phoneNumberString.replace(/\D/g, "");

    if (cleaned.length < 4) return null;

    const match = cleaned.match(/(\d{3})(\d{1,3})?(\d{1,4})?$/);

    if (match)
        return `(${match[1]})${match[2] !== undefined ? ` ${match[2]}` : ""}${
            match[3] !== undefined ? `-${match[3]}` : ""
        }`;

    return null;
};

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value.replace(/\D/g, ""));
    };

    const handleSubmit = () => {
        alert("TODO: Logging in with phone number: " + phoneNumber);
    };

    useEffect(() => {
        setFormattedPhoneNumber(formatPhoneNumber(phoneNumber));
    }, [phoneNumber]);

    return (
        <div className="login-container">
            <form>
                <h1>Login or Sign-Up</h1>
                <input
                    id="phone-number-input"
                    type="tel"
                    value={formattedPhoneNumber || phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="(123) 456-7890"
                    maxLength={14}
                />
                <input
                    type="submit"
                    onSubmit={handleSubmit}
                    disabled={phoneNumber.length !== 10}
                    value="Continue"
                />
            </form>
        </div>
    );
};

export default Login;
