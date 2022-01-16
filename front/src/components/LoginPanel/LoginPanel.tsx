import { gql, useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./index.css";

import { Card, Form, Input, Button, Checkbox, message } from "antd";

const LOGIN_USER = gql`
    mutation Login($user:String!, $password:String!) {
        login(user:$user, password:$password) {
            id
            username
            email
            permission
            token
        }
    }
`;

export const LoginPanel:FC = () => {
  const navigate = useNavigate();

  const [ login ] = useMutation(
      LOGIN_USER,
      {
          onCompleted: ({ login }) => {
              if (login && login.token) {
                  localStorage.setItem('auth', login.token);
                  message.success("登录成功", 0.5);
                  navigate("/");
              }
          },
      }
  );

  const submitLogin = (values: any) => {
    login({
        variables:{
            user: values.username,
            password: values.password,
        },
    });
  };

  return (
    <div className="login-panel">
      <Card title="登录" extra={<Link to='/register' >注册账号</Link>} headStyle={{ fontSize: "20px" }} bodyStyle={{ paddingTop: "40px" }}>
        <Form
          name="login"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={submitLogin}
          autoComplete="off"
        >
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

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ span: 20, offset: 6 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 20, offset: 12 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
