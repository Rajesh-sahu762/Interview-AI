import { createBrowserRouter } from "react-router-dom";
import Login from "./Features/Auth/Pages/Login.jsx";
import Register from "./Features/Auth/Pages/Register.jsx";
import Protected from "./Features/Auth/Components/Protected.jsx";
import Home from "./Features/Interview/pages/Home.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Protected><Home /></Protected>
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