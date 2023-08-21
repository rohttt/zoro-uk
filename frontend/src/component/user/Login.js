import React, { useState, useEffect } from 'react'
import './stylesheet/login.css';
import { login, clearErrors } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loaderImg from "../../assets/images/loading.gif";
import Alert from '../alert/Alert';

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    // submit login form
    const loginSubmit = (e) => {
        e.preventDefault();

        // validating email
        if (!loginEmail.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            setShowAlert({ type: "danger", msg: "Please enter a a valid Email." });
        } else {
            dispatch(login(loginEmail, loginPassword));
        }

    };

    useEffect(() => {
        // Showing alert box if there's some error in the api request
        if (error) {
            setShowAlert({ type: "danger", msg: error });
            dispatch(clearErrors());
        }

        // if the user is authenticated redirecting to the account page
        if (isAuthenticated) {
            navigate('/account');
        }

        // Hiding alert after 3 second
        setTimeout(() => {
            setShowAlert(false);
        }, 3000)

    }, [error, isAuthenticated]);

    return (
        <>
            <div className="login-container">
                {loading ? <h1 style={{ textAlign: "center" }}>{<img src={loaderImg} className='loader-gif' />}</h1> :
                    <form className="loginForm" onSubmit={loginSubmit}>
                        {showAlert && <Alert alert={showAlert} />}
                        <h2>Login Form</h2>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Enter Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Enter Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                }
            </div>
        </>
    )
}
