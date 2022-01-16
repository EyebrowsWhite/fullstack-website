import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { sleep } from "../../utils/sleep";
import { isEmail } from "../../utils/isEmail";

import "./index.css";

import { Card, Form, Input, Button, message } from "antd";

const SEND_VERIFY_CODE = gql`
  mutation SendVerifyCode($email: String!) {
    sendVerifyCode(email: $email)
  }
`;

const REGISTER_USER = gql`
  mutation Register(
    $email: String!
    $username: String!
    $password: String!
    $verifyCode: String!
  ) {
    register(
      email: $email
      username: $username
      password: $password
      verifyCode: $verifyCode
    ) {
      id
      username
      email
    }
  }
`;

export const RegisterPannel: FC = () => {
  const [email, setEmail] = useState("");
  const [send, setSend] = useState(false);
  const [time, setTime] = useState(60);
  const navigate = useNavigate();

  const [sendVerifyCode] = useMutation(SEND_VERIFY_CODE);

  const [register] = useMutation(REGISTER_USER, {
    onCompleted: async ({ register }) => {
      if (register && register.username) {
        message.success("注册成功, 1s后跳转", 1);
        await sleep(1000);
        navigate("/login");
      }
    },
  });

  const handleChange = (changedValues: any) => {
    if (changedValues.email) {
      setEmail(changedValues.email);
    }
  };

  const sendVerify = (e: any) => {
    console.log("send:", email);
    e.preventDefault();
    if (isEmail(email)) {
      sendVerifyCode({
        variables: {
          email,
        },
      });
      e.target.disabled = true;
      setSend(true);
      let num = 60;
      const timer = setInterval(() => {
        num--;
        setTime(num);
        if (num == 0) {
          clearInterval(timer);
          setSend(false);
          e.target.disabled = false;
          setTime(60);
        }
      }, 1000);
    } else {
      message.warning("请检查您的邮箱!");
    }
  };

  const submitRegister = (values: any) => {
    register({
      variables: {
        email: values.email,
        username: values.username,
        password: values.password,
        verifyCode: values.verify,
      },
    });
  };
  return (
    <div className="register-panel">
      <Card
        title="注册"
        extra={<Link to="/login">登录账号</Link>}
        headStyle={{ fontSize: "20px" }}
      >
        <Form
          name="login"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={submitRegister}
          onValuesChange={handleChange}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: "请输入您的邮箱!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入您的用户名!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入您的密码!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="验证码">
            <Input.Group compact>
              <Form.Item
                name="verify"
                noStyle
                rules={[{ required: true, message: "请输入您的验证码!" }]}
              >
                <Input style={{ width: "calc(100% - 63.8px)" }} />
              </Form.Item>
              <Form.Item noStyle>
                <Button
                  value="small"
                  disabled={send ? true : false}
                  onClick={sendVerify}
                >
                  {send ? `${time}` : "发送"}
                </Button>
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 20 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
