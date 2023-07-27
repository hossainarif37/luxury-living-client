import { AiOutlineCloudUpload } from 'react-icons/ai'

const AddService = () => {
    return (
        <div className='lg:bg-white lg:p-7 rounded-2xl mt-5 lg:ml-3 lg:mr-10'>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5 items-center ">
                <div className='space-y-2'>
                    <label className='font-semibold text-primary'>Service Title</label>
                    <input className="input bg-white border" type="text" placeholder="Enter Title" />
                </div>
                <div className=" space-y-2">
                    <label className='font-semibold text-primary'>Image</label>
                    <div className="input w-40 bg-[#EDEAFF] border border-[#251D58] relative flex items-center gap-2">
                        <AiOutlineCloudUpload className='text-2xl' />
                        <span className='text-secondary'>Upload Image</span>
                        <input className="absolute inset-0 opacity-0" type="file" />
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <label className='font-semibold text-primary' htmlFor="service-description">Description</label>
                    <textarea className='textarea bg-white border' placeholder='Enter Description' name="" id="service-description" cols="30" rows="4"></textarea>
                </div>
            </div>
            <button className='btn mt-5'>Submit</button>
        </div>
    );
};

export default AddService;