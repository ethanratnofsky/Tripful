import React from "react";
import "./CreateTrip.css";
import TestImg from "../assets/test.png";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CreateIdea = () => {
    const [ideaName, setName] = useState("");
    const [user, setUser] = useState();
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const { tripId } = useParams();

    const fetchUser = async (userId) => {
        const response = await fetch(
            `${"http://127.0.0.1:5000"}/api/read-user?user_id=${userId}`
        );
        const data = await response.json();
        setUser(data);
        console.log(data);
    };

    useEffect(() => {
        console.log(currentUser.uid);
        fetchUser(currentUser.uid);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:5000/api/create-idea", {
            method: "POST",
            body: JSON.stringify({
                createdBy: user.name,
                title: ideaName,
                associatedTrip: tripId,
                content: content,
            }),
            header: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => {
                response.json();
                navigate(`/trip/${tripId}`);
            })
            .then((message) => {
                console.log(message);
                setName("");
                setContent("");
            });
    };

    return (
        <div className="trip-form-container">
            <form className="trip-info" onSubmit={handleSubmit}>
                <label htmlFor="idea-name">Idea name:</label>
                <br />
                <input
                    type="text"
                    id="idea-name"
                    placeholder="Untitled Idea"
                    value={ideaName}
                    onInput={(e) => setName(e.target.value)}
                ></input>
                <br />
                <label htmlFor="content">Content:</label>
                <br></br>
                <input
                    type="text"
                    id="Content"
                    placeholder="Content"
                    value={content}
                    onInput={(e) => setContent(e.target.value)}
                ></input>
                <br></br>
                <br></br>
                <label htmlFor="submit">Submit</label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreateIdea;
