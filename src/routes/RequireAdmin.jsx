import { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import useAdmin from "../hooks/useAdmin";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";

const RequireAdmin = ({ children }) => {
    const [user, userLoading, userError] = useAuthState(auth);
    const [signOut, loading, error] = useSignOut(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const isDashboard = location.pathname.includes('dashboard');


    const [isAdmin, adminLoading, setAdminLoading] = useAdmin(user?.email);
    if (user && adminLoading || userLoading || loading) {
        return <Loading />
    }
    if (userError) {
        console.log("User Error", userError);
    }

    if (user && isAdmin && !isDashboard) {
        return children;
    }
    else if (user && isAdmin && isDashboard) {
        toast.error('You have no permission to access of Dashboard route!');
        return <Navigate to="/" />
    }
    else if (user && !isAdmin) {
        toast.error('You have no permission to access of Admin route! Please login as admin');
        return <Navigate to="/" />
    }

    return <Navigate to="/login" state={{ from: location }} replace />


};

export default RequireAdmin;