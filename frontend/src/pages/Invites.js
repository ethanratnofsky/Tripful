import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Invites() {
    const { currentUser } = useAuth();
    const [trips, setTrips] = useState([]);

    const getTrips = () => {
        fetch(
            `http://127.0.0.1:5000/api/read-user-invites?user_id=${currentUser.uid}`
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => setTrips(data));
    };

    console.log(trips);

    // update trips when page first loads
    useEffect(() => {
        getTrips();
    }, []);

    const handleAccept = async (trip_id) => {
        try {
            await fetch("http://127.0.0.1:5000/api/update-accepted-invites", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    trip_id: trip_id,
                    user_id: currentUser.uid,
                }),
            });
        } catch (error) {
            alert("Error accepting invite. Please try again later.");
            console.log(error);
        }
    };

    return (
        <div>
            {trips.map((trip) => {
                return (
                    <form key={trip["_id"]}>
                        {trip["name"]}
                        <button onClick={() => handleAccept(trip["_id"])}>
                            Accept Trip
                        </button>
                        {/* <button
                        onClick={handleDecline}
                    >
                        Decline Trip
                    </button> */}
                    </form>
                );
            })}
        </div>
    );
}
