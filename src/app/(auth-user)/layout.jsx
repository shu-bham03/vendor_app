"use client";

import {
  ForwardFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Image,
  Flex,
  notification,
  Grid,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;

const { useBreakpoint } = Grid;

export default function UserLayout({ children }) {
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (
      (screens.xs || screens.sm || screens.md) &&
      (!screens.lg || !screens.xl)
    ) {
      setCollapsed(true);
    }
  }, [screens]);

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
            className="text-[1.3rem] me-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md py-0  px-4 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            size="large"
            icon={<ForwardFilled />}
            type="primary"
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
