import { gql, useMutation } from '@apollo/client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CustomAlert } from '../customAlert';
import { ErrorPage } from '../errorpage';
import { LoadingPage } from '../loading';
import './index.css';

const LOGIN_USER = gql`
    mutation Login($user:String!, $password:String!) {
        login(user:$user, password:$password) {
            id
            username
            email
            permission
            token
        }
    }
`;

export const Login = () => {
    const history = useHistory();
    const home = '/';// TODO: need use a router export
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('请重新输入验证码');
    const [ login, { loading, error }] = useMutation(
        LOGIN_USER,
        {
            onCompleted: ({ login }) => {
                if (login && login.token) {
                    localStorage.setItem('auth', login.token);
                    history.push(home);
                    history.go(0);
                }
            },
        }
    );

    if (loading) return <LoadingPage />;
    if (error) return <ErrorPage msg={error.message} />;

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'user':
                setUser(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                throw new Error('wrong input name'); //TODO: need add log system
        }
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login({
            variables:{
                user,
                password,
            },
        });
        setUser('');
        setPassword('');
    }

    return (
        <>
            {alert && <CustomAlert msg={message} onClick={() => setAlert(false)} />}
            <div className='login-box'>
                <div className='login-title'>
                    <Link to='/' className='login-back-home'>Log in</Link>
                    <div className='login-title-line'></div>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='login-username'>
                        <label>username/email
                            <input type='text' name="user" onChange={handleChange} value={user} required />
                        </label>
                    </div>
                    <div className='login-password'>
                        <label>password
                            <input type='password' name="password" onChange={handleChange} value={password} required />
                        </label>
                    </div>
                    <div className='login-button'>
                        <button type='submit'>Log in</button>
                    </div>
                </form>
                <div className='login-register'>
                    <Link to='/register' >rigister here</Link>
                </div>
            </div>
        </>
    );
};