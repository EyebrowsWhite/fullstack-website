import { gql, useQuery } from '@apollo/client';
import { Viewer } from '@bytemd/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorPage } from '../../components/errorpage';
import { LoadingPage } from '../../components/loading';
import { Navigator } from '../../components/navigator';
import './blog.css';

const GET_BLOG = gql`
    query getBlog($id:Int!) {
        getBlog(id: $id) {
            id
            title
            content
            author
            created_time
        }
    }
`;

const Blog = () => {
    const { blogId } = useParams<{blogId:string}>();

    const { data, loading, error } = useQuery(GET_BLOG, { variables: { id: parseInt(blogId)} });
    if (loading) return <LoadingPage />;
    if (error) return <ErrorPage msg={error.message} />;

    return (
        <>
            <Navigator />
            <main className='main blog-main'>
                {data && data.getBlog &&
                    <div className='blog-box'>
                        <h1 className='blog-title'>{data.getBlog.title}</h1>
                        <p className='blog-author'>
                            <span>{data.getBlog.author}</span>
                            <span>{new Date(parseInt(data.getBlog.created_time)).toLocaleDateString()}</span>
                        </p>
                        <div className='blog-content'>
                            <Viewer value={data.getBlog.content} />
                        </div>
                    </div>
                }
            </main>
        </>
    );
}

export default Blog;