import React from 'react';
import { useParams } from 'react-router-dom';
import { NameBlock } from '../../components/nameBlock';
import { Navigator } from '../../components/navigator';
import { ToDo } from '../../components/todo';
import './index.css';

export const ComponentPage = () => {
    const { component } = useParams<{component:string}>();
    const isTodo = component === 'todo';

    return (
        <>
            <Navigator />
            <main className='main'>
                {isTodo &&
                    <ToDo />}
            </main>
        </>
    );
}