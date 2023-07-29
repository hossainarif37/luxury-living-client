import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/Icon/google.png"
import { BiLogoFacebook } from "react-icons/bi"
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";

const Login = () => {
    const [currentUser, currentUserLoading, currentUserError] = useAuthState(auth);
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const wrongPassword = error?.message.includes('wrong-password');
    const userNotFound = error?.message.includes('user-not-found');

    let from = location.state?.from?.pathname || "/";
    if (currentUserLoading || loading) {
        return <p>loading...</p>
    }

    if (currentUser) {
        navigate(from, { replace: true });
    }
    console.log(currentUser);
    if (error) {
        console.log(error.message);
    }
    const handleRegister = (data) => {
        signInWithEmailAndPassword(data.email, data.password);
        if (user) {
            toast.success('Login Succesfully!')
        }
    }

    return (
        <div className="py-10 px-3 lg:px-0 h-screen">
            <div className="lg:w-2/5 mx-auto px-2 lg:px-12 py-10 rounded-xl lg:shadow-lg">
                {/* -------Form start-------- */}
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="space-y-5">
                        <h1 className="text-center text-2xl font-bold">Login</h1>
                        {/* Email */}
                        <input
                            className="input border-[#999] px-0 placeholder:text-gray-700 text-gray-800 bg-white border-b rounded-none"
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: true })}
                            required
                        />
                        {/* Password */}
                        <input
                            className="input border-[#999] px-0 placeholder:text-gray-700 text-gray-800 bg-white border-b rounded-none"
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: true })}
                            required

                        />
                        {/* Error Message */}
                        <p className={`text-red-500 text-sm ${error ? 'block' : 'hidden'}`}>
                            {wrongPassword && 'Wrong password!' || userNotFound && 'User not found!'}
                        </p>
                    </div>
                    {/* Login Button */}
                    <input className="btn w-full cursor-pointer mt-7 mb-3" type="submit" value="Login" />
                    <p className="text-center">Don't Have an account? <Link className="text-secondary underline" to='/register'>Create an account</Link></p>
                </form>
                {/* -------Form end-------- */}

                <div>
                    {/* ---------Or--------- */}
                    <div className="flex gap-2 items-center my-5 justify-center">
                        <div className="border w-full"></div>
                        <div>Or</div>
                        <div className="border w-full"></div>
                    </div>
                    {/* ------Social Login------ */}
                    <div className="space-y-3">
                        {/* Facebook */}
                        <button className="flex active:scale-95 transition-all border w-full p-2 rounded-3xl ">
                            <span className="w-7  h-7 flex justify-center items-center rounded-full text-white  bg-[#3076FF]"><BiLogoFacebook className="" /></span>
                            <span className="flex-1">Continue with Facebook</span>
                        </button>
                        {/* Google */}
                        <button className="flex active:scale-95 transition-all border w-full p-2 rounded-3xl">
                            <img className="w-7 h-7" src={googleIcon} alt="google icon" />
                            <span className="flex-1">Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;