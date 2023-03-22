import React, { useState, useEffect } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase.config";

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
    const [countryCode, setCountryCode] = useState("+1");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);
    const [showVerificiationError, setShowVerificationError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [numberExists, setNumberExists] = useState(true);
    const [name, setName] = useState([""]);

    const navigate = useNavigate();

    const generateRecaptchaVerifier = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            },
            auth
        );
    };

    const sendVerificationCode = () => {
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, countryCode + phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                console.log(
                    `SMS sent to ${countryCode} ${formattedPhoneNumber}.`
                );
                window.confirmationResult = confirmationResult;
                setIsLoading(false);
                setIsVerifyingCode(true);
            })
            .catch((error) => {
                // Error; SMS not sent
                console.log(
                    `SMS was not sent to ${countryCode} ${formattedPhoneNumber}:`,
                    error
                );
                // Reset reCAPTCHA
                window.recaptchaVerifier.render().then((widgetId) => {
                    grecaptcha.reset(widgetId);
                });
            });
    };

    const verifyCode = () => {
        setShowVerificationError(false);
        window.confirmationResult
            .confirm(verificationCode)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log("Code is correct! Logged-in user ID: ", user.uid);
                navigate("/");
                if (!numberExists) {
                    fetch("http://127.0.0.1:5000/api/create-user", {
                        method: "POST",
                        body: JSON.stringify({
                            _id: user.uid,
                            name: name,
                            phone_number: user.phoneNumber,
                        }),
                        header: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }).then((response) => {
                        response.json();
                    });
                }
                // make post request to create user
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                console.log("Error: ", error);
                setShowVerificationError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value.replace(/\D/g, ""));
    };

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const getLatestUsers = () => {
        fetch("http://127.0.0.1:5000/api/read-users")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => setUsers(data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (users.length == 0) {
            setNumberExists(false);
        }

        if (!isVerifyingCode) {
            users.map((user) => {
                if (user.phone_number === countryCode + phoneNumber) {
                    setNumberExists(true);
                } else {
                    setNumberExists(false);
                }
            });
        }

        if (isVerifyingCode) {
            // Verification code already sent
            verifyCode();
        } else {
            // Send verification code
            console.log(
                "Attempting to login in with phone number: " +
                    countryCode +
                    phoneNumber
            );

            generateRecaptchaVerifier();
            sendVerificationCode();
        }
    };

    // Determine formatted phone number as user types
    useEffect(() => {
        setFormattedPhoneNumber(formatPhoneNumber(phoneNumber));
        getLatestUsers();
    }, [phoneNumber]);

    return (
        <div className="login-container">
            <form id="login-form" onSubmit={handleSubmit}>
                <h1>Login or Register</h1>
                <p>Please enter your phone number.</p>
                <div>
                    <label
                        htmlFor="phone-number-input"
                        className="country-code"
                    >
                        {countryCode}
                    </label>
                    <input
                        id="phone-number-input"
                        type="tel"
                        value={formattedPhoneNumber || phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="(XXX) XXX-XXXX"
                        maxLength={14}
                        disabled={isVerifyingCode}
                    />
                </div>
                {!numberExists && (
                    <>
                        <p className="verification-code-message">
                            This number has not been registered. Please enter
                            your name below to register!
                        </p>
                        <input
                            type="text"
                            placeholder="Enter name..."
                            value={name}
                            onChange={handleNameChange}
                        />
                    </>
                )}
                {isVerifyingCode && (
                    <>
                        <p
                            className="verification-code-message"
                            htmlFor="verification-code-input"
                        >
                            A 6-digit verification code has been sent to{" "}
                            {formattedPhoneNumber}.
                            <br />
                            Please enter it below.
                        </p>
                        <input
                            id="verification-code-input"
                            type="text"
                            placeholder="XXXXXX"
                            maxLength={6}
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                        />
                        {showVerificiationError && (
                            <p className="verification-error">
                                Incorrect verification code. Please try again.
                            </p>
                        )}
                    </>
                )}
                <div id="recaptcha-container" />
                <input
                    id="submit-button"
                    type="submit"
                    disabled={phoneNumber.length !== 10 || isLoading}
                    value={isVerifyingCode ? "Verify Code" : "Send Code"}
                />
            </form>
        </div>
    );
};

export default Login;
