import { useState, useEffect, useContext, createContext, FC } from "react";

export interface ClaimProps {
    type: string,
    value: string
}

export interface AuthContextProps {
    isAuthenticated: boolean,
    permissions: Array<ClaimProps>,
    isLoading: boolean,
    login: () => void,
    logout: () => void
}

interface ChildProps {
    children: React.ReactNode;
     }

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<ChildProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    
    const getUser = async () => {
        console.log("Getting user...");
        const response = await fetch('/auth/user');
        const json = await response.json();

        setIsAuthenticated(json.isAuthenticated);
        setIsLoading(false);
        if (json.isAuthenticated) setPermissions(json.claims);
    }

    useEffect(() => {
        getUser();
    }, []);

    const login = () => {
        window.location.href = '/auth/login';
    }

    const logout = () => {
        window.location.href = '/auth/logout';
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                permissions,
                isLoading,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );
};