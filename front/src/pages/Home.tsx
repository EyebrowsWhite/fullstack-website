import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";

export const GET_BLOG_LIST = gql`
  query getBlogList {
    getBlogList {
      id
      title
      outline
      author
      created_time
    }
  }
`;

const Home: FC = () => {
  const navigate = useNavigate();

  const { data } = useQuery(GET_BLOG_LIST);

  return (
    <>
      <main>
        <Banner />
        <div className="article-list">
          {data &&
            data.getBlogList &&
            data.getBlogList.slice(0, 2).map((blog: any) => {
              return (
                <ArticleCard
                  key={blog.id}
                  title={blog.title}
                  outline={blog.outline}
                  author={blog.author}
                  createdTime={blog.created_time}
                  onClick={() => {
                    navigate(`/blog/${blog.id}`);
                  }}
                />
              );
            })}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
