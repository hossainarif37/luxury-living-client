import { serviceData } from "../../../public/serviceData";
import OrderListCard from "./OrderListCard";

const OrderList = () => {
    return (
        <div className="">
            <h1 className="text-2xl font-bold text-primary ">Order List</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 float-left gap-7 pt-5">
                {serviceData.map((service, index) => <OrderListCard
                    key={index}
                    orderInfo={service}
                    deliveryStatus={'Pending'}
                />)}
            </div>
        </div>
    );
};

export default OrderList;