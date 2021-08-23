import { gql, useMutation } from '@apollo/client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isEmail } from '../../../utils/isEmail';
import { sleep } from '../../../utils/sleep';
import { CustomAlert } from '../customAlert';
import { ErrorPage } from '../errorpage';
import { LoadingPage } from '../loading';
import './index.css';

const SEND_VERIFY_CODE = gql`
    mutation SendVerifyCode($email:String!) {
        sendVerifyCode(email: $email)
    }
`;

const REGISTER_USER = gql`
    mutation Register($email: String!, $username: String!, $password: String!, $verifyCode: String!) {
        register(email: $email, username: $username, password: $password, verifyCode: $verifyCode) {
            id
            username
            email
        }
    }
`;

export const Register = () => {
    const history = useHistory();
    const login = '/login'; //TODO: need use router page export
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [send, setSend] = useState(false);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('Error');
    const [time, setTime] = useState(60);

    const [sendVerifyCode] = useMutation(SEND_VERIFY_CODE);

    const [register, { loading, error }] = useMutation(
        REGISTER_USER,
        {
            onCompleted: async ({ register }) => {
                if (register && register.username) {
                    setAlert(true);
                    setMessage('注册成功, 1s后跳转');
                    await sleep(1000);
                    history.push(login);
                }
            }
        }
    );

    if (loading) return <LoadingPage />;
    if (error) return <ErrorPage msg={error.message} />;

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register({
            variables:{
                email,
                username,
                password,
                verifyCode
            },
        });
        setUsername('');
        setEmail('');
        setVerifyCode('');
        setPassword('');
    };

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'verifyCode':
                setVerifyCode(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                throw new Error('wrong input name'); //TODO: need add log system
        }
    };

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>|any) => {
        e.preventDefault();
        if (isEmail(email)) {
            console.log(email);
            sendVerifyCode({
                variables: {
                    email
                }
            });
            e.target.disabled = true;
            setSend(true);
            let num = 60;
            const timer = setInterval(() => {
                num--;
                setTime(num);
                if (num == 0) {
                    clearInterval(timer);
                    setSend(false);
                    e.target.disabled = false;
                    setTime(60);
                }
            }, 1000);
        } else {
            setMessage('please check your eamil');
            setAlert(true);
        }
    }

    return (
        <>
            {alert && <CustomAlert msg={message} onClick={() => setAlert(false)} />}
            <div className='register-box'>
                <div className='register-title'>
                    <Link className='register-back-home' to='/'>Register</Link>
                    <div className='register-title-line'></div>
                </div>
                <form className='register-form' onSubmit={handleSubmit}>
                    <div className='register-username'>
                        <label>username
                            <input type='text' name='username' value={username} required onChange={handleChange} />
                        </label>
                    </div>
                    <div className='register-email'>
                        <label>email
                            <input type='text' name='email' value={email} required onChange={handleChange} />
                        </label>
                    </div>
                    <div className='register-verify-code'>
                        <label>verification code
                            <input type='text' name='verifyCode' value={verifyCode} required onChange={handleChange} />
                        </label>
                            <button className='send-verify-code' type='button' onClick={handleClick}>{send ? `${time}` : 'send'}</button>
                    </div>
                    <div className='register-password'>
                        <label>password
                            <input type='password' name='password' value={password} required onChange={handleChange} />
                        </label>
                    </div>
                    <div className='register-button'>
                        <button type='submit'>Register</button>
                    </div>
                </form>
                <div className='register-login'>
                    <Link to='/login' >log in here</Link>
                </div>
            </div>
        </>
    );
};