import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./TripsDashboard.css";

const TripsDashboard = () => {
    const [trips, setTrips] = useState([])

    function getLatestTrips() {
        fetch('http://127.0.0.1:5000/api/read-trips').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setTrips(data))
    }

    // update trips when page first loads
    useEffect(() => getLatestTrips(), [])

    const handleFilterUpcoming = () => {
        alert("TODO: Filtering upcoming trips...");
    };

    const handleFilterPast = () => {
        alert("TODO: Filtering past trips...");
    };

    return (
        <div className="trips-dashboard-container">
            <h1 className="greeting">Welcome Back!</h1>
            <div className="filters-container">
                <button onClick={handleFilterUpcoming}>Upcoming Trips</button>
                <button onClick={handleFilterPast}>Past Trips</button>
            </div>
            <div className="trips-container">
                <Link to="/create-trip" className="create-trip-card">
                    +
                </Link>

                {/* render trips */}
                {trips.map((trip) => {
                    return (
                        <h1 key={trip["_id"]}>{trip["location"]}</h1>
                    )
                })}
                {trips.map((trip) => (
                    <span
                        onClick={() => setDisplayedTrip(trip)}
                        className="trip-card"
                        key={trip["_id"]}
                    >
                        <h2>{trip["name"]}</h2>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TripsDashboard;
