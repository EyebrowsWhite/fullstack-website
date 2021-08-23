import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export const ErrorPage = (
    props:{
        msg:string
    }
) => {
    return (
        <div className='error-box'>
            <div className='error-message'>
                <p>There seems to be some error</p>
                <p>{props.msg}</p>
            </div>
            <Link className='error-home' to='/'>Back To Home</Link>
        </div>
    );
}