import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ME } from '../../webui/profile';
import './index.css';

export const Navigator = () => {
    const history = useHistory();
    const { data } = useQuery(ME);

    const handleClick = (e:any) => {
        e.preventDefault();
        switch (e.target.className as string) {
            case 'nav-blog':
                history.push('/blog');
                break;
            case 'nav-tool':
                history.push('/tool');
                break;
            default:
                throw new Error('wrong click');
        }
    };

    return (
        <div className='nav'>
            <Link to='/' className='home'>Home</Link>
            <ul className='selection'>
                <li className='nav-blog' onClick={handleClick}>Blog</li>
                <li className='nav-tool'onClick={handleClick}>Tool</li>
                <li>X X</li>
                <li>X X</li>
            </ul>
            <Link to={data && data.me ? '/profile' : '/login'} className='login'>{data && data.me && data.me.username ? data.me.username : 'log in'}</Link>
        </div>
    );
};