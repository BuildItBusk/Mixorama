import React from "react";
import { useAuth } from "../contexts/AuthContext";

export const LoginPage: React.FC = () => {
    const { login, isAuthenticated } = useAuth() || {};

    const handleLogin = () => {
        // Call the login function here
        if (login) {
            login();
        }
    };

    console.log("isAuthenticated", isAuthenticated);

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>Login</button>
            {isAuthenticated && <div>Logged in!</div>}
        </div>
    );
};

export default LoginPage;
