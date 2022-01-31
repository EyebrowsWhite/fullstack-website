import React, { FC } from "react";
import {useNavigate} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";
import NavMenu from "../NavMenu";
import "./index.css";
import websiteLogo from "../../../assets/img/logo.svg";

export const Header: FC = () => {
  const navigate = useNavigate();

  const navToUser = () => {
    navigate("/login");
  };
  const navToHome = () => {
    navigate("/");
  };

  return (
    <header>
        <div className="website-logo" onClick={navToHome}>
          <img src={websiteLogo} alt="logo" />
        </div>
        <NavMenu />
        <div className="header-user" onClick={navToUser}>
            <UserOutlined />
        </div>
    </header>
  );
};
