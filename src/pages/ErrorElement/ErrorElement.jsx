import { Link } from "react-router-dom";

const ErrorElement = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center ">
            <h1 className="text-4xl font-black">Page Not Found</h1>
            <Link to='/' className="btn mt-5">Back to Home</Link>
        </div>
    );
};

export default ErrorElement;