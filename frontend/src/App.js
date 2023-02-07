// Packages
import React from "react";

// Pages
import Navbar from "./components/Navbar";
import TripsDashboard from "./pages/TripsDashboard";
import Login from "./pages/Login";

// The main React App component
const App = () => {
    return (
        <>
            <Navbar />
            {/* <TripsDashboard /> */}
            <Login />
        </>
    );
};

export default App;
