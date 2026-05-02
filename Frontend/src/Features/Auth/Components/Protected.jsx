import { useAuth } from "../Hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";
import './Protected.scss';

const Protected = ({children}) => {
    const { loading, user } = useAuth();
    if(loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Authenticating...</p>
            </div>
        )
    }

    if(!user) { 
        return <Navigate to="/login" />;
    }
        

    return children;
}

export default Protected
