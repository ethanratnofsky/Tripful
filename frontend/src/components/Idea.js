import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import "./Idea.css";

const Idea = ({ idea, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(idea.title);
    const [content, setContent] = useState(idea.content);
    const [newTitle, setNewTitle] = useState(idea.title);
    const [newContent, setNewContent] = useState(idea.content);
    const [upvotes, setUpvotes] = useState(idea.upvotes);
    const [downvotes, setDownvotes] = useState(idea.downvotes);
    // const [isLiked, setIsLiked] = useState(false);
    // const [isDisliked, setIsDisliked] = useState(false);

    const { currentUser } = useAuth();

    const handleNewTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleNewContentChange = (e) => {
        setNewContent(e.target.value);
    };

    const toggleEditMode = () => {
        setIsEditing((prev) => !prev);
    };

    // const toggleisLiked = () => {
    //     setIsLiked((prev) => !prev);
    // };

    // const toggleisDisliked = () => {
    //     setIsDisliked((prev) => !prev);
    // };

    useEffect(() => {
        if (!isEditing) {
            setNewTitle(title);
            setNewContent(content);
        }
    }, [isEditing]);

    const handleEdit = async () => {
        try {
            await fetch("http://127.0.0.1:5000/api/update-idea", {
                method: "PUT",
                body: JSON.stringify({
                    ...idea,
                    title: newTitle,
                    content: newContent,
                }),
                header: {
                    "Content-type": "application/json",
                },
            });

            setTitle(newTitle);
            setContent(newContent);

            alert("Idea updated!");
            toggleEditMode();
        } catch (error) {
            alert("Error editing idea. Please try again later.");
            console.log(error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this idea?")) {
            try {
                await fetch("http://127.0.0.1:5000/api/delete-idea", {
                    method: "DELETE",
                    body: JSON.stringify({
                        id: idea._id,
                    }),
                    header: {
                        "Content-type": "application/json",
                    },
                });

                onDelete(idea._id);

                alert("Idea deleted!");
            } catch (error) {
                alert("Error deleting idea. Please try again later.");
                console.log(error);
            }
        }
    };

    const handleUpvote = async () => {
        try {
            const res = await fetch(
                "http://127.0.0.1:5000/api/update-idea-upvotes",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: idea._id,
                        user_id: currentUser.uid,
                    }),
                }
            );
            // Get the updated idea from the response
            const updatedIdea = await res.json();
            setUpvotes(updatedIdea.upvotes);
            // toggleisLiked();
        } catch (error) {
            alert("Error liking idea. Please try again later.");
            console.log(error);
        }
    };

    const handleDownvote = async () => {
        try {
            const res = await fetch(
                "http://127.0.0.1:5000/api/update-idea-downvotes",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: idea._id,
                        user_id: currentUser.uid,
                    }),
                }
            );
            // Get the updated idea from the response
            const updatedIdea = await res.json();
            setDownvotes(updatedIdea.downvotes);
            // toggleisLiked();
        } catch (error) {
            alert("Error disliking idea. Please try again later.");
            console.log(error);
        }
    };

    return (
        <li className="idea-container">
            <div className="idea-header">
                {isEditing ? (
                    <input
                        type="text"
                        className="idea-title"
                        value={newTitle}
                        onChange={handleNewTitleChange}
                        placeholder="Title"
                    />
                ) : (
                    <h3 className="idea-title">{title}</h3>
                )}
                <p className="idea-date">
                    {new Date(idea.created_at).toLocaleString()}
                </p>
            </div>
            <p className="idea-author">by {idea.created_by}</p>
            {isEditing ? (
                <textarea
                    className="idea-content"
                    value={newContent}
                    onChange={handleNewContentChange}
                    placeholder="Content"
                />
            ) : (
                <p className="idea-content">{content}</p>
            )}
            <div className="actions-container">
                <div>
                    {isEditing ? (
                        <>
                            <label className="save">
                                <button onClick={handleEdit}>Save ✔️</button>
                            </label>
                            <label className="cancel">
                                <button
                                    onClick={toggleEditMode}
                                    className="delete-button"
                                >
                                    Cancel ❌
                                </button>
                            </label>
                        </>
                    ) : (
                        <>
                            <label className="edit">
                                <button onClick={toggleEditMode}>
                                    Edit ✏️
                                </button>
                            </label>
                            <label className="delete">
                                <button onClick={handleDelete}>
                                    Delete 🗑️
                                </button>
                            </label>
                        </>
                    )}
                </div>
                <div>
                    <label className="upvotes">
                        <button
                            disabled={downvotes?.includes(currentUser.uid)}
                            onClick={handleUpvote}
                        >
                            Upvote 👍
                        </button>
                        {upvotes.length}
                    </label>
                    <label className="downvotes">
                        <button
                            disabled={upvotes?.includes(currentUser.uid)}
                            onClick={handleDownvote}
                        >
                            Downvote 👎
                        </button>
                        {downvotes.length}
                    </label>
                </div>
            </div>
        </li>
    );
};

export default Idea;
