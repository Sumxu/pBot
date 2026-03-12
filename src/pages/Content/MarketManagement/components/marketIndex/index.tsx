import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Tabs } from "antd";
type TabPosition = "left" | "right" | "top" | "bottom";
import marketTagDataConfig from "@/config/marketTagData";
import CreatFlap from "@/components/marketIndexComponents/creatFlap";
import CreatFour from "@/components/marketIndexComponents/creatFour";
import TokenTrading from "@/components/marketIndexComponents/tokenTrading";
import MonitorShipments from "@/components/marketIndexComponents/monitorShipments";
import WalletSettingsBox from "@/components/marketIndexComponents/walletSettings";
import AutoOrder from "@/components/marketIndexComponents/autoOrder";
import AutoPullingPlate from "@/components/marketIndexComponents/autoPullingPlate";
import AutoMarketCrash from "@/components/marketIndexComponents/autoMarketCrash";
import LimitedPrice from "@/components/marketIndexComponents/limitedPrice";
import Possessor from "@/components/marketIndexComponents/possessor";
import BindChange from "@/components/marketIndexComponents/bindChange";

const MarketIndex: React.FC = () => {
  const [mode, setMode] = useState<TabPosition>("top");
  const [activeKey, setActiveKey] = useState<string>("3"); //记录当前选中的tab
  const componentMap: Record<string, React.ReactNode> = {
    "1": <CreatFour />,
    "2": <CreatFlap />,
    "3": <TokenTrading />,
    "4": <MonitorShipments />,
    "5": <WalletSettingsBox />,
    "6": <AutoOrder />,
    "7": <AutoPullingPlate />,
    "8": <AutoMarketCrash />,
    "9": <LimitedPrice />,
    "10": <Possessor />,
    "11": <BindChange />,
  };
  return (
    <div className="marketIndexBox">
      <div className="tabsBox">
        <Tabs
          defaultActiveKey="3"
          tabPosition={mode}
          items={marketTagDataConfig.map((item, i) => ({
            label: item.label,
            key: String(item.value),
          }))}
          onChange={(key) => {
            setActiveKey(key);
          }}
        ></Tabs>
        <div>{componentMap[activeKey]}</div>
      </div>
    </div>
  );
};
export default MarketIndex;
