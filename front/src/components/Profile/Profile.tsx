import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { user } from '../../graphql';

import "./index.css";

import { message } from "antd";

export const Profile: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/login");
    }
  });

  const { data } = useQuery(user.ME);

  const logout = () => {
    localStorage.removeItem("auth");
    message.success("登出成功", 1);
    navigate("/");
    window.history.go(0);
  };
  return (
    <div className="profile">
      <h1 className="pf-title">PROFILE</h1>
      <div className="pf-content">
        <div className="pft-username">
          <span className="pft-title">username: </span>
          <input
            className="pft-content"
            disabled
            readOnly
            value={(data && data.me && data.me.username) || ""}
          />
          <span className="pft-change">change</span>
        </div>
        <div className="pft-email">
          <span className="pft-title">email: </span>
          <input
            className="pft-content"
            disabled
            readOnly
            value={(data && data.me && data.me.email) || ""}
          />
          <span className="pft-change">change</span>
        </div>
        <div className="pft-description">
          <span className="pft-title">description: </span>
          <div className="pft-content" contentEditable={false}>
            There is no discription feature yet, just for show. And you cant
            change your eamil and username for now.
            {/* <textarea
              disabled
              readOnly
              value="There is no discription feature yet, just for show. And you cant change your eamil and username for now."
            /> */}
          </div>
          <span className="pft-change">change</span>
        </div>
        <div className="pf-logout">
          <button onClick={logout}>log out</button>
        </div>
      </div>
    </div>
  );
};
