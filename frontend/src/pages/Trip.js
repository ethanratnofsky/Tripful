import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Trip.css";

const Trip = () => {
    const { tripId } = useParams();

    const [trip, setTrip] = useState();
    const [ideas, setIdeas] = useState([]);

    const fetchTrip = async (tripId) => {
        // TODO: use endpoint to fetch with tripId
        // const response = await fetch(
        //     `${"http://localhost:5000/"}/api/read-trip?trip_id=${tripId}`
        // );
        // const data = await response.json();
        // setTrip(data);

        // TODO: remove below
        const response = await fetch(
            `${"http://127.0.0.1:5000"}/api/read-trips`
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setTrip(data[0]);
        } else {
            console.error("ERROR: Failed to fetch trip");
        }
    };

    useEffect(() => {
        fetchTrip(tripId);
    }, []);

    useEffect(() => {
        if (!trip) return;

        // TODO: Fetch ideas for this trip
    }, [trip]);

    return (
        <div className="trip-container">
            <Link to="..">Back to Trips</Link>
            {trip && (
                <div className="trip-info">
                    <h1>{trip.name}</h1>
                    <p>Start: {new Date(trip.start_date).toLocaleString()}</p>
                    <p>End: {new Date(trip.end_date).toLocaleString()}</p>
                    <p>Location: {trip.location}</p>
                </div>
            )}
        </div>
    );
};

export default Trip;
