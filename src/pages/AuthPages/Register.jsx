import { BiLogoFacebook } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/Icon/google.png"
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { toast } from "react-hot-toast";
import { useState } from "react";
import Loading from "../../components/Loading";

const Register = () => {
    const [customError, setCustomError] = useState('');
    const [databaseLoading, setDatabaseLoading] = useState(false);
    const [currentUser, currentUserLoading] = useAuthState(auth);
    const navigate = useNavigate();


    // const [displayName, setDisplayName] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    //* Create user with Email and Password
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    //* Update User Profile with DisplayName and Photo
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    //* Create user with Google
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    //* Create user with Facebook
    //? Facebook Provider
    const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);

    const emailAlreadyUsed = error?.message.includes('email-already-in-use');

    if (loading || googleLoading || facebookLoading || updating || currentUserLoading || databaseLoading) {
        return <Loading />
    }


    // if (error || errors || googleError || facebookError) {
    //     console.log('Error', error, errors && errors, 'GoggleError', googleError, 'FacaebookError', facebookError);
    // }

    const handleRegister = async (data) => {
        const { displayName, email } = data;
        if (data.password === data.confirmPassword) {
            //* Create User account with Firebase
            const isUserExist = await createUserWithEmailAndPassword(data.email, data.password);
            setCustomError('');
            if (isUserExist) {
                //* Update User Profile
                const updateUser = await updateProfile({ displayName });
                if (updateUser === true) {
                    setDatabaseLoading(prev => !prev)
                    reset();
                    //* Save User Data in Database: (userName, email, role)
                    fetch('https://luxury-living-server-production.up.railway.app/users', {
                        method: 'POST',
                        body: JSON.stringify({
                            userName: displayName,
                            email,
                            role: 'user'
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.acknowledged) {
                                setDatabaseLoading(prev => !prev)
                                navigate('/');
                                toast.success('User Created Successfully!');
                            }
                            else {
                                toast.error(data.message)
                            }
                        });
                }
            }


        }
        else {
            setCustomError('Password not matched!');
        }

    };
    return (
        <div className="py-10 px-3 lg:px-0">
            <div className="lg:w-2/5 mx-auto px-2  ">
                {/*//* -------Form start-------- */}
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className=" lg:shadow-lg rounded-xl lg:py-8 lg:px-12"
                >
                    <div className="space-y-5">
                        <h1 className="text-center text-2xl font-bold">Create an account</h1>
                        {/* Name */}
                        <input
                            className="input border-[#999] px-0 placeholder:text-gray-700 text-gray-800 bg-white border-b rounded-none"
                            type="text"
                            placeholder="Name"
                            {...register('displayName', { required: 'Name is required!', maxLength: 15, })}

                        />
                        {
                            errors?.name?.type === 'required' && <p className="error">{errors.name.message}</p> || errors?.name?.type === 'maxLength' && <p className="error">
                                {'Maxlength 15 character!'}</p>
                        }

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
                            errors?.email?.type === 'required' && <p className="error">{errors.email.message}</p> || errors?.email?.type === 'pattern' && <p className="error">Email is invalid! </p>
                        }
                        {/* Password */}
                        <input
                            className="input border-[#999] px-0 placeholder:text-gray-700 text-gray-800 bg-white border-b rounded-none"
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'Password is required!', minLength: 6, })}
                        />
                        {
                            errors?.password?.type === 'required' && <p className="error">{errors.password.message}</p> || errors?.password?.type === 'minLength' && <p className="error">Minimum length 6 character!</p>
                        }
                        {/* Confirm Password */}
                        <input
                            className="input border-[#999] px-0 placeholder:text-gray-700 text-gray-800 bg-white border-b rounded-none"
                            type="password"
                            placeholder="Confirm Password"
                            {...register('confirmPassword', { required: 'Confirm Password is required!' })}
                        />
                        {
                            errors?.confirmPassword?.type === 'required' && <p className="error">{errors.confirmPassword.message}</p> || customError && <p className="error">{customError}</p>
                        }
                        {/* Error Message */}
                        <p className={`text-red-500 text-sm ${error ? 'block' : 'hidden'}`}>
                            {
                                emailAlreadyUsed && 'Email already in use!' || customError && customError
                            }
                        </p>
                    </div>
                    {/* Login Button */}
                    <input
                        className="btn w-full cursor-pointer mt-7 mb-3"
                        type="submit"
                        value="Register"
                    />
                    <p className="text-center">Already have an account? <Link className="text-secondary underline" to='/login'>Login</Link></p>
                </form>
                {/*//* -------Form end-------- */}

                <div className="lg:px-12">
                    {/*//* Divider Start */}
                    {/* ---------Or--------- */}
                    <div className="flex gap-2 items-center my-5 justify-center">
                        <div className="border w-full"></div>
                        <div>Or</div>
                        <div className="border w-full"></div>
                    </div>
                    {/*//* Divider End */}

                    {/*//? ------Social Login Start------ */}
                    <div className="space-y-3">
                        {/* Facebook Button*/}
                        <button
                            className="flex active:scale-95 transition-all border w-full p-2 rounded-3xl"
                            onClick={() => signInWithFacebook()}

                        >
                            <span className="w-7  h-7 flex justify-center items-center rounded-full text-white  bg-[#3076FF]"><BiLogoFacebook className="" /></span>
                            <span className="flex-1">Continue with Facebook</span>
                        </button>
                        {/* Google Button*/}
                        <button
                            className="flex active:scale-95 transition-all border w-full p-2 rounded-3xl"
                            onClick={() => signInWithGoogle()}
                        >
                            <img className="w-7 h-7" src={googleIcon} alt="google icon" />
                            <span className="flex-1">Continue with Google</span>
                        </button>
                    </div>
                    {/*//? ------Social Login End------ */}
                </div>
            </div>
        </div>
    );
};

export default Register;