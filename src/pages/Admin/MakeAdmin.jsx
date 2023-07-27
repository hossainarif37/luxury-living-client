
const MakeAdmin = () => {
    return (
        <div className=" h-screen  mr-10 ml-3 mt-5 ">
            <div className="bg-white h-1/3 lg:h-1/2 p-5 rounded-2xl">
                <label className="" htmlFor="make-admin-input">Email</label>
                <div className="flex flex-col lg:flex-row gap-5 mt-3">
                    <input className="input lg:w-1/2 border bg-white" type="email" placeholder="example@gmail.com" />
                    <button className="btn">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;