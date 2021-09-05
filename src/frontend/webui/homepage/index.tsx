import React from "react"
import { Banner } from "../../components/banner";
import './index.css';
import { ArticleBlock } from "../../components/articleBlock";
import { Navigator } from "../../components/navigator";
import { DomainLink } from "../../components/domainLink";
import { gql, useQuery } from "@apollo/client";
import { LoadingPage } from "../../components/loading";
import { ErrorPage } from "../../components/errorpage";
import { useHistory } from "react-router-dom";

export const GET_BLOG_LIST = gql`
    query getBlogList {
        getBlogList{
            id
            title
            outline
            author
            created_time
        }
    }
`;

export const HomePage = () => {
    const history = useHistory();
    const {data, loading, error} = useQuery(GET_BLOG_LIST);

    if (loading) return <LoadingPage />;
    // if (error) return <ErrorPage msg={error.message} />;
    if (error) {
        console.log(error.message);
    }

    return (
        <>
        <Navigator />
        <Banner />
        <main className='homepage-main'>
            {data && data.getBlogList &&
                data.getBlogList.slice(0, 2).map((blog:any) => {
                    return <ArticleBlock
                            key={blog.id}
                            title={blog.title}
                            outline={blog.outline}
                            author={blog.author}
                            createdTime={blog.created_time}
                            onClick={() => {history.push(`/blog/${blog.id}`)}}
                            />;
                })
            }
            <DomainLink />
        </main>
        </>
    );
}