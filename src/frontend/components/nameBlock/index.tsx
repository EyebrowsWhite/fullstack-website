import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';

export const NameBlock = (
    props: {
        title:string,
        outline:string,
        author:string,
        onClick:() => void
    }
) => {
    return (
        <div className='name-block' onClick={props.onClick}>
            <h2 className='title'>{props.title}</h2>
            <p className='outline'>{props.outline}</p>
            <p className='author'>{props.author}</p>
        </div>
    );
};