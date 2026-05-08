import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import React from "react";

type Props = {
    children: React.ReactNode;
    roles?: string[];
};

export const ProtectedRoute = ({
                                   children,
                                   roles: allowedRoles,
                               }: Props) => {
    const {
        isAuthenticated,
        roles: userRoles,
    } = useAuth();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (
        allowedRoles &&
        !allowedRoles.some((role) =>
            userRoles.includes(role)
        )
    ) {
        return (
            <Navigate
                to="/books"
                replace
            />
        );
    }

    return children;
};