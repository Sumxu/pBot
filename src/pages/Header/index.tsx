import React, { useState } from "react";
import "./index.scss";
import { Dropdown, Button, message } from "antd";
import { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import chainListData from "@/config/chainListData";
import { useChainStore } from "@/Store/chainStore";
import { useWallet } from "@/Hooks/walletHooks/wallet";
import { formatAddress } from "@/Hooks/Utils";

const HeaderPage: React.FC = () => {
  const [checkChainIndex, setCheckChainIndex] = useState<number>(0); //链路的下标
  const { account, connectWallet } = useWallet();
  const { setChainId, chainId } = useChainStore();
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.key) {
      const index = chainListData.findIndex(
        (item) => item.chainConfigId == e.key,
      );
      setChainId(chainListData[index].chainConfigId);
      setCheckChainIndex(index);
    }
  };
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const menuProps = {
    items,
    onClick: handleButtonClick,
  };
  const initData = () => {
    const newItems = chainListData.map((item, index) => ({
      label: item.label,
      key: item.chainConfigId.toString(),
      icon: <img src={item.icon} style={{ width: 16 }} />,
    }));
    setItems(newItems);
    const index = newItems.findIndex((item) => item.key == chainId);
    setCheckChainIndex(index);
  };
  const chainInfoByIndex = (index) => {
    return items[index];
  };
  const connectWalletChange = () => {
    console.log("account==", account);
    if (!account) {
      connectWallet();
    }
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
        <Button type="primary" onClick={() => connectWalletChange()}>
          {" "}
          {account ? formatAddress(account) : "连接钱包"}
        </Button>
      </div>
    </div>
  );
};

export default HeaderPage;
