"use client";
import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/navigation";

const validatePassword = (_, value) => {
  // Password should contain at least 8 characters, including at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!value || passwordRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(
    new Error(
      "Password must be at least 8 characters long and include at least one letter and one number."
    )
  );
};

const LoginScreen = () => {
  const router = useRouter();
  const onFinish = (values) => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center sm:p-2">
      <Form
        size="large"
        style={{ width: "30rem" }}
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
          <p className="text-gray-400">Login to your account</p>
        </div>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            className="rounded-md px-4 py-3 w-full bg-gray-600  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            className="rounded-md px-4 py-3 w-full bg-gray-600  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-white">Remember me</Checkbox>
          </Form.Item>

          <a className="text-white text-sm" href="">
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="w-full text-[1.3rem] bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md py-0  px-4 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginScreen;
