// Packages
import React from "react";

// Pages
import Navbar from "./components/Navbar";
import TripsDashboard from "./pages/TripsDashboard";

// The main React App component
const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            <TripsDashboard />
        </div>
    );
};

export default App;
