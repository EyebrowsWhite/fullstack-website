import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import ArticleCard from "../../components/ArticleCard";

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

const BlogList: FC = () => {
  const navigate = useNavigate();

  const { data } = useQuery(GET_BLOG_LIST);

  return (
    <div className="blog-list">
      <div className="article-list">
        {data &&
          data.getBlogList &&
          data.getBlogList.map((blog: any) => {
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
    </div>
  );
};

export default BlogList;
