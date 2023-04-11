import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Idea from "../components/Idea";

import "./Trip.css";

const Trip = () => {
    const { tripId } = useParams();

    const navigate = useNavigate();

    const [trip, setTrip] = useState();
    const [newName, setNewName] = useState();
    const [newStartDate, setNewStartDate] = useState();
    const [newEndDate, setNewEndDate] = useState();
    const [newLocation, setNewLocation] = useState();

    const [ideas, setIdeas] = useState([]); // TODO: replace with []
    const [isEditing, setIsEditing] = useState(false);

    const handleNewNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNewStartDateChange = (e) => {
        setNewStartDate(e.target.value);
    };

    const handleNewEndDateChange = (e) => {
        setNewEndDate(e.target.value);
    };

    const handleNewLocationChange = (e) => {
        setNewLocation(e.target.value);
    };

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
    }, [trip]);

    useEffect(() => {
        if (!isEditing && trip) {
            setNewName(trip.name);
            setNewStartDate(trip.start_date);
            setNewEndDate(trip.end_date);
            setNewLocation(trip.location);
        }
    }, [isEditing, trip]);

    const toggleEditMode = () => {
        setIsEditing((prev) => !prev);
    };

    const handleEdit = async () => {
        try {
            await fetch("http://127.0.0.1:5000/api/update-trip", {
                method: "PUT",
                body: JSON.stringify({
                    ...trip,
                    name: newName,
                    start_date: newStartDate,
                    end_date: newEndDate,
                    location: newLocation,
                }),
                header: {
                    "Content-type": "application/json",
                },
            });

            setTrip((prev) => ({
                ...prev,
                name: newName,
                start_date: newStartDate,
                end_date: newEndDate,
                location: newLocation,
            }));

            alert("Trip updated!");
            toggleEditMode();
        } catch (error) {
            alert("Error editing trip. Please try again later.");
            console.log(error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this trip?")) {
            try {
                await fetch("http://127.0.0.1:5000/api/delete-trip", {
                    method: "DELETE",
                    body: JSON.stringify({
                        id: tripId,
                    }),
                    header: {
                        "Content-type": "application/json",
                    },
                });

                alert("Trip deleted!");

                navigate(-1);
            } catch (error) {
                alert("Error deleting trip. Please try again later.");
                console.log(error);
            }
        }
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
                    <div className="trip-header">
                        {isEditing ? (
                            <input
                                type="text"
                                className="trip-name"
                                value={newName}
                                onChange={handleNewNameChange}
                            />
                        ) : (
                            <h1 className="trip-name">{trip.name}</h1>
                        )}
                        <div>
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleEdit}
                                        className="save-trip-button"
                                    >
                                        ✔️ Save Trip
                                    </button>
                                    <button
                                        onClick={toggleEditMode}
                                        className="cancel-trip-button"
                                    >
                                        ❌ Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={toggleEditMode}
                                        className="edit-trip-button"
                                    >
                                        ✏️ Edit Trip
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="delete-trip-button"
                                    >
                                        🗑️ Delete Trip
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <p className="trip-start-date">
                        Start:{" "}
                        {isEditing ? (
                            <input
                                type="datetime-local"
                                className="trip-start-date"
                                value={newStartDate}
                                onInput={handleNewStartDateChange}
                            />
                        ) : (
                            new Date(trip.start_date).toLocaleString()
                        )}
                    </p>
                    <p className="trip-end-date">
                        End:{" "}
                        {isEditing ? (
                            <input
                                type="datetime-local"
                                className="trip-end-date"
                                value={newEndDate}
                                onInput={handleNewEndDateChange}
                            />
                        ) : (
                            new Date(trip.end_date).toLocaleString()
                        )}
                    </p>
                    <p className="trip-location">
                        Location:{" "}
                        {isEditing ? (
                            <input
                                type="text"
                                className="trip-location"
                                value={newLocation}
                                onChange={handleNewLocationChange}
                            />
                        ) : (
                            trip.location
                        )}
                    </p>
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
