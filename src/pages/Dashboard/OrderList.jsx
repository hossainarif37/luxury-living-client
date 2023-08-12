import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../../components/Loading";
import OrderListCard from "./OrderListCard";

const OrderList = () => {
    const [user] = useAuthState(auth);
    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ['orders'],
        queryFn: () => fetch(`https://luxury-living-server-three.vercel.app/orders?email=${user.email}`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="">
            <h1 className="text-2xl font-bold text-primary ">Order List</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 float-left gap-7 pt-5">
                {
                    orders.map(order => <OrderListCard
                        key={order._id}
                        orderInfo={order}
                    />)
                }
            </div>
        </div>
    );
};

export default OrderList;