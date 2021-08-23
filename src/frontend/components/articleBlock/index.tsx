import { Viewer } from '@bytemd/react';
import React from 'react';
import './index.css';

export const ArticleBlock = (
    props: {
        title:string,
        outline:string,
        author:string,
        createdTime:string,
        onClick:() => void
    }
) => {
    return (
        <div className='article-block'>
            <h2 className='title' onClick={props.onClick}>{props.title}</h2>
            <Viewer value={props.outline} />
            <p className='author'>{props.author}</p>
            <p className='publish-time'>{new Date(parseInt(props.createdTime)).toLocaleDateString()}</p>
        </div>
    );
};