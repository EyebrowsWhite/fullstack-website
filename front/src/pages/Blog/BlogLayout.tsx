import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const BlogLayout: FC = () => {

  return (
    <div className="blog-layout">
      <Outlet />
    </div>
  );
};

export default BlogLayout;
