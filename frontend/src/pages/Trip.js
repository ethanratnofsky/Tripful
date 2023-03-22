import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./Trip.css";

const Trip = () => {
    const { tripId } = useParams();

    const navigate = useNavigate();

    const [trip, setTrip] = useState();
    const [ideas, setIdeas] = useState([]); // TODO: replace with []

    const fetchTrip = async (tripId) => {
        // TODO: use endpoint to fetch with tripId
        const response = await fetch(
            `${"http://127.0.0.1:5000"}/api/read-trip?trip_id=${tripId}`
        );
        const data = await response.json();
        setTrip(data);
    };

    const fetchIdeas = async (tripId) => {
        const newResponse = await fetch(
            `${"http://127.0.0.1:5000"}/api/read-trip-ideas?trip_id=${tripId}`
        );
        const ideaData = await newResponse.json();
        setIdeas(ideaData);
    };

    useEffect(() => {
        fetchTrip(tripId);
    }, []);

    useEffect(() => {
        if (!trip) return;
        fetchIdeas(tripId);
        // TODO: Fetch ideas for this trip
    }, [trip]);

    const handleUpvote = (ideaId) => {
        // TODO: add my user id to the upvotes array
    };

    const handleDownvote = (ideaId) => {
        // TODO: add my user id to the downvotes array
    };

    const handleDelete = () => {
        fetch("http://127.0.0.1:5000/api/delete-trip", {
            method: "DELETE",
            body: JSON.stringify({
                id: tripId,
            }),
            header: {
                "Content-type": "application/json",
            },
        });
        navigate(-1);
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
                    <button onClick={handleDelete}>Delete Trip</button>
                </div>
            )}
            <h2>Idea Board</h2>
            <Link to={`/create-idea/${tripId}`}>Create New Idea</Link>
            {ideas && (
                <div className="ideas-board">
                    <ul className="ideas-list">
                        {ideas.map((idea, index) => (
                            <li key={index} className="idea-container">
                                <div className="idea-header">
                                    <h3 className="idea-title">{idea.title}</h3>
                                    <p className="idea-date">
                                        {new Date(
                                            idea.created_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <p className="idea-author">
                                    by {idea.created_by}
                                </p>
                                <p className="idea-content">{idea.content}</p>
                                <div className="vote-container">
                                    <label className="upvotes">
                                        <button
                                            onClick={() =>
                                                handleUpvote(idea._id)
                                            }
                                        >
                                            👍
                                        </button>
                                        {idea.upvotes.length}
                                    </label>
                                    <label className="downvotes">
                                        <button
                                            onClick={() =>
                                                handleDownvote(idea._id)
                                            }
                                        >
                                            👎
                                        </button>
                                        {idea.downvotes.length}
                                    </label>
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
