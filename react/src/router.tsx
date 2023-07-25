import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.tsx";
import Signup from "./views/Signup.tsx";
import NotFound from "./views/NotFound.tsx";
import GuestLayout from "./layouts/GuestLayout.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import List from "./views/List.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/login" />

            },
            {
                path: 'signup',
                element: <Signup/>,

            },
            {
                path: 'login',
                element: <Login />
            },
        ]
    },
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/list" />

            },
            {
                path: 'list',
                element: <List />
            },
        ]
    },

    {
        path: '*',
        element: <NotFound />
    },
])

export default router;
