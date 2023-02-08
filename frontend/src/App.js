// Packages
import React from "react";

// Pages
import Navbar from "./components/Navbar";
import TripsDashboard from "./pages/TripsDashboard";
import Profile from "./pages/Profile";
import CreateTrip from "./pages/CreateTrip";

// The main React App component
const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            <TripsDashboard />
            <Profile />
            <CreateTrip />
        </div>
    );
};

export default App;
