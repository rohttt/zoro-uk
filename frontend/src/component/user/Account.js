import React, { useEffect } from 'react'
import './stylesheet/account.css'
import accountImg from "../../assets/images/account.png";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../constants/userContants';

export const Account = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, []);

    const handleLogout = () => {
        dispatch({ type: LOGOUT });
        navigate('/');
    }

    return (
        <>
            {user && <>
                <div className="account-container">
                    <div className="account-card">
                        <img src={accountImg} className='account-img' alt="profile image" />
                        <h3>{user.name}</h3>
                        <h3>{user.email}</h3>
                        <button type="submit" className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </>}
        </>
    )
}
