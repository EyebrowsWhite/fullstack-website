import React from 'react';
import { useHistory } from 'react-router-dom';
import { Register } from '../../components/register';

// use the same classname with login page, so no css import

export const RegisterPage = () => {
    const auth = localStorage.getItem('auth');
    const history = useHistory();
    if (auth) {
        history.push('/');
    }
    return(
        <div className='login-register-frame'>
            <Register />
        </div>
    );
};