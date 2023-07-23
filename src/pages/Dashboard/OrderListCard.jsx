
const OrderListCard = ({ orderInfo, deliveryStatus }) => {
    const { img, title, desc } = orderInfo;
    return (
        <div className="bg-white p-7 lg:w-96 space-y-3 rounded-xl">
            <div className="flex justify-between">
                <img className="w-[60px]" src={img} alt="" />
                <div>
                    <button className="text-red-500 rounded-lg bg-red-200 py-2 px-5">{deliveryStatus}</button>
                </div>
            </div>
            <h1 className="text-xl text-gray-800 font-bold">{title}</h1>
            <p className="text-gray-600">{desc}</p>
        </div>
    );
};

export default OrderListCard;