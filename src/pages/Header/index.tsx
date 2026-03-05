import React, { useState } from "react";
import "./index.scss";
import { Dropdown, Button, message } from "antd";
import { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import bscIcon from "@/assets/chainListIcon/bsc.svg";
import type { MenuProps } from "antd";
import chainListData from "@/config/chainListData";
import { useChainStore } from "@/Store/chainStore";
const HeaderPage: React.FC = () => {
  const [checkChainIndex, setCheckChainIndex] = useState<number>(0);
  const { setChainId, chainId } = useChainStore();
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("e==handleButtonClick=", e.key, chainListData);
    let index = e.key;
    console.log("e==handleButtonClick=", chainListData[index].chainId);
    setChainId(chainListData[index].chainId);
    setCheckChainIndex(e.key);
  };
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const menuProps = {
    items,
    onClick: handleButtonClick,
  };
  const initData = () => {
    const newItems = chainListData.map((item, index) => ({
      label: item.label,
      key: item.chainId.toString(),
      icon: <img src={item.icon} style={{ width: 16 }} />,
    }));
    setItems(newItems);
    console.log("newItems==",newItems)
    const index = newItems.findIndex((item) => item.key === chainId);
    console.log("index=1=",index)
    setCheckChainIndex(index);
  };
  const chainInfoByIndex = (index) => {
    return items[index];
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="headerBox">
      <div className="option">
        <Dropdown.Button
          menu={menuProps}
          onClick={handleButtonClick}
          icon={<DownOutlined />}
        >
          {items?.length > 0 && (
            <div className="chainBox">
              {chainInfoByIndex(checkChainIndex).icon}
              <span className="spn">
                {chainInfoByIndex(checkChainIndex).label}
              </span>
            </div>
          )}
        </Dropdown.Button>
      </div>
      <div className="option">
        <Button type="primary">链接钱包</Button>
      </div>
    </div>
  );
};

export default HeaderPage;
