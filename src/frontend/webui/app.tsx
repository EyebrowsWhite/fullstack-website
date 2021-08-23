import { ApolloClient, NormalizedCacheObject, ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './homepage';
import { LoginPage } from './login';
import { RegisterPage } from './register';
import { cache } from '../cache';
import { ProfilePage } from './profile';
import { BlogPage } from './blog';
import { ToolPage } from './tool';
import { BlogEditPage } from './blog/edit';
import { ComponentPage } from './tool/component';
import { Blog } from './blog/blog';

import './app.css';

const client:ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: cache,
    uri: `http://localhost:4000/graphql`,
    headers: {
        authorization: localStorage.getItem('auth') || '',
    },
});

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const App = () => {
    return (
        <Router>
            <Switch>
                <Redirect from='/home' to='/' />
                <Route exact path='/'>
                    <HomePage />
                </Route>
                <Route exact path='/blog'>
                    <BlogPage />
                </Route>
                <Route path='/blog/:blogId'>
                    <Blog />
                </Route>
                <Route path='/edit'>
                    <BlogEditPage />
                </Route>
                <Route exact path='/tool'>
                    <ToolPage />
                </Route>
                <Route path='/tool/:component'>
                    <ComponentPage />
                </Route>
                <Route path='/profile'>
                    <ProfilePage />
                </Route>
                <Route path='/login'>
                    <LoginPage />
                </Route>
                <Route path='/register'>
                    <RegisterPage />
                </Route>
            </Switch>
        </Router>
    );
};

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    root
);