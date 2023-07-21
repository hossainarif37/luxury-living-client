
import { serviceData } from '../../../public/serviceData';
import ServiceCard from './ServiceCard';

const Services = () => {

    return (
        <section className='px-5 lg:padding lg:pt-5'>
            <div className="text-center lg:mb-14">
                <h2 className="font-semibold text-secondary">Services</h2>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary">We're an agency tailored to all <br className='hidden lg:block' />
                    clients needs that always delivers</h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 pt-5'>
                {serviceData.slice(0, 3).map((data, index) => <ServiceCard
                    key={index}
                    serviceData={data}
                />)}
            </div>
            <div className='flex my-14 justify-center'>
                <button className='btn '>Explore More</button>
            </div>
        </section>
    );
};

export default Services;