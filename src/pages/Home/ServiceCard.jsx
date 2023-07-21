
const ServiceCard = ({ serviceData, cartStyles }) => {
    const { img, title, desc, price, styles } = serviceData;
    return (
        <div className={`${cartStyles ? 'shadow-lg text-sm rounded-xl' : styles} text-center p-5`}>
            <img className="w-20 mx-auto" src={img} alt="" />
            <div className="mt-5 space-y-1">
                <h2 className="text-primary font-semibold text-xl">{title}</h2>
                <h3 className="text-secondary text-xl font-semibold">${price}</h3>
                <p className="text-gray-600">{desc}</p>
            </div>
            <div className="flex justify-center gap-3 items-center  mt-5">
                {!cartStyles && <button className="btn bg-amber-500 font-semibold px-5 w-full">Add to Cart</button>}
                <button className={`btn ${!cartStyles && 'w-full px-5 '}`}>Book</button>
            </div>
        </div>
    );
};

export default ServiceCard;