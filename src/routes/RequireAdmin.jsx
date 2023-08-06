import { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import useAdmin from "../hooks/useAdmin";
import { toast } from "react-hot-toast";

const RequireAdmin = ({ children }) => {
    const [user, userLoading, userError] = useAuthState(auth);
    const [signOut, loading, error] = useSignOut(auth);
    const navigate = useNavigate();


    const [isAdmin, adminLoading] = useAdmin(user?.email);
    const location = useLocation();
    if (user && adminLoading || userLoading || loading) {
        return <p>loading...</p>
    }
    if (userError) {
        console.log("User Error", userError);
    }

    if (user && isAdmin) {
        return children;
    }
    else if (user && !isAdmin) {
        toast.error('You have no permission to access of Admin route! Please login as admin');
        return <Navigate to="/" />
    }
    return <Navigate to="/login" state={{ from: location }} replace />


};

export default RequireAdmin;