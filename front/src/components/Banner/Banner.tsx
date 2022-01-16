import React from 'react';
import { Image } from 'antd';
import './index.css';
import banner from '../../../assets/img/banner.webp';

export const Banner = () => {
    return (
        <div className='banner'>
            <Image
                className='banner-img'
                src={banner}
                alt='banner'
                height='340px'
                width='100%'
                preview={false}
                placeholder={<h1>IMG</h1>}
            />
        </div>
    );
};