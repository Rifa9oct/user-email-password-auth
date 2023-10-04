import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Register = () => {
    const [registerError,setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const handleRegister = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        //reset state
        setRegisterError("");
        setSuccess("");

        if(password.length < 6){
            setRegisterError("Password should be at least 6 characters or longer");
            return;
        }
        
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            setSuccess("User created successfully");
            console.log(result.user);
        })
        .catch(error =>{
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
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary font-bold">Register</button>
                        </div>
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