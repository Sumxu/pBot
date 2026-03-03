import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Tabs } from "antd";
type TabPosition = "left" | "right" | "top" | "bottom";
import marketTagDataConfig from "@/config/marketTagData";
import CreatFlap from "@/components/marketIndexComponents/creatFlap";
import CreatFour from "@/components/marketIndexComponents/creatFour";
import TokenTrading from "@/components/marketIndexComponents/tokenTrading";
const MarketIndex: React.FC = () => {
  const [mode, setMode] = useState<TabPosition>("top");
  const [activeKey, setActiveKey] = useState<string>("1"); //记录当前选中的tab
  const componentMap: Record<string, React.ReactNode> = {
    "1": <CreatFour />,
    "2": <CreatFlap />,
    "3": <TokenTrading />,
  };
  return (
    <div className="marketIndexBox">
      <div className="tabsBox">
        <Tabs
          defaultActiveKey="1"
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
