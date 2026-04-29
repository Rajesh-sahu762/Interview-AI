import { createBrowserRouter } from "react-router-dom";
import Login from "./Features/Auth/Pages/Login.jsx";
import Register from "./Features/Auth/Pages/Register.jsx";
import Protected from "./Features/Auth/Components/Protected.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Protected><h1>Home Page</h1></Protected>
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