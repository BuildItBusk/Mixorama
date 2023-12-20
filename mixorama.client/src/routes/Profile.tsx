import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
    const { login, logout, isAuthenticated } = useAuth() || {};
    
    const handleLogin = () => {
        if (login) {
            login();
        }
    };
    
    const handleLogout = () => {
        if (logout) {
            logout();
        }
    }

    var profile = null;

    const getProfile = async () => {
        const response = await fetch("/auth/profile");
        const json = await response.json();
        console.log("json", json);
        profile = json;
    }

    getProfile();
    console.log("profile", profile);
    
    return (
        <>
            <h2>Profile Page</h2>
            {!isAuthenticated && <button onClick={handleLogin}>Login</button>}
            {isAuthenticated && <div>You are logged in</div>}
            {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </>
    );
}

export default Profile;