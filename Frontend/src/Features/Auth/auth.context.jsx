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
            
            const data = await getMe();
            setUser(data.user);
            }catch (error) {} finally {

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