import React from 'react';
import './index.css';
import banner from '../../../../assets/banner/banner.jpg';

export const Banner = () => {
    return (
        <div className='banner'>
            <img className='banner-img' src={banner} alt='banner' />
        </div>
    );
};