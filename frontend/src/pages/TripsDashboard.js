import React from "react";
import { Link } from "react-router-dom";

import "./TripsDashboard.css";

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
                <Link to="/create-trip" className="create-trip-card">
                    +
                </Link>
            </div>
        </div>
    );
};

export default TripsDashboard;
