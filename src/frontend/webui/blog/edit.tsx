import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import { gql, useMutation, useQuery } from '@apollo/client';
import { LoadingPage } from '../../components/loading';
import { EditNav } from '../../components/editNav';
import { ErrorPage } from '../../components/errorpage';

import 'bytemd/dist/index.min.css';
import './edit.css';
import { CustomAlert } from '../../components/customAlert';
import { ME } from '../profile';

const CREATE_BLOG = gql`
    mutation createBlog($title: String!, $outline: String!, $content: String!, $author: String!) {
        createBlog(title: $title, outline: $outline, content: $content, author: $author) {
            id
        }
    }
`;

const BlogEditPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [alert, setAlert] = useState(false);
    const plugins = [gfm()];
    const [createBlog, { loading, error }] = useMutation(CREATE_BLOG);
    const { data } = useQuery(ME);

    if (loading) return <LoadingPage />;
    if (error) return <ErrorPage msg={error.message} />;

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await createBlog({variables: {
            title,
            outline: `${content.slice(0, 200)}......`,
            content,
            author: data && data.me && data.me.username || 'none'
        }});
        if (result && result.data && result.data.createBlog && result.data.createBlog.id) {
            setTitle('');
            setContent('');
            setAlert(true);
        }
    }

    return (
        <div className='markdown-editor'>
            {alert && <CustomAlert msg='publish success' onClick={() => setAlert(false)} />}
            <EditNav title={title} onChange={handleChange} onSubmit={handleSubmit} />
            <Editor
                value={content}
                plugins={plugins}
                onChange={(v) => {
                    setContent(v)
                }}
            />
        </div>
    );
}

export default BlogEditPage;