import React from 'react';
import './index.css';

export const LoadingPage = () => {
    return (
        <div className='loading-box'>
            <div className='loading-animation'>
                <div className='loading-circle'></div>
                <img className='loading-logo' src="logo.svg" alt="logo"/>
            </div>
            <p className='loading-word'>Loading</p>
        </div>
    );
}