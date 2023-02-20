import React from "react";
import { ReactMultiEmail, isEmail } from "react-multi-email";

import "./CreateTrip.css";
import TestImg from "../assets/test.png";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const CreateTrip = () => {
    const [trip_name, setName] = useState("");
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [emails, setEmails] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:5000/api/create-trip", {
            method: "POST",
            body: JSON.stringify({
                name: trip_name,
                start_date: start_date.toString(),
                end_date: end_date.toString(),
                location: location,
                // emails: emails,
            }),
            header: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => {
                response.json();
            })
            .then((message) => {
                console.log(message);
                setName("");
                setStartDate(new Date());
                setEndDate(new Date());
                setLocation("");
                setEmails([]);
            });
    };

    return (
        <div className="trip-form-container">
            <form className="trip-info" onSubmit={handleSubmit}>
                <label for="trip-name">Trip name:</label>
                <br />
                <input
                    type="text"
                    id="trip-name"
                    placeholder="Untitled Trip"
                    value={trip_name}
                    onInput={(e) => setName(e.target.value)}
                ></input>
                <br />
                <label for="start-date">Start date:</label>
                <br></br>
                <input
                    type="datetime-local"
                    id="start-date"
                    value={start_date}
                    onInput={(e) => setStartDate(e.target.value)}
                ></input>
                <br />
                <label for="end-date">End date:</label>
                <br></br>
                <input
                    type="datetime-local"
                    id="end-date"
                    value={end_date}
                    onInput={(e) => setEndDate(e.target.value)}
                ></input>
                <br />
                <label for="location">Location:</label>
                <br></br>
                <input
                    type="text"
                    id="location"
                    placeholder="Location"
                    value={location}
                    onInput={(e) => setLocation(e.target.value)}
                ></input>
                <br></br>
                {/* <label for="invite">Invite:</label>
                <br></br>
                <input
                    type="email"
                    id="invite"
                    placeholder="Email(s)"
                    value={emails}
                    onInput={(e) => setEmails(e.target.value)}
                ></input> */}
                <br></br>
                <label for="submit">Submit</label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
            <img className="trip-picture" src={TestImg} alt="Trip Picture" />
        </div>
    );
};

export default CreateTrip;
