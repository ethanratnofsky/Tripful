// Packages
import React from "react";

// Pages
import Navbar from "./components/Navbar";
import TripsDashboard from "./pages/TripsDashboard";
import CreateTrip from "./pages/CreateTrip";

// The main React App component
const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            {/* <TripsDashboard /> */}
            <CreateTrip />
        </div>
    );
};

export default App;
