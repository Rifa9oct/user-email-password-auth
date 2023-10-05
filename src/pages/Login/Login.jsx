import {sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                swal("Good job!", "User Login successfully!", "success");
            })
            .catch(() => {
                swal("Opps!","Invalid password", "error");
            })
    }

    const handleForgetPassword = ()=>{
        const email = emailRef.current.value;
        if(!email){
            swal("Oops!", "Please provide an email", "warning");
            return;
        }
        else if( !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            swal("Oops!", "Please write a valid email", "error");
            return;
        }
        
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            swal("Please check your email");
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="w-1/4">
                <h1 className="text-center mb-8 text-5xl font-bold">Login now !</h1>
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} name="email" placeholder="your email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password" placeholder="password" className="input input-bordered w-full" required />
                                <span className="absolute top-4 right-3" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </span>
                            </div>
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="text-sm mt-2 label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary text-white font-bold">Login</button>
                        </div>
                        <p>New to this website? Please <Link className="font-bold text-blue-600 underline" to="/register">Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;