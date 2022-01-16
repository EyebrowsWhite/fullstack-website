import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPanel from "../components/LoginPanel";

const Login: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      navigate("/profile");
    }
  });

  return (
    <div className="login-page">
      <LoginPanel />
    </div>
  );
};

export default Login;
