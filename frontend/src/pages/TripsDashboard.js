import React from "react";

import "./TripsDashboard.css";

import { handleCreateTrip } from "../utils/tripUtils";

const TripsDashboard = () => {
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
                <div className="create-trip-card" onClick={handleCreateTrip}>
                    +
                </div>
            </div>
        </div>
    );
};

export default TripsDashboard;
