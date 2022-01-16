import React from 'react';
import './index.css';

export const ArticleCard = (
    props: {
        title:string,
        outline:string,
        author:string,
        createdTime:string,
        onClick:() => void
    }
) => {
    return (
        <div className='article-card' onClick={props.onClick}>
            <h2 className='title'>{props.title}</h2>
            <p className='outline'>{props.outline}</p>
            <p className='author'>{props.author}</p>
            <p className='publish-time'>{new Date(parseInt(props.createdTime)).toLocaleDateString().split('/').join('.')}</p>
        </div>
    );
};
