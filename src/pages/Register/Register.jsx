import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;

        //reset state
        setRegisterError("");
        setSuccess("");

        if (password.length < 6) {
            setRegisterError("Password should be at least 6 characters or longer");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("Your password should have at least one upper case character");
            return;
        }
        else if(!accepted){
            setRegisterError("Please accept our terms and conditions!")
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setSuccess("User created successfully");
                console.log(result.user);
            })
            .catch(error => {
                setRegisterError(error.message);
                //console.error(error);
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="w-1/4">
                <h1 className="text-center mb-8 text-5xl font-bold">Register now !</h1>
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="your email" className="input input-bordered" required />
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
                            <div className="flex gap-2 mt-4">
                                <input type="checkbox" name="terms" />
                                <label htmlFor="terms">Accept our <a href="#">terms and conditions!</a></label>
                            </div>
                        </div>
                        <div className="form-control mt-4">
                            <button className="btn btn-primary text-white font-bold">Register</button>
                        </div>
                        <p>Already have an account? Please <Link className="font-bold text-blue-600 underline" to="/login">Login</Link></p>
                    </form>
                </div>
                {
                    registerError && <p className="text-red-500 mt-5 font-semibold">{registerError}</p>
                }
                {
                    success && <p className="text-green-600 mt-5 font-semibold">{success}</p>
                }
            </div>
           
        </div>
    );
};

export default Register;