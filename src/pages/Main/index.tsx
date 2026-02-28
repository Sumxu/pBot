import React from "react";
import { Layout, Flex } from "antd";
const { Header, Sider, Content } = Layout;
import {
  addWallet,
  getAllWallet,
  getWalletByAddress,
  getByTag,
  getWalletPage,
  getWalletTotal,
} from "@/Idb/Servers/walletService";

import {
  addGlobal,
  getGlobal,
  updateGlobal,
} from "@/Idb/Servers/globalService";

import { addToken, getToken, updateToken } from "@/Idb/Servers/tokenService";
import { useEffect } from "react";
const MainLayout: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    height: 64,
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
  useEffect(() => {
    async function init() {
      await addGlobal({
        id: 1,
        rpc: "123", //rpc地址
        contractAddress: "测试", //合约地址
        baseToken: "1", //基础代币
        pool: "1", //池子
        gasPrice: "1", //gas价格
        briberyPrice: "1", //贿赂价格
      });
      const globalInfo = await getGlobal(1);
      console.log("globalInfo==", globalInfo);
      await updateGlobal(1, {
        gasPrice: "2",
      });
      const globalInfos = await getGlobal(1);
      console.log("globalInfos==", globalInfos);
      await addToken({
        id: 1,
        refreshTime: "1", //刷新时间
        esc20TokenPrice: "12", //代币价格
        poolOriginalTokenBalance: "12", //池子原始代币余额
        withdrawOriginalTokenAmount: "12", //可掏池子原始代币数量
        externalWithdrawOriginalTokenAmount: "12", //外部可掏池子
        possessOriginalTokenAmount: "12", //持有原始代币数量
        esc20TokenAmount: "12", //持有代币数量
        esc20TokenProportion: "12", //持有代币比例
        tokenizationOfThePool: "12", //池子代币占比
      });
      const tokenInfo = await getToken(1);
      console.log("tokenInfo==", tokenInfo);
      await updateToken(1, {
        tokenizationOfThePool: "32",
      });
      const tokenInfos = await getToken(1);
      console.log("tokenInfos==", tokenInfos);
    }
    init();
  }, []);
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Sider width="35%" style={siderStyle}>
            Sider
          </Sider>
          <Content style={contentStyle}>Content</Content>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default MainLayout;
