import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Button, Card, Form, Input, Select, Divider } from "antd";
const TokenTradingBox: React.FC = () => {
  const RouterOnChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="tokenTradingBox">
      <Card bodyStyle={{ padding: 14 }}>
        <div className="tokenTradingsBox">
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            交易金额
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item label="最小买入金额" labelCol={{ flex: "120px" }}>
                <Input placeholder="请输入最小买入金额" className="inputBuy" />
              </Form.Item>
              <div className="btnListOption">
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
              </div>
            </div>

            <div className="fromOption">
              <Form.Item label="最大买入金额" labelCol={{ flex: "120px" }}>
                <Input placeholder="请输入最大买入金额" className="inputBuy" />
              </Form.Item>
              <div className="btnListOption">
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
              </div>
            </div>
          </div>

          <div className="contentOption">
            <div className="fromOption">
              <Form.Item labelCol={{ flex: "120px" }} label="买入比例(0-90)">
                <Input placeholder="请输入买入比例" className="inputBuy" />
              </Form.Item>
              <div className="btnListOption">
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
              </div>
            </div>

            <div className="fromOption">
              <Form.Item label="卖出比例(0-100)" labelCol={{ flex: "120px" }}>
                <Input placeholder="请输入卖出比例" className="inputBuy" />
              </Form.Item>
              <div className="btnListOption">
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
                <Button className="btnRight12">123</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="tokenTradingsBox">
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            延迟设置
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item labelCol={{ flex: "120px" }} label="最小延迟(s)">
                <Input placeholder="请输入最小延迟" className="inputAuto" />
              </Form.Item>
            </div>
            <div className="fromOption">
              <Form.Item labelCol={{ flex: "120px" }} label="最大延迟(s)">
                <Input placeholder="请输入最大延迟" className="inputAuto" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="tokenTradingsBox">
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            捆绑钱包数量
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item labelCol={{ flex: "120px" }} label="捆绑钱包">
                <Input placeholder="请输入捆绑数量" className="inputAuto" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="tokenTradingsBox">
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            路由设置
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item labelCol={{ flex: "120px" }} label="路由">
                <Select
                  defaultValue="1"
                  className="selectOption"
                  onChange={RouterOnChange}
                  options={[
                    { value: "1", label: <span>公共路由</span> },
                    { value: "2", label: <span>隐私路由</span> },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="tokenTradingsBox">
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 0,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            操作
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <div className="btnBox">
                <Button type="primary">买入(0)</Button>
                <Button type="primary" className="btnMargin">
                  比例买入(0)
                </Button>
                <Button type="primary" danger className="btnMargin">
                  买入卖出(0)
                </Button>
                <Button type="primary" danger className="btnMargin">
                  开发者卖出(0)
                </Button>
                <Button type="primary">跑路</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default TokenTradingBox;
