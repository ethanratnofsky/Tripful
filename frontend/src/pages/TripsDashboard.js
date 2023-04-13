import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "./TripsDashboard.css";

const TripsDashboard = () => {
    const { currentUser } = useAuth();
    const [trips, setTrips] = useState([]);
    const [displayedTrips, setDisplayedTrips] = useState([]);
    const [displayedTrip, setDisplayedTrip] = useState(null);

    const [filter, setFilter] = useState("all");

    const getTrips = () => {
        fetch(`http://127.0.0.1:5000/api/read-accepted-user-trips?user_id=${currentUser.uid}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => setTrips(data));
    };

    // update trips when page first loads
    useEffect(() => {
        getTrips();
    }, []);

    useEffect(() => {
        setDisplayedTrips(trips);
        setFilter("all");
    }, [trips]);

    useEffect(() => {
        switch (filter) {
            case "all":
                setDisplayedTrips(trips);
                break;
            case "upcoming":
                setDisplayedTrips(
                    trips.filter((trip) => {
                        const today = new Date();
                        const tripDate = new Date(trip.start_date);
                        return tripDate >= today;
                    })
                );
                break;
            case "past":
                setDisplayedTrips(
                    trips.filter((trip) => {
                        const today = new Date();
                        const tripDate = new Date(trip.start_date);
                        return tripDate < today;
                    })
                );
                break;
            default:
                console.error("ERROR: Invalid filter");
        }
    }, [filter]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div className="trips-dashboard-container">
            <h1 className="greeting">Welcome Back!</h1>
            <div className="filters-container">
                <label>
                    Filter:{" "}
                    <select onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                    </select>
                </label>
            </div>
            <div className="trips-container">
                <Link to="/create-trip" className="trip-card">
                    +
                </Link>

                {/* render trips */}
                {displayedTrips.map((trip) => (
                    <Link
                        to={`/trip/${trip._id}`}
                        className="trip-card"
                        key={trip._id}
                    >
                        <h2>{trip["name"]}</h2>
                    </Link>
                ))}
            </div>
            {displayedTrip !== null && (
                <>
                    <div className="overlay" />
                    <div className="trip-details-container">
                        <h2>Name: {displayedTrip.name}</h2>
                        <p>
                            Start:{" "}
                            {new Date(
                                displayedTrip.start_date
                            ).toLocaleString()}
                        </p>
                        <p>
                            End:{" "}
                            {new Date(displayedTrip.end_date).toLocaleString()}
                        </p>
                        <p>Location: {displayedTrip.location}</p>
                        <Link to="/idea-board">Go to Idea Board</Link>
                        <br></br>
                        <button onClick={() => setDisplayedTrip(null)}>
                            Back
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TripsDashboard;
