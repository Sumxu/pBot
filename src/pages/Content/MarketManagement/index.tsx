import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Divider, Input, Select, Button, Table, Empty } from "antd";
import MarketIndex from "./components/marketIndex";
import WalletBox from "@/pages/Content/WalletBox";
const MarketManagement: React.FC = () => {
  return (
    <div className="marketManagementBox">
      <Divider
        orientation="center"
        style={{
          fontSize: 18,
          fontWeight: 500,
        }}
        plain
      >
        市值管理
      </Divider>
      <div className="marketBox">
        <MarketIndex />
      </div>
      <Divider
        orientation="center"
        style={{
          fontSize: 18,
          fontWeight: 500,
        }}
        plain
      >
        钱包管理
      </Divider>
      <WalletBox></WalletBox>
    </div>
  );
};
export default MarketManagement;
