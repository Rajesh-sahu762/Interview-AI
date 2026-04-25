import { createBrowserRouter } from "react-router-dom";
import Login from "./Features/Auth/Pages/Login.jsx";
import Register from "./Features/Auth/Pages/Register.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <div style={{color: 'white'}}>Welcome to Interview AI</div>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
]);