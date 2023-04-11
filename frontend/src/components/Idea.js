import React, { useState } from "react";

import "./Idea.css";

const Idea = ({ idea }) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditMode = () => {
        setIsEditing((prev) => !prev);
    };

    const handleEdit = () => {
        // TODO: edit idea
    };

    const handleDelete = () => {
        // TODO: delete idea
    };

    const handleUpvote = () => {
        // TODO: add my user id to the upvotes array
    };

    const handleDownvote = () => {
        // TODO: add my user id to the downvotes array
    };

    return (
        <li className="idea-container">
            <div className="idea-header">
                <h3 className="idea-title">{idea.title}</h3>
                <p className="idea-date">
                    {new Date(idea.created_at).toLocaleString()}
                </p>
            </div>
            <p className="idea-author">by {idea.created_by}</p>
            <p className="idea-content">{idea.content}</p>
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
                        <button onClick={handleUpvote}>Upvote 👍</button>
                        {idea.upvotes.length}
                    </label>
                    <label className="downvotes">
                        <button onClick={handleDownvote}>Downvote 👎</button>
                        {idea.downvotes.length}
                    </label>
                </div>
            </div>
        </li>
    );
};

export default Idea;