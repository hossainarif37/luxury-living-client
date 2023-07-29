import { BiLogoFacebook } from "react-icons/bi";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/Icon/google.png"
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useCreateUserWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { toast } from "react-hot-toast";
import { useState } from "react";

const Register = () => {
    const [customError, setCustomError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    //* Create user with Email and Password
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    //* Create user with Google
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    //* Create user with Facebook
    //? Facebook Provider
    const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);

    const emailAlreadyUsed = error?.message.includes('email-already-in-use');

    if (loading || googleLoading || facebookLoading) {
        return <p>loading...</p>
    }

    if (error || errors || googleError || facebookError) {
        console.log('Error', error, errors && errors, 'GoggleError', googleError, 'FacaebookError', facebookError);
    }

    const handleRegister = (data) => {
        if (data.password === data.confirmPassword) {
            createUserWithEmailAndPassword(data.email, data.password);
            setCustomError('');
            if (user) {
                toast.success('User Created Successfully!');
            }
        }
        else {
            setCustomError('Password not matched!');
            console.log(errors);
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
                            {...register('name', { required: 'Write maximum 20 character', maxLength: 20, })}
                            required
                        />

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
                        {/* Confirm Password */}
                        <input
                            className="input border-[#999] px-0 placeholder:text-gray-700 text-gray-800 bg-white border-b rounded-none"
                            type="password"
                            placeholder="Confirm Password"
                            {...register('confirmPassword', { required: true })}
                            required
                        />
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
                        value="Login"
                    />
                    <p className="text-center">Already have an account? <Link className="text-secondary underline" to='/login'>Login</Link></p>
                </form>
                {/*//* -------Form end-------- */}

                <div className="lg:px-12">
                    {/* ---------Or--------- */}
                    <div className="flex gap-2 items-center my-5 justify-center">
                        <div className="border w-full"></div>
                        <div>Or</div>
                        <div className="border w-full"></div>
                    </div>

                    {/*//? ------Social Login------ */}
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
                </div>
            </div>
        </div>
    );
};

export default Register;