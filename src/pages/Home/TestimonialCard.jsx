import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
const TestimonialCard = ({ testimonialInfo }) => {
    const { img, name, job, message, ratings } = testimonialInfo;
    let rating = [];
    for (let i = 0; i < ratings; i++) {
        rating.push(i)
    }
    return (
        <div className="bg-white px-3 py-7 space-y-3">
            <div className="flex gap-3 items-center ">
                <img className="w-16" src={img} alt={`${name}'s Photo`} />
                <div>
                    <h2 className="font-semibold text-xl">{name}</h2>
                    <h3 className="font-semibold text-gray-800">{job}</h3>
                </div>
            </div>
            <p className="text-gray-600">{message}</p>
            <div className='flex gap-2 items-center'>
                {
                    rating.map((r, index) => <>
                        <span className='text-2xl text-[#FFAC0C]'><AiFillStar /></span>
                    </>)
                }
                <span className={`${(rating.length < 5) ? 'block text-2xl text-[#FFAC0C]' : 'hidden'}`}><AiOutlineStar /></span>
            </div>
        </div>
    );
};

export default TestimonialCard;