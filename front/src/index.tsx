import React, { FC } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import { cache } from "./cache";

import "./index.css";

import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import BlogList from "./pages/Blog/BlogList";
import Blog from "./pages/Blog/Blog";
import BlogLayout from "./pages/Blog/BlogLayout";
import BlogEditor from "./pages/Blog/BlogEditor";
import Tool from "./pages/Tool";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: cache,
  uri: `http://localhost:${process.env['BACKEND_PORT'] || '9998'}/graphql`,
  headers: {
    authorization: localStorage.getItem("auth") || "",
  },
});

const App: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="blog" element={<BlogLayout />}>
            <Route index element={<BlogList />} />
            <Route path=":blogId" element={<Blog />} />
            <Route path="edit" element={<BlogEditor />} />
          </Route>
          <Route path="tool" element={<Tool />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  root
);
