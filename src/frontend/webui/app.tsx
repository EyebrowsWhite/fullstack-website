import { ApolloClient, NormalizedCacheObject, ApolloProvider } from '@apollo/client';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { cache } from '../cache';
import { HomePage } from './homepage';
import { LoadingPage } from '../components/loading';

import './app.css';

const BlogPage = React.lazy(() => import('./blog'));
const Blog = React.lazy(() => import ('./blog/blog'));
const BlogEditPage = React.lazy(() => import ('./blog/edit'));
const ToolPage = React.lazy(() => import ('./tool'));
const ComponentPage = React.lazy(() => import ('./tool/component'));
const ProfilePage = React.lazy(() => import ('./profile'));
const LoginPage = React.lazy(() => import ('./login'));
const RegisterPage = React.lazy(() => import ('./register'));

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
        <Suspense  fallback={<LoadingPage />}>
            <App />
        </Suspense>
    </ApolloProvider>,
    root
);