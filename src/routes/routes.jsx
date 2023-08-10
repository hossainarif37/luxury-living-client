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
import Admin from "../pages/Admin/Admin";
import UserOrder from "../pages/Admin/UserOrder";
import AddService from "../pages/Admin/AddService";
import ManageServices from "../pages/Admin/ManageServices";
import PrivateRoute from "./PrivateRoute";
import EditService from "../pages/Admin/EditService";
import RequireAdmin from "./RequireAdmin";
import RequireDashboard from "./RequireDashboard";
import ManageUsers from "../pages/Admin/ManageUsers";


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
                element: <PrivateRoute><RequireDashboard><Dashboard /></RequireDashboard></PrivateRoute>,
                children: [
                    {
                        path: 'cart',
                        element: <Cart />,
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
                element: <RequireAdmin> <Admin /></RequireAdmin>,
                children: [
                    {
                        path: 'user-order',
                        element: < UserOrder />,
                    },
                    {
                        path: 'add-service',
                        element: < AddService />,
                    },
                    {
                        path: 'manage-services',
                        element: < ManageServices />,
                    },
                    {
                        path: 'manage-users',
                        element: < ManageUsers />,
                    },
                    {
                        path: 'manage-services/edit-service/:id',
                        element: < EditService />,
                    },
                ]
            }
        ]
    }
])