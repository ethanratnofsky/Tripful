import React, { useEffect } from "react";
import "./CreateTrip.css";
import TestImg from "../assets/test.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CreateTrip = () => {
    const [trip_name, setName] = useState("");
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [invites, setInvites] = useState([]);
    const [image, setImage] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [names, setNames] = useState([]);

    console.log(invites.map((invite) => {return invite["_id"]}));

    const getNames = () => {
        fetch("http://127.0.0.1:5000/api/read-users")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => setNames(data.filter((i)=>(i["_id"] !== currentUser.uid))));
    };

    // update names when page first loads
    useEffect(() => {
        getNames();
    }, []);

    const navigate = useNavigate();

    const { currentUser } = useAuth();

    const handleImageUpload = (e) => {
        // setImage(event.target.files[0]);
        // console.log(image);
        setImage(e.target.files[0]);
    };

    const handleImageSubmit = async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("trip_name", trip_name);

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/api/upload-image",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            // setImageUrl(URL.createObjectURL(`/get-image/${trip_name}`));
            setImageUrl(URL.createObjectURL(image));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:5000/api/create-trip", {
            method: "POST",
            body: JSON.stringify({
                user_id: currentUser.uid,
                name: trip_name,
                start_date: start_date.toString(),
                end_date: end_date.toString(),
                location: location,
                invites: invites.map((invite) => {return invite["_id"]}),
            }),
            header: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => {
                response.json();
                navigate("/");
            })
            .then((message) => {
                console.log(message);
                setName("");
                setStartDate(new Date());
                setEndDate(new Date());
                setLocation("");
                setInvites([]);
            });
    };

    return (
        <div className="trip-form-container">
            <form className="trip-info" onSubmit={handleSubmit}>
                <label htmlFor="trip-name">Trip name:</label>
                <br />
                <input
                    type="text"
                    id="trip-name"
                    placeholder="Untitled Trip"
                    value={trip_name}
                    onInput={(e) => setName(e.target.value)}
                ></input>
                <br />
                <label htmlFor="start-date">Start date:</label>
                <br></br>
                <input
                    type="datetime-local"
                    id="start-date"
                    value={start_date}
                    onInput={(e) => setStartDate(e.target.value)}
                ></input>
                <br />
                <label htmlFor="end-date">End date:</label>
                <br></br>
                <input
                    type="datetime-local"
                    id="end-date"
                    value={end_date}
                    onInput={(e) => setEndDate(e.target.value)}
                ></input>
                <br />
                <label htmlFor="location">Location:</label>
                <br></br>
                <input
                    type="text"
                    id="location"
                    placeholder="Location"
                    value={location}
                    onInput={(e) => setLocation(e.target.value)}
                ></input>
                <br></br>
                <label htmlFor="invite">Invite:</label>
                <br></br>
                <Autocomplete
                    style={{width: '320px'}}
                    multiple
                    id="invite"
                    value={invites}
                    onChange={(e, newValue) => {setInvites(newValue)}}
                    options={names}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Names"
                        />
                    )}
                />
                {/* <input
                    type="email"
                    id="invite"
                    placeholder="Email(s)"
                    value={emails}
                    onInput={(e) => setEmails(e.target.value)}
                ></input> */}

                <br></br>
                <label htmlFor="submit">Submit</label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
            <br></br>
            <div>
                <input type="file" onChange={handleImageUpload} />
                <button onClick={handleImageSubmit}>Upload Image</button>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Uploaded image"
                        width="300"
                        height="200"
                    />
                )}
            </div>
        </div>
    );
};

export default CreateTrip;
