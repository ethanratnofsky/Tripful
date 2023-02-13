import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { auth } from "../../firebase.config";

const ProtectedRoutes = () => {
    if (!auth.currentUser) {
        console.log("User is not logged in. Redirecting...");
        return <Navigate to="/login" replace={true} />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
