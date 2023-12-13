import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
    const { login, user, isAuthenticated } = useAuth() || {};
    
    const handleLogin = () => {
        if (login) {
            login();
        }
    };

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
        </>
    );
}

export default Profile;