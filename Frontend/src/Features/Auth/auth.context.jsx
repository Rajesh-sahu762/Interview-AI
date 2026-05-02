import { createContext, useState } from "react";
import { getMe } from "./Services/auth.api";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                // 5 second timeout for API call
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('API timeout')), 5000)
                );
                const data = await Promise.race([getMe(), timeoutPromise]);
                setUser(data.user);
            } catch (error) {
                console.error('Auth check failed:', error);
                // Even if auth fails, allow user to access app
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        getAndSetUser();
    }, []);

    return (<AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}