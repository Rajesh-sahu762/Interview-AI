import { useContext, useState } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../Services/auth.api.js";

export function useAuth() {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;
    const [error, setError] = useState(null);

    const handleLogin = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await login({ email, password });
            setUser(data.user);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await logout();
            setUser(null);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Logout failed';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }

    const handleGetMe = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMe();
            setUser(data.user);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Fetch user failed';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }

    return { user, setUser, loading, setLoading, error, handleLogin, handleRegister, handleLogout, handleGetMe };
}