
const Review = () => {
    return (
        <div className="p-3">
            <h1 className="text-2xl font-bold text-primary ">Review</h1>
            {/* ------Form------ */}
            <div className="lg:w-1/2 space-y-4 mt-5">
                <input className="input bg-white" type="text" placeholder="Your Name" />
                <input className="input bg-white" type="text" placeholder="Company's Name, Designation" />
                <textarea className="textarea bg-white" placeholder="Description" rows="4" />

                <input className="btn" type="submit" value="Submit" />
            </div>
        </div>
    );
};

export default Review;