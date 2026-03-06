import React from "react";
import { Layout, Flex, Spin } from "antd";
const { Header, Sider, Content } = Layout;
import "./index.scss";
import { useEffect } from "react";
import HeaderPage from "@/pages/Header/index";
import SilderBox from "@/pages/Content/Sider";
import MarketManagement from "@/pages/Content/MarketManagement";
import { useChainStore } from "@/Store/chainStore";
import { useInitApp } from "@/Hooks/useInitApp";
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
  const { loading } = useInitApp();
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="系统初始化中..." />
      </div>
    );
  }

  return (
    <Layout style={layoutStyle}>
      <div className="headerTop">
        <Header style={headerStyle}>
          <HeaderPage />
        </Header>
      </div>

      <Layout>
        <Sider width="40%" style={siderStyle}>
          <SilderBox />
        </Sider>

        <Content style={contentStyle}>
          <MarketManagement />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
