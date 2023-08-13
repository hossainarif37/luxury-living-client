import { useEffect, useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { toast } from "react-hot-toast";

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://luxury-living-server-production.up.railway.app/user?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.role === 'admin') {
                        setIsAdmin(true);
                        setAdminLoading(false);
                    }
                    else {
                        setIsAdmin(false);
                        setAdminLoading(false);
                    }

                })
        }
    }, [email])
    return [isAdmin, adminLoading, setAdminLoading]
};

export default useAdmin;