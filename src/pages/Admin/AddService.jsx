import { AiOutlineCloudUpload } from 'react-icons/ai'

const AddService = () => {
    return (
        <div className='mt-3 lg:ml-3 lg:mr-10'>
            <div className="flex flex-col lg:bg-white lg:p-7 rounded-2xl gap-y-3 lg:w-1/2">
                <div className='space-y-2'>
                    <label className='font-semibold text-primary'>Service Title</label>
                    <input className="input bg-white border" type="text" placeholder="Enter Title" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className='font-semibold text-primary' htmlFor="service-price">Price</label>
                    <input className="input bg-white border" type="text" placeholder="Enter Price" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className='font-semibold text-primary' htmlFor="service-description">Description</label>
                    <textarea className='textarea bg-white border' placeholder='Enter Description' name="" id="service-description" cols="30" rows="2"></textarea>
                </div>
                <div className=" space-y-2">
                    <label className='font-semibold text-primary'>Image</label>
                    <div className="input w-40 bg-[#EDEAFF] border border-[#251D58] relative flex items-center gap-2">
                        <AiOutlineCloudUpload className='text-2xl' />
                        <span className='text-secondary'>Upload Image</span>
                        <input className="absolute inset-0 opacity-0" type="file" />
                    </div>
                </div>
                <button className='btn mt-3'>Submit</button>


            </div>
        </div>
    );
};

export default AddService;