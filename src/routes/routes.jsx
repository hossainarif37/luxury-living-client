import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Login from "../pages/AuthPages/Login";
import Register from "../pages/AuthPages/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Cart from '../pages/Dashboard/Cart'
import OrderList from "../pages/Dashboard/OrderList";
import Review from "../pages/Dashboard/Review";
import Payment from "../pages/Dashboard/Payment/Payment";
import Admin from "../Admin/Admin";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            // Dashboard Start
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: 'cart',
                        element: <Cart />
                    },
                    {
                        path: 'order-list',
                        element: <OrderList />
                    },
                    {
                        path: 'review',
                        element: <Review />
                    },
                    {
                        path: 'cart/payment/:id',
                        element: <Payment />
                    },
                ]
            },
            // Dashboard End
            // Admin Start
            {
                path: '/admin',
                element: <Admin />,
                children: [

                ]
            }
        ]
    }
])