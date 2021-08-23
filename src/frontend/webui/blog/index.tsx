import { useQuery } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArticleBlock } from '../../components/articleBlock';
import { ErrorPage } from '../../components/errorpage';
import { LoadingPage } from '../../components/loading';
import { Navigator } from '../../components/navigator';
import { GET_BLOG_LIST } from '../homepage';
import { ME } from '../profile';
import './index.css';

export const BlogPage = () => {
    const history = useHistory();
    const { data } = useQuery(ME);
    const permission = data && data.me && data.me.permission;

    const { data:blogs, loading, error } = useQuery(GET_BLOG_LIST);

    if (loading) return <LoadingPage />;
    if (error) return <ErrorPage msg={error.message} />;

    const handleClick = () => {
        history.push('/edit');
    };

    return (
        <>
            <Navigator />
            <main className='main'>
                <h1 className='blog-page-title'>BLOG</h1>
                {permission === 'SUPERADMIN'
                    &&
                    <button className="blog-create-button" type='button' onClick={handleClick}>create a new blog</button>
                }
                <div className='blog-page-list'>
                    {blogs && blogs.getBlogList &&
                        blogs.getBlogList.map((blog:any) => {
                            return <div className='article-block-box' key={blog.id}>
                                     <ArticleBlock
                                        title={blog.title}
                                        outline={blog.outline}
                                        author={blog.author}
                                        createdTime={blog.created_time}
                                        onClick={() => {history.push(`/blog/${blog.id}`)}}
                                    />
                                </div>;
                    })}
                </div>
            </main>
        </>
    );
}