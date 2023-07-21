import { serviceData } from "../../../public/serviceData";
import ServiceCard from "../Home/ServiceCard";

const Cart = () => {
    return (
        <section className="">
            <h1 className="text-2xl font-bold text-primary">My Cart</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 pt-10'>
                {serviceData.map((data, index) => <ServiceCard
                    key={index}
                    serviceData={data}
                    cartStyles={true}
                />)}
            </div>
        </section>
    );
};

export default Cart;