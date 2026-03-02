import React from "react";
import { Layout, Flex } from "antd";
const { Header, Sider, Content } = Layout;
import "./index.scss";
import { useEffect } from "react";
import HeaderPage from "@/pages/Header/index";
import SilderBox from '@/pages/Content/Sider'
const MainLayout: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: "#fff",
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
  };

  const siderStyle: React.CSSProperties = {
    backgroundColor: "#fff",
  };

  const layoutStyle: React.CSSProperties = {
    width: "100vw",
    maxWidth: "100vw",
    minHeight: "100vh",
    backgroundColor: "#fff",
  };
  useEffect(() => {}, []);
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <div className="headerTop">
          <Header style={headerStyle}>
            <HeaderPage></HeaderPage>
          </Header>
        </div>
        <Layout>
          <Sider width="40%" style={siderStyle}>
            <SilderBox />
          </Sider>
          <Content style={contentStyle}>Content</Content>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default MainLayout;
