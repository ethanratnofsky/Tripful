// Packages
import React from "react";
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
    Outlet,
} from "react-router-dom";

// Pages
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import TripsDashboard from "./pages/TripsDashboard";
import CreateTrip from "./pages/CreateTrip";
import Profile from "./pages/Profile";

const Root = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

// Routes
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<TripsDashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="create-trip" element={<CreateTrip />} />
            <Route path="profile" element={<Profile />} />
        </Route>
    )
);

// The main React App component
const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
