import profile1 from '../../assets/Image/profile1.png'
import profile2 from '../../assets/Image/profile2.png'
import profile3 from '../../assets/Image/profile3.png'
import TestimonialCard from './TestimonialCard';
const Testimonials = () => {
    const testimonialData = [
        {
            img: profile1,
            name: 'Nash Patrik',
            job: 'CEO, Manpol',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus commodo ipsum duis laoreet maecenas. Feugiat',
            ratings: 4
        },
        {
            img: profile2,
            name: 'Miriam Barron',
            job: 'CEO, Manpol',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus commodo ipsum duis laoreet maecenas. Feugiat',
            ratings: 5
        },
        {
            img: profile3,
            name: 'Bria Malone',
            job: 'CEO, Manpol',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus commodo ipsum duis laoreet maecenas. Feugiat',
            ratings: 5
        },
    ]
    return (
        <div className='bg-[#F6F6F6] lg:padding px-5 py-10 lg:py-20'>
            <h1 className="text-4xl font-bold text-center mb-10 lg:mb-14">Testimonials</h1>
            <div className='flex flex-col lg:flex-row gap-5'>
                {testimonialData.map((data, index) => <TestimonialCard
                    key={index}
                    testimonialInfo={data}
                />)}
            </div>
        </div>
    );
};

export default Testimonials;