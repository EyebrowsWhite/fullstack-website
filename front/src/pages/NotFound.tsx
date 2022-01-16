import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound:FC = () => {
    return (
        <div className='not-found'>
            <h2>The page not exists</h2>
            <Link to='/'>Back To Home</Link>
        </div>
    );
};

export default NotFound;