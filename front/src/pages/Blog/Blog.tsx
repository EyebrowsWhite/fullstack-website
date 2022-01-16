import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Viewer from "../../components/TEditor/Viewer";
import "@toast-ui/editor/dist/toastui-editor.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

const GET_BLOG = gql`
  query getBlog($id: Int!) {
    getBlog(id: $id) {
      id
      title
      content
      author
      created_time
    }
  }
`;

const Blog: FC = () => {
  const { blogId } = useParams();

  const { data } = useQuery(GET_BLOG, {
    variables: { id: parseInt(blogId || "") },
  });

  return (
    <div
      className="blog"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="blog-content" style={{ width: "50vw", minWidth: "500px" }}>
        {data && data.getBlog && (
          <div className="blog-box">
            <h1 className="blog-title">{data.getBlog.title}</h1>
            <p className="blog-author">
              <span>{data.getBlog.author}</span>
              <span>
                {new Date(
                  parseInt(data.getBlog.created_time)
                ).toLocaleDateString()}
              </span>
            </p>
            <div className="blog-content">
              <Viewer
                initialValue={data.getBlog.content}
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
