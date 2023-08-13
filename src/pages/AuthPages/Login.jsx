import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/Icon/google.png"
import { BiLogoFacebook } from "react-icons/bi"
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import useAdmin from "../../hooks/useAdmin";
import { useContext, useState } from "react";
import { Menu } from "../../ContextAPI/ContextAPI";
import Loading from "../../components/Loading";

const Login = () => {
    const [currentUser, currentUserLoading, currentUserError] = useAuthState(auth);
    const [databaseLoading, setDatabaseLoading] = useState(false);
    const { setCustomLoading } = useContext(Menu);
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);

    //* Create user with Google
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    //* Create user with Facebook
    const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);
    const [isAdmin, adminLoading, setAdminLoading] = useAdmin(user?.email);
    const wrongPassword = error?.message.includes('wrong-password');
    const userNotFound = error?.message.includes('user-not-found');

    let from = location.state?.from?.pathname || "/";
    if (currentUserLoading || loading || googleLoading || databaseLoading) {
        return <Loading />
    }
    // if (currentUser) {
    //     // setAdminLoading(prev => !prev);
    //     navigate(from, { replace: true });
    // }

    //* Google SignIn
    const handleGoogleSignIn = async () => {
        const gUser = await signInWithGoogle();

        if (gUser) {
            //* Save User Data in Database: (userName, email, role)
            fetch('https://luxury-living-server-34zq.onrender.com/users', {
                method: 'POST',
                body: JSON.stringify({
                    userName: gUser.user.displayName,
                    email: gUser.user.email,
                    role: 'user'
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.acknowledged) {
                        setDatabaseLoading(prev => !prev);
                        navigate(from, { replace: true });
                        toast.success('Login Successfully!');
                    }
                });

        }
    }

    if (error) {
        console.log(error.message);
    }

    //* SignIn with Email and Password
    const handleSignIn = async (data) => {
        setAdminLoading(prev => !prev);
        const signInUser = await signInWithEmailAndPassword(data.email, data.password);
        reset();
        if (signInUser) {
            setAdminLoading(prev => !prev);
            navigate(from, { replace: true });
            toast.success('Login Succesfully!');
        }
    }

    return (
        <div className="py-10 px-3 lg:px-0 h-screen">
            <div className="lg:w-2/5 mx-auto px-2 lg:px-12 py-10 rounded-xl lg:shadow-lg">
                {/* -------Form start-------- */}
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className="space-y-5">
                        <h1 className="text-center text-2xl font-bold">Login</h1>
                        {/* Email */}
                        <input
                            className="input border-[#999] px-0 placeholder:text-gray-700 text-gray-800 bg-white border-b rounded-none"
                            type="email"
                            placeholder="Email"
                            {...register('email', {
                                required: 'Email is required!',
                                pattern: /^\S+@\S+\.\S+$/
                            })}
                        />
                        {
                            errors?.email?.type === 'required' && <p className="error">{errors.email.message}</p> ||
                            errors?.email?.type === 'pattern' && <p className="error">Invalid Email</p>
                        }
                        {/* Password */}
                        <input
                            className="input border-[#999] px-0 placeholder:text-gray-700 text-gray-800 bg-white border-b rounded-none"
                            type="password"
                            placeholder="Password"
                            {...register('password', {
                                required: 'Password is required!',
                                minLength: 6
                            })}

                        />
                        {/* Error Message */}
                        {
                            errors?.password?.type === 'required' && <p className="error">{errors.password.message}</p> ||
                            errors?.password?.type === 'minLength' && <p className="error">Minimum length 6 character!</p>
                        }
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

                    {/*//? ------Social Login------ */}
                    <div className="space-y-3">
                        {/*//* Facebook */}
                        <button
                            className="flex active:scale-95 transition-all border w-full p-2 rounded-3xl"
                            onClick={() => signInWithFacebook()}
                        >
                            <span className="w-7  h-7 flex justify-center items-center rounded-full text-white  bg-[#3076FF]"><BiLogoFacebook className="" /></span>
                            <span className="flex-1">Continue with Facebook</span>
                        </button>

                        {/*//* Google */}
                        <button
                            className="flex active:scale-95 transition-all border w-full p-2 rounded-3xl"
                            onClick={handleGoogleSignIn}
                        >
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