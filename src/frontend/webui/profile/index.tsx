import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorPage } from '../../components/errorpage';
import { LoadingPage } from '../../components/loading';
import { Navigator } from '../../components/navigator';
import './index.css';

export const ME = gql`
    query Me {
        me {
            id
            username
            email
            permission
        }
    }
`;

export const ProfilePage = () => {
    const history = useHistory();
    const {data, loading, error} = useQuery(
        ME,
    );

    if (loading) return <LoadingPage />;
    if (error) return <ErrorPage msg={error.message} />;
    if (!data) {
        history.push('/');
    }

    const logout = () => {
        localStorage.removeItem('auth');
        history.push('/');
        history.go(0);
    }
    return (
        <>
            <Navigator />
            <main className='main'>
                <h1 className='profile-title'>PROFILE</h1>
                <div className='profile-content'>
                    <div className='profile-content-username'>
                        <span className='profile-content-title'>username: </span>
                        <input className='profile-content-content' disabled readOnly value={ data && data.me && data.me.username || '' } />
                        <span className='profile-content-change'>change</span>
                    </div>
                    <div className='profile-content-email'>
                        <span className='profile-content-title'>email: </span>
                        <input className='profile-content-content' disabled readOnly value={ data && data.me && data.me.email || '' } />
                        <span className='profile-content-change'>change</span>
                    </div>
                    <div className='profile-content-description'>
                        <span className='profile-content-title'>description: </span>
                        <textarea disabled readOnly className='profile-content-content' value='There is no discription feature yet, just for show. And you cant change your eamil and username for now.'/>
                        <span className='profile-content-change'>change</span>
                    </div>
                    <div className='profile-logout'>
                        <button onClick={logout}>log out</button>
                    </div>
                </div>
            </main>
        </>
    );
}