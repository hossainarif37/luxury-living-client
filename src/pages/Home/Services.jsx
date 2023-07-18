import service1 from '../../assets/Icon/service1.png'
import service2 from '../../assets/Icon/service2.png'
import service3 from '../../assets/Icon/service3.png'
import ServiceCard from './ServiceCard';
const Services = () => {
    const serviceData = [
        {
            img: service1,
            title: 'Office Interior Design',
            price: 299,
            desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
        },
        {
            img: service2,
            title: 'Showroom Design',
            styles: 'shadow-lg',
            price: 399,
            desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
        },
        {
            img: service3,
            title: 'Residential/ Home',
            price: 499,
            desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
        },
    ]
    return (
        <section className='px-5 lg:padding lg:pt-5'>
            <div className="text-center lg:mb-14">
                <h2 className="font-semibold text-secondary">Services</h2>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary">We're an agency tailored to all <br className='hidden lg:block' />
                    clients needs that always delivers</h1>
            </div>
            <div className='flex flex-col lg:flex-row gap-5 pt-5'>
                {serviceData.map((data, index) => <ServiceCard
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