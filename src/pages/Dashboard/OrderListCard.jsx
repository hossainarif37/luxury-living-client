
const OrderListCard = ({ orderInfo }) => {
    const { img, title, description, deliveryStatus } = orderInfo;
    return (
        <div className="bg-white p-7 lg:w-96 space-y-3 rounded-xl">
            <div className="flex justify-between">
                <img className="w-[60px]" src={img} alt="" />
                <div>
                    <button
                        className={`rounded-lg py-2 px-5
                         ${(deliveryStatus === 'Pending' && 'bg-red-200 text-red-500')
                            || (deliveryStatus === 'On going' && 'bg-yellow-200 text-yellow-600')
                            || (deliveryStatus === 'Done' && 'bg-green-200 text-green-500')
                            } 
                            `}
                    >{deliveryStatus}</button>
                </div>
            </div>
            <h1 className="text-xl text-gray-800 font-bold">{title}</h1>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default OrderListCard;