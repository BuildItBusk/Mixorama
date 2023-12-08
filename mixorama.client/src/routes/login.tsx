import React from "react";
import { useAuth } from "../contexts/AuthContext";

export const LoginPage: React.FC = () => {
    const { login, logout, isAuthenticated } = useAuth() || {};

    const handleLogin = () => {
        // Call the login function here
        if (login) {
            login();
        }
    };

    const handleLogout = () =>
    {
        console.log("logout");
        if (logout)
        {
            logout();
        }
} 
        

    console.log("isAuthenticated", isAuthenticated);

    return (
        <div>
            <h2>Login Page</h2>
            {!isAuthenticated && <button onClick={handleLogin}>Login</button>}
            {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
};

export default LoginPage;
