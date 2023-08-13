import { CgSearchLoading } from "react-icons/cg"
const BounceLoading = () => {
    return (
        <div className="animate-pulse text-3xl flex justify-center items-center gap-1">
            <CgSearchLoading /> <span className="">Loading...</span>
        </div>
    );
};

export default BounceLoading;