import React from 'react';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/login';
import './index.css';

const LoginPage = () => {
    const auth = localStorage.getItem('auth');
    const history = useHistory();
    if (auth) {
        history.push('/');
    }
    return(
        <div className='login-register-frame'>
            <Login />
        </div>
    );
};

export default LoginPage;