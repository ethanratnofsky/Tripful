import React from "react";

import "./CreateTrip.css";
import TestImg from "../assets/test.png";

const CreateTrip = () => {
    return (
        <div className="trip-form-container">
            <form className="trip-info">
                <label for="trip-name">Trip name:</label>
                <br />
                <input
                    type="text"
                    id="trip-name"
                    placeholder="Untitled Trip"
                ></input>
                <br />
                <label for="start-date">Start date:</label>
                <br></br>
                <input type="datetime-local" id="start-date"></input>
                <br />
                <label for="end-date">End date:</label>
                <br></br>
                <input type="datetime-local" id="end-date"></input>
                <br />
                <label for="location">Location:</label>
                <br></br>
                <input type="text" id="location" placeholder="Location"></input>
                <br></br>
                <label for="invite">Invite:</label>
                <br></br>
                <input type="email" id="invite" placeholder="Email(s)"></input>
                <br></br>
            </form>
            <img className="trip-picture" src={TestImg} alt="Trip Picture" />
        </div>
    );
};

export default CreateTrip;
