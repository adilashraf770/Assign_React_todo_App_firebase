import { message } from 'antd'
import { auth, firestore } from 'config/firebase'
// import { useAuthContext } from 'contexts/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const insitialState = {
    fullName: "", email: "", password: ""
}
const Register = () => {
    const [state, setState] = useState(insitialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()


    const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleLogin = (e) => {
        e.preventDefault()
        setIsProcessing(true)
        // console.log(state);
        let { fullName, email, password } = state
        if (fullName < 3) {
            return alert("Please Enter Name Correctly")
        }
        if (!validateEmail(email)) {
            return alert("Please Enter Email Correctly")
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                createUser(user)
                message.success("User is LOGGED IN.")
                // console.log('user', user)
                // ...
                // dispatch({ type: "SET_LOGGED_IN", payload: { user } })
            })
            .catch((error) => {
                message.error(error)
                // ..
            })
            .finally(() => {
                setIsProcessing(false)
            });
        navigate("/auth/login")
    }
    const createUser = async (user) => {
        const { email, uid } = user
        const { fullName, password } = state

        const userData = {
            email, uid, fullName, password,
            dateCreated: serverTimestamp(),
            status: "active"
        }
        console.log('userData', userData)

        try {
            await setDoc(doc(firestore, "users", userData.uid), userData);
            message.success("User is Created Successfully.")
        }
        catch (e) {
            message.success(e)
        }

    }


    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };
    return (
        <div className="login py-5">
            <div className="container">
                {/* <div className="row mb-3">
                    <div className="col">
                        <Link className="btn btn-success " to='/'>Go to Home</Link>
                    </div>
                </div> */}
                <div className="row ">
                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 ">
                        <div className="card p-4 ">
                            <div className="row pb-4">
                                <div className="col-12 pb-4">
                                    <h1 className="text-center">Login</h1>
                                </div>
                            </div>
                            <form className="row g-3">
                                <div className="col-12 mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="fullName" name='fullName' placeholder='Enter Name ' onChange={handleChange} />
                                </div>
                                <div className="col-12  mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name='email' placeholder='Enter Email ' onChange={handleChange} />
                                </div>
                                <div className="col-12  mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name='password' placeholder='Enter Password ' onChange={handleChange} />
                                </div>
                                <div className="col-12 text-center">
                                    {isProcessing
                                        ? <button className="btn btn-primary w-100" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>

                                        </button>
                                        : <button type="submit" className="btn btn-primary w-100 " onClick={handleLogin}>Login</button>
                                    }
                                </div>
                            </form>

                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
}

export default Register