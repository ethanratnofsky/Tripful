// Make it so that like changes to grayed out or something when it is liked and other is diabled

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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

    const handleUpvote = async (ideaId) => {
        const res = await fetch(
            "http://127.0.0.1:5000/api/update-idea-upvotes",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: ideaId,
                    user_id: currentUser.uid,
                }),
            }
        );

        // Get the updated idea from the response
        const updatedIdea = await res.json();

        let temp = [];
        ideas.map((idea) => {
            if (idea._id === updatedIdea._id) {
                let newUpvotes = updatedIdea.upvotes;
                idea.upvotes = newUpvotes;
                temp.push(idea);
            } else {
                temp.push(idea);
            }
        });
        temp.sort((a, b) => b.upvotes - a.upvotes);

        // Map over the ideas array and update the upvotes for the idea that was just upvoted
        setIdeas(temp);
    };

    const handleDownvote = async (ideaId) => {
        const res = await fetch(
            "http://127.0.0.1:5000/api/update-idea-downvotes",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: ideaId, user_id: currentUser.uid }),
            }
        );
        // Get the updated idea from the response
        const updatedIdea = await res.json();

        let temp = [];
        ideas.map((idea) => {
            if (idea._id === updatedIdea._id) {
                let newDownvotes = updatedIdea.downvotes;
                idea.downvotes = newDownvotes;
                temp.push(idea);
            } else {
                temp.push(idea);
            }
        });
        temp.sort((a, b) => b.upvotes - a.upvotes);

        // Map over the ideas array and update the upvotes for the idea that was just upvoted
        setIdeas(temp);
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
                    <img src={imageUrl} />
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
                                            onClick={() => {
                                                handleUpvote(idea._id);
                                            }}
                                        >
                                            👍
                                        </button>
                                        {idea.upvotes}
                                    </label>
                                    <label className="downvotes">
                                        <button
                                            onClick={() =>
                                                handleDownvote(idea._id)
                                            }
                                        >
                                            👎
                                        </button>
                                        {idea.downvotes}
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
