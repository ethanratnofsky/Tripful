// Packages
import React from "react";

// Pages
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import TripsDashboard from "./pages/TripsDashboard";
import CreateTrip from "./pages/CreateTrip";
import Profile from "./pages/Profile";

// The main React App component
const App = () => {
    return (
        <>
            <Navbar />
            {/* <Login /> */}
            <TripsDashboard />
            {/* <CreateTrip /> */}
            {/* <Profile /> */}
        </>
    );
};

export default App;
