import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,register,logout, getMe } from "../Services/auth.api.js";

export function useAuth() {
    
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async (email, password ) => {
        setLoading(true);
        const data = await login({ email, password });
        setUser(data.user);
        setLoading(false);
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        const data = await register({ username, email, password });
        setUser(data.user);
        setLoading(false);
    }

    const handleLogout = async () => {
        setLoading(true);
        const data = await logout();
        setUser(null);
        setLoading(false);
    }

    const handleGetMe = async () => {
        setLoading(true);
        const data = await getMe();
        setUser(data.user);
        setLoading(false);
    }

    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout, handleGetMe };
}