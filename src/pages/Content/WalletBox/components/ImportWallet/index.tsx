import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Modal, Input, Form, InputNumber } from "antd";
import { useGenerateWallets } from "@/Hooks/walletHooks/useGenerateWallets";
import { addWalletsList } from "@/Idb/Servers/walletService";
import { parseWalletInput } from "@/Hooks/Utils";
interface Props {
  open: boolean;
  onCancel: () => void;
  onOk: (data: { tagName: string; walletNums: number }) => void;
}
const ImportWallet: React.FC = ({ open, onCancel, onOk }) => {
  const { TextArea } = Input;
  const [inputWallets, setInputWallets] = useState<string>(); //钱包标签名称
  const [loading, setLoading] = useState<boolean>(false);

  const handleOk = async () => {
    setLoading(true);
    try {
      const resultList: Array = parseWalletInput(inputWallets);
      const newList = resultList.map((item) => ({
        ...item,
        esc20Balance: 0,
        saleOriginalTokenBalance: 0,
        originalTokenBalance: 0,
      }));
      console.log("生成结果:", newList);
      await addWalletsList(newList);
      onOk();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };
  useEffect(() => {
    if (open == false) {
      setInputWallets("");
    }
  }, [open]);
  return (
    <div className="importWalletPage">
      <Modal
        title="导入钱包"
        open={open}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
        className="modalBox"
        cancelText="取消"
        okText="确认"
        width="70vw"
      >
        <div className="importWalletBox">
          <TextArea
            rows={8}
            style={{ height: "50vh" }}
            placeholder="粘贴私钥，以换行分隔。可以使用,来分别设置标签名。
或者直接复制导出的csv的格式例如:
0x5515dfd410ae6................f50546ea29397e8a82d,lable1
或者
0x5515dfd410ae6................f50546ea29397e8a82d	lable2"
            value={inputWallets}
            onChange={(e) => setInputWallets(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};
export default ImportWallet;
