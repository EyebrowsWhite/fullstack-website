import React, { ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css';

export const EditNav = (
    props: {
        title:string,
        onChange:(e:ChangeEvent<HTMLInputElement>) => void;
        onSubmit:(e:FormEvent<HTMLFormElement>) => void;
    }
) => {
    return (
        <div className='edit-nav'>
            <Link to='/' className='home'>Home</Link>
            <form className='edit-form' onSubmit={props.onSubmit}>
                <input className='edit-title' type="text" placeholder='Please input your title here' value={props.title} onChange={props.onChange} autoFocus required/>
                <button className='edit-publish' type='submit'>Publish</button>
            </form>
        </div>
    );
};