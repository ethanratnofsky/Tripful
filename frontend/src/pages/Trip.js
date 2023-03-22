import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Trip.css";

const TEST_IDEAS = [
    {
        _id: 1,
        title: "Test Idea 1",
        content: "This is a test idea",
        author: "Test Author 1",
        createdAt: "2021-03-01T00:00:00.000Z",
        upvotes: [],
        downvotes: [],
    },
];

const Trip = () => {
    const { tripId } = useParams();

    const [trip, setTrip] = useState();
    const [ideas, setIdeas] = useState(TEST_IDEAS); // TODO: replace with []

    const fetchTrip = async (tripId) => {
        // TODO: use endpoint to fetch with tripId
        // const response = await fetch(
        //     `${"http://localhost:5000"}/api/read-trip?trip_id=${tripId}`
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

    const handleUpvote = () => {
        // TODO: add my user id to the upvotes array
    };

    const handleDownvote = () => {
        // TODO: add my user id to the downvotes array
    };

    return (
        <div className="trip-container">
            <Link to=".." className="back-button">
                Back to Trips
            </Link>
            {trip && (
                <div className="trip-info">
                    <h1 className="trip-name">{trip.name}</h1>
                    <p className="trip-start-date">
                        Start: {new Date(trip.start_date).toLocaleString()}
                    </p>
                    <p className="trip-end-date">
                        End: {new Date(trip.end_date).toLocaleString()}
                    </p>
                    <p className="trip-location">Location: {trip.location}</p>
                </div>
            )}
            <h2>Idea Board</h2>
            {ideas && (
                <div className="ideas-board">
                    <ul>
                        {ideas.map((idea, index) => (
                            <li key={index}>
                                <div className="idea">
                                    <h3 className="idea-title">{idea.title}</h3>
                                    <p className="idea-author">
                                        by {idea.author}
                                    </p>
                                    <p className="idea-content">
                                        {idea.content}
                                    </p>
                                    <p className="idea-date">
                                        {new Date(
                                            idea.createdAt
                                        ).toLocaleString()}
                                    </p>
                                    <div className="vote-container">
                                        <label>Upvotes</label>
                                        <button onClick={handleUpvote}>
                                            {idea.upvotes.length}
                                        </button>
                                        <label>Downvotes</label>
                                        <button onClick={handleDownvote}>
                                            {idea.downvotes.length}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Trip;
