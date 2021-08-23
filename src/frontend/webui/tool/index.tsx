import React from 'react';
import { useHistory } from 'react-router-dom';
import { NameBlock } from '../../components/nameBlock';
import { Navigator } from '../../components/navigator';
import './index.css';

export const ToolPage = () => {

    const history =useHistory();

    return (
        <>
            <Navigator />
            <main className='main'>
                <h1 className='tool-page-title'>TOOL</h1>
                <div className='tool-page-list'>
                    <NameBlock
                        title='TODO APP'
                        outline='a simple todo app using react hooks'
                        author='eyebrow'
                        onClick={()=>{history.push('/tool/todo')}}
                    />
                </div>
            </main>
        </>
    );
}