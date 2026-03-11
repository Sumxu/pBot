import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Modal, Input, Form, InputNumber } from "antd";
import { useGenerateWallets } from "@/Hooks/walletHooks/useGenerateWallets";
import { addOrUpdateWallets } from "@/Idb/Servers/walletService";
import { BigNumber } from "ethers";
interface Props {
  open: boolean;
  onCancel: () => void;
  onOk: (data: { tagName: string; walletNums: number }) => void;
}
const GenerateDialog: React.FC = ({ open, onCancel, onOk }) => {
  const [tagName, setTagName] = useState<string>(""); //钱包标签名称
  const [walletNums, setWalletNums] = useState<number>(1); //生成钱包数量
  const { wallets, generateWallets, generateLoading } = useGenerateWallets(); //生成钱包
  const rpcUrl = "https://bsc-dataseed.binance.org/"; //通过rpc主网去生成对应网络的钱包地址
  const handleOk = async () => {
    const resultList = await generateWallets(walletNums, rpcUrl);
    const newList = resultList.map((item) => ({
      ...item,
      tag: tagName,
      esc20Balance: 0,
      saleOriginalTokenBalance: 0,
    }));
    console.log("生成结果:", newList);
    await addOrUpdateWallets(newList);
    onOk();
  };
  const walletNumChange = (e) => {
    setWalletNums(e);
  };
  const tagNameChange = (e) => {
    setTagName(e.target.value);
  };
  const handleCancel = () => {
    onCancel();
  };
  useEffect(() => {
    if (open == false) {
      setTagName("");
      setWalletNums(1);
    }
  }, [open]);
  return (
    <div className="generateDialog">
      <Modal
        title="生成钱包"
        open={open}
        onOk={handleOk}
        confirmLoading={generateLoading}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确认"
      >
        <div className="generateBox">
          <Form.Item
            labelCol={{ flex: "120px" }}
            label="钱包标签名称"
            className="fromItem"
          >
            <Input
              placeholder="请输入钱包标签名称"
              value={tagName}
              onChange={tagNameChange}
            />
          </Form.Item>

          <Form.Item
            labelCol={{ flex: "120px" }}
            label="生成数量"
            className="fromItem"
          >
            <InputNumber
              placeholder="请输入生成数量"
              value={walletNums}
              min={1}
              onChange={walletNumChange}
              style={{ width: "350px" }}
            />
          </Form.Item>
        </div>
      </Modal>
    </div>
  );
};
export default GenerateDialog;
