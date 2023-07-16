
const ServiceCard = ({ serviceData }) => {
    const { img, title, desc, price, styles } = serviceData;
    return (
        <div className={`${styles} text-center p-5`}>
            <img className="w-20 mx-auto" src={img} alt="" />
            <div className="mt-5 space-y-1">
                <h2 className="text-primary font-semibold text-xl">{title}</h2>
                <h3 className="text-secondary text-xl font-semibold">${price}</h3>
                <p className="text-gray-600">{desc}</p>
            </div>
        </div>
    );
};

export default ServiceCard;