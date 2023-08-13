import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { useState } from "react";
import { toast } from "react-hot-toast";

const UserOrder = () => {
    const { data: orders, isLoading, isError, refetch } = useQuery({
        queryKey: ['usersOrder'],
        queryFn: () => fetch('https://luxury-living-server-34zq.onrender.com/orders')
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading />
    }

    const handleDeliveryStatus = (e, orderId) => {
        fetch(`https://luxury-living-server-34zq.onrender.com/orders?id=${orderId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                deliveryStatus: e.target.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    refetch();
                    toast.success('Delivery Status Updated')
                }
            });
    }

    return (
        <div className="overflow-x-auto py-3 lg:px-5 lg:mr-10 rounded-2xl bg-white">
            <table className="w-full text-left">
                {/* -------head-------- */}
                <thead className="">
                    <tr className="flex justify-between text-xs lg:text-sm lg:mb-5 lg:bg-[#F5F6FA] rounded-2xl py-3 px-5 ">
                        <th className="font-semibold flex-1">Name</th>
                        <th className="font-semibold flex-1">Email</th>
                        <th className="font-semibold flex-1 lg:ml-10 lg:pl-5">Service</th>
                        <th className="font-semibold flex-1">Pay With</th>
                        <th className="font-semibold flex-1">Status</th>
                    </tr>
                </thead>
                {/* -------body------- */}
                <tbody className="space-y-10">
                    {
                        orders.map(({ _id, userName, email, title, deliveryStatus, paymentMethod }) => <>
                            <tr
                                className="flex justify-between  space-x-5 px-5 text-xs lg:text-sm"
                                key={_id}
                            >
                                <td className="flex-1">{userName}</td>
                                <td className="flex-1 ">{email}</td>
                                <td className="flex-1 lg:ml-10">{title}</td>
                                <td className="flex-1">{paymentMethod}</td>
                                <td className="flex-1">
                                    <select
                                        className="bg-white"
                                        name="deliveryStatus"
                                        id=""
                                        defaultValue={deliveryStatus}
                                        // value={deliveryStatus}
                                        onChange={(e) => handleDeliveryStatus(e, _id)}>
                                        <option value="Pending">Pending</option>
                                        <option value="On going">On going</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </td>
                            </tr>
                        </>)
                    }


                </tbody>
            </table>
        </div >
    );
};

export default UserOrder;