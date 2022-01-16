import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterPannel from "../components/RegisterPannel";

const Register: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      navigate("/profile");
    }
  });
  return (
    <div className="register-page">
      <RegisterPannel />
    </div>
  );
};

export default Register;
