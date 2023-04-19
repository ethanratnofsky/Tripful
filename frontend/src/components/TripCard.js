import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./TripCard.css";

const TripCard = ({ trip }) => {
    const [imageUrl, setImageUrl] = useState([]);
    const [imageExists, setImageExists] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `${"http://127.0.0.1:5000"}/api/get-image/${trip.name}`
                );
                if (response.status === 200) {
                    setImageExists(true);
                    const blob = await response.blob();
                    setImageUrl(URL.createObjectURL(blob));
                } else {
                    setImageExists(false);
                    console.log("Image not found");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchImage();
    }, []);

    return (
        <>
            {imageExists ? (
                <Link
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                    to={`/trip/${trip._id}`}
                    className="trip-card"
                    key={trip._id}
                >
                    <h2>{trip["name"]}</h2>
                </Link>
            ) : (
                <Link
                    to={`/trip/${trip._id}`}
                    className="trip-card"
                    key={trip._id}
                >
                    <h2>{trip["name"]}</h2>
                </Link>
            )}
        </>
    );
};

export default TripCard;
