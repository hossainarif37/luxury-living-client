import { useAuthState } from "react-firebase-hooks/auth";
import useAdmin from "../hooks/useAdmin";
import auth from "../firebase.init";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";

const RequireDashboard = ({ children }) => {
    const [user, userLoading, userError] = useAuthState(auth);


    const [isAdmin, adminLoading, setAdminLoading] = useAdmin(user?.email);
    if (userLoading || adminLoading) {
        return <Loading />
    }
    if (userError) {
        console.log("User Error", userError);
    }

    if (user && !isAdmin) {
        return children;
    }
    else if (user && isAdmin) {
        toast.error('You have no permission to access of Dashboard route!');
        return <Navigate to="/" />
    }
};

export default RequireDashboard;