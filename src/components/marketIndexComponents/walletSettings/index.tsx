import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Button, Card, Form, Input, Select, Divider } from "antd";
const WalletSettingsBox: React.FC = () => {
  const [tagList, setTagList] = useState([
    {
      label: "全部",
      value: "1",
    },
  ]); //钱包标签

  const [tokenOriginType, setTokenOriginType] = useState([
    {
      label: "原生代币",
      value: "1",
    },
     {
      label: "ERC20代币",
      value: "2",
    },
  ]); //钱包标签
  return (
    <div className="walletSettingsBox">
      <Card bodyStyle={{ padding: 14 }}>
        <div className="walletSettingBox">
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            快速比例
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <div className="btnListOption">
                <Button className="btnRight12">25%</Button>
                <Button className="btnRight12">50%</Button>
                <Button className="btnRight12">75%</Button>
                <Button className="btnRight12">100%</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="walletSettingBox">
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            资金钱包设置 <Button type="primary">隐匿发送(0)</Button>
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="选择资金钱包"
                className="fromItem"
              >
                <Select
                  placeholder="选择钱包标签"
                  style={{ width: "370px" }}
                  options={tagList}
                />
              </Form.Item>
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="最小分发"
                className="fromItem"
              >
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item labelCol={{ flex: "120px" }} label="最大分发">
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item labelCol={{ flex: "120px" }} label="gas设置">
                <Input placeholder="请输入" />
              </Form.Item>
            </div>
          </div>
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            归集钱包设置 <Button type="primary">隐匿归集(0)</Button>
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="选择归集钱包"
                className="fromItem"
              >
                <Select
                  placeholder="选择归集主钱包"
                  style={{ width: "370px" }}
                  options={tagList}
                />
              </Form.Item>
              <Form.Item
                labelCol={{ flex: "120px" }}
                label="归集比例(%)"
                className="fromItem"
              >
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item labelCol={{ flex: "120px" }} label="gas设置">
                <Input placeholder="请输入" />
              </Form.Item>
            </div>
          </div>

          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            代币类型 <Select
                  placeholder="选择"
                  defaultValue={'1'}
                  style={{ width: "120px" }}
                  options={tokenOriginType}
                />
          </Divider>
          <div className="contentOption">
            <Button type="primary">多对多创建钱包并隐匿分发全部余额(0)</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default WalletSettingsBox;
