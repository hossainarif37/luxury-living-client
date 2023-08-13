import banner from '../../assets/Image/banner.png'
const Hero = () => {
    return (
        <section id='home' className='flex scroll-mt-28 flex-col space-y-7 py-5 lg:space-y-0 lg:py-16 px-5  lg:flex-row lg:padding bg-[#F6F6F6]'>
            <div className='lg:w-1/2 space-y-5 lg:space-y-7 lg:mt-10 text-center lg:text-left'>
                <h1 className='flex flex-col text-4xl lg:space-y-3 lg:text-5xl font-extrabold text-[#1F1632]'>
                    <span>We Build</span>
                    <span>Your Dream</span>
                </h1>
                <p className='text-gray-600 leading-[26px]'>Online Easte Agency, the mordern way to sell your own home, <br className='hidden lg:block' />
                    You can use Griffin Residential to market your property</p>
                <button className='btn'>Booking</button>
            </div>
            <div className='lg:w-1/2'>
                <img src={banner} alt="Banner" />
            </div>
        </section>
    );
};

export default Hero;