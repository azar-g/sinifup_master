import { lazy } from 'react';
//
// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router-dom';
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// // render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// // render - MainLayout routes
const Students = Loadable(lazy(() => import('../pages/administration/StudentsList')));
const Parents = Loadable(lazy(() => import('../pages/administration/ParentsList')));

// render - Login routes
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

const routes = (isLoggedIn) => [
    {
        path: '/',
        element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
        children: [
            {
                path: '/',
                element: <DashboardDefault />
            },
            {
                path: 'color'
                // element: <Color />
            },
            {
                path: 'dashboard',
                children: [
                    {
                        path: 'default'
                        // element: <DashboardDefault />
                    }
                ]
            },
            {
                path: 'students',
                element: <Students />
            },
            {
                path: 'parents',
                element: <Parents />
            }
        ]
    },
    {
        path: '/',
        element: !isLoggedIn ? <MinimalLayout /> : <Navigate to="/" />,
        children: [
            {
                path: 'login',
                element: <AuthLogin />
            },
            {
                path: 'register',
                element: <AuthRegister />
            }
        ]
    }
];
// console.log(isLoggedIn);

export default routes;
