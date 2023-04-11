// Make it so that like changes to grayed out or something when it is liked and other is diabled

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Idea from "../components/Idea";

import { useAuth } from "../contexts/AuthContext";

import "./Trip.css";

const Trip = () => {
    const { tripId } = useParams();

    const navigate = useNavigate();

    const [trip, setTrip] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [ideas, setIdeas] = useState([]); // TODO: replace with []

    const { currentUser } = useAuth();

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
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `${"http://127.0.0.1:5000"}/api/get-image/${trip.name}`
                );
                if (response.status === 200) {
                    const blob = await response.blob();
                    setImageUrl(URL.createObjectURL(blob));
                } else {
                    console.log("Image not found");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchImage();
        // TODO: Fetch ideas for this trip
    }, [trip]);

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

    const handleDeleteIdea = (ideaId) => {
        setIdeas((prev) => prev.filter((idea) => idea._id !== ideaId));
    };

    return (
        <div className="trip-container">
            <Link to=".." className="back-button">
                Back to Trips
            </Link>
            {trip && (
                <div className="trip-info">
                    <img src={imageUrl} />
                    <div className="trip-header">
                        <h1 className="trip-name">{trip.name}</h1>
                        <button
                            onClick={handleDelete}
                            className="delete-trip-button"
                        >
                            🗑️ Delete Trip
                        </button>
                    </div>
                    <p className="trip-start-date">
                        Start: {new Date(trip.start_date).toLocaleString()}
                    </p>
                    <p className="trip-end-date">
                        End: {new Date(trip.end_date).toLocaleString()}
                    </p>
                    <p className="trip-location">Location: {trip.location}</p>
                </div>
            )}
            <div className="idea-board-header">
                <h2>Idea Board</h2>
                <Link
                    to={`/create-idea/${tripId}`}
                    className="create-idea-button"
                >
                    + New Idea
                </Link>
            </div>
            {ideas && (
                <div className="ideas-board">
                    <ul className="ideas-list">
                        {ideas.length === 0 ? (
                            <p className="no-ideas-message">
                                There are no ideas for this trip yet. Get
                                creative!
                            </p>
                        ) : (
                            ideas.map((idea, index) => (
                                <Idea
                                    key={index}
                                    idea={idea}
                                    onDelete={() => handleDeleteIdea(idea._id)}
                                />
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Trip;
