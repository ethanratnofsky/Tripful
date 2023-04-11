import React, { useEffect, useState } from "react";

import "./Idea.css";

const Idea = ({ idea, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(idea.title);
    const [content, setContent] = useState(idea.content);
    const [newTitle, setNewTitle] = useState(idea.title);
    const [newContent, setNewContent] = useState(idea.content);

    const handleNewTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleNewContentChange = (e) => {
        setNewContent(e.target.value);
    };

    const toggleEditMode = () => {
        setIsEditing((prev) => !prev);
    };

    useEffect(() => {
        if (!isEditing) {
            setNewTitle(title);
            setNewContent(content);
        }
    }, [isEditing]);

    const handleEdit = async () => {
        try {
            // FIXME: 500 error
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

    const handleUpvote = () => {
        // TODO: add my user id to the upvotes array
    };

    const handleDownvote = () => {
        // TODO: add my user id to the downvotes array
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
