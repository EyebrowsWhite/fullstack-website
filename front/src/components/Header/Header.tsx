import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import "./index.css";

export const Header: FC = () => {
  const [current, setCurrent] = useState("home");
  const handleSelect = (e: any) => {
    setCurrent(e.key);
  };
  return (
    <header>
      <Menu
        style={{ background: "rgba(151, 151, 151, 0.66)" }}
        onClick={handleSelect}
        selectedKeys={[current]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="home">
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="blog">
          <NavLink to="/blog">Blog</NavLink>
        </Menu.Item>
        <Menu.Item key="tool">
          <NavLink to="/tool">Tool</NavLink>
        </Menu.Item>
        <Menu.Item key="login" icon={<LoginOutlined />}>
          <NavLink to="/login">Login</NavLink>
        </Menu.Item>
        <Menu.Item key="profile">
          <NavLink to="/profile">Profile</NavLink>
        </Menu.Item>
      </Menu>
    </header>
  );
};
