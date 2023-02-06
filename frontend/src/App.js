// Packages
import React from "react";

// Pages
import Navbar from "./components/Navbar";
import TripsDashboard from "./pages/TripsDashboard";
import Profile from "./pages/Profile";

// The main React App component
const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            <TripsDashboard />
            {/* <Profile /> */}
        </div>
    );
};

export default App;
