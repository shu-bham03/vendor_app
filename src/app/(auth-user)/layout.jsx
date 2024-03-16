"use client";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Image, Flex, notification } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
const { Header, Sider, Content } = Layout;

export default function UserLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logoutClick = () => {
    notification.success({
      message: "Success",
      description: "Log Out Successfully",
    });
    router.push("/auth");
  };
  return (
    <Layout className="min-h-[100vh] ">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div className="flex justify-center my-5">
            <Image
              width={50}
              height={50}
              alt="logo"
              //   className="demo-logo-vertical "
              src="https://amrytt.com/wp-content/uploads/2020/06/AMRYTT_50.svg"
            />
          </div>
        ) : (
          <div class="text-transparent bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-4xl text-center my-5 font-bold">
            AMRYTT
          </div>
        )}

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="flex items-center justify-between"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            size="large"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            onClick={logoutClick}
            size="large"
            className="me-6"
            type="default"
          >
            Log Out
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
