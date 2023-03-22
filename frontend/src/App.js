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
import Trip from "./pages/Trip";

import ProtectedRoutes from "./utils/ProtectedRoutes";

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
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
                <Route index exact element={<TripsDashboard />} />
                <Route path="create-trip" element={<CreateTrip />} />
                <Route path="profile" element={<Profile />} />
                <Route path="trip/:tripId" element={<Trip />} />
            </Route>
        </Route>
    )
);

// The main React App component
const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
