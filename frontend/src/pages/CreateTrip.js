import React from "react";
import "./CreateTrip.css";
import TestImg from "../assets/test.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
    const [trip_name, setName] = useState("");
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [emails, setEmails] = useState([]);
    const [tripImage, setTripImage] = useState("");

    const navigate = useNavigate();

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
                navigate("/");
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

    const handleFileChange = (e) => {
        e.preventDefault();
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
    };

    return (
        <div className="trip-form-container">
            <form className="trip-info" onSubmit={handleSubmit}>
                <label htmlFor="trip-name">Trip name:</label>
                <br />
                <input
                    type="text"
                    id="trip-name"
                    placeholder="Untitled Trip"
                    value={trip_name}
                    onInput={(e) => setName(e.target.value)}
                ></input>
                <br />
                <label htmlFor="start-date">Start date:</label>
                <br></br>
                <input
                    type="datetime-local"
                    id="start-date"
                    value={start_date}
                    onInput={(e) => setStartDate(e.target.value)}
                ></input>
                <br />
                <label htmlFor="end-date">End date:</label>
                <br></br>
                <input
                    type="datetime-local"
                    id="end-date"
                    value={end_date}
                    onInput={(e) => setEndDate(e.target.value)}
                ></input>
                <br />
                <label htmlFor="location">Location:</label>
                <br></br>
                <input
                    type="text"
                    id="location"
                    placeholder="Location"
                    value={location}
                    onInput={(e) => setLocation(e.target.value)}
                ></input>
                <br></br>
                {/* <label htmlFor="invite">Invite:</label>
                <br></br>
                <input
                    type="email"
                    id="invite"
                    placeholder="Email(s)"
                    value={emails}
                    onInput={(e) => setEmails(e.target.value)}
                ></input> */}

                <br></br>
                <label htmlFor="submit">Submit</label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
            <div>
                {tripImage ? (
                    <img
                        className="trip-picture"
                        src={tripImage}
                        alt="Trip Picture"
                    />
                ) : (
                    <img
                        className="trip-picture"
                        src={TestImg}
                        alt="Trip Picture"
                    />
                )}
                <br></br>
                <input type="file" onChange={handleFileChange} />
                <br></br>
                <button onClick={handleFileUpload}>Upload image</button>
            </div>
        </div>
    );
};

export default CreateTrip;
