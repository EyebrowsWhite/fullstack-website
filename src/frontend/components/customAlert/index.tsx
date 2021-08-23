import React from 'react';
import './index.css';

export const CustomAlert = (
    props: {
        msg:string,
        onClick:() => void
    }
) => {
    return (
        <div className='alert-box'>
            <div className='alert-message'>
                <p>{props.msg}</p>
            </div>
            <button className='alert-button' onClick={props.onClick}>X</button>
        </div>
    );
}