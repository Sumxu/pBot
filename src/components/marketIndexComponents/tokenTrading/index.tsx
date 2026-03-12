import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Button, Card, Form, Input, Select, Divider, InputNumber } from "antd";
import tokenTradingData from "@/config/tokenTradingData";
const TokenTradingBox: React.FC = () => {
  const [minAmount, setMinAmout] = useState<number>(); //最小买入金额
  const [maxAmount, setMaxAmount] = useState<number>(); //最大买入金额
  const [buyRato, setBuyRato] = useState<number>(); //买入比例0-90
  const [saleBuyRato, setSaleBuyRato] = useState<number>(); //卖出比例0-100
  const [minTimeOut, setMinTimeOut] = useState<number>(); //最小延迟
  const [maxTimeOut, setMaxTimeOut] = useState<number>(); //最大延迟
  const [bindWalletNums, setBindWalletNums] = useState<number>(); //捆绑钱包数量
  const RouterOnChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  /**
   * 买入
   */
  const buyChange=()=>{
    
  }
  /**
   * 比例买入
   */
  const buyRatoChange=()=>{

  }
  /**
   * 买入卖出
   */
  const saleChange=()=>{

  }
  /**
   * 开发者卖出
   */
  const developerSells=()=>{
    
  }
  /**
   * 跑路 就是全部卖掉
   */
  const allSaleChange=()=>{

  }
  useEffect(() => {
    console.log("tokenTradingData=", tokenTradingData);
  }, []);
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
                <InputNumber
                  placeholder="请输入最小买入金额"
                  value={minAmount}
                  className="inputBuy"
                  onChange={(e) => setMinAmout(e.target.value)}
                />
              </Form.Item>
              <div className="btnListOption">
                {tokenTradingData.minBuyAmount.map((item) => {
                  return (
                    <Button
                      className="btnRight12"
                      onClick={() => setMinAmout(item)}
                    >
                      {item}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="fromOption">
              <Form.Item label="最大买入金额" labelCol={{ flex: "120px" }}>
                <InputNumber
                  placeholder="请输入最大买入金额"
                  value={maxAmount}
                  className="inputBuy"
                />
              </Form.Item>
              <div className="btnListOption">
                {tokenTradingData.maxBuyAmount.map((item) => {
                  return (
                    <Button
                      className="btnRight12"
                      onClick={() => setMaxAmount(item)}
                    >
                      {item}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="contentOption">
            <div className="fromOption">
              <Form.Item labelCol={{ flex: "120px" }} label="买入比例(0-90)">
                <InputNumber
                  placeholder="请输入买入比例"
                  value={buyRato}
                  min={0}
                  max={90}
                  onChange={(e) => setBuyRato(e.target.value)}
                  className="inputBuy"
                />
              </Form.Item>
              <div className="btnListOption">
                {tokenTradingData.buyProportion.map((item) => {
                  return (
                    <Button
                      className="btnRight12"
                      onClick={() => setBuyRato(item)}
                    >
                      {item}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="fromOption">
              <Form.Item label="卖出比例(0-100)" labelCol={{ flex: "120px" }}>
                <InputNumber
                  min={0}
                  max={100}
                  placeholder="请输入卖出比例"
                  value={saleBuyRato}
                  className="inputBuy"
                  onChange={(e) => saleBuyRato(e.target.value)}
                />
              </Form.Item>
              <div className="btnListOption">
                {tokenTradingData.saleRatio.map((item) => {
                  return (
                    <Button
                      className="btnRight12"
                      onClick={() => setSaleBuyRato(item)}
                    >
                      {item}
                    </Button>
                  );
                })}
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
                <InputNumber
                  placeholder="请输入最小延迟"
                  className="inputAuto"
                  value={minTimeOut}
                  onChange={(e) => setMinTimeOut(e)}
                />
              </Form.Item>
            </div>
            <div className="fromOption">
              <Form.Item labelCol={{ flex: "120px" }} label="最大延迟(s)">
                <Input
                  placeholder="请输入最大延迟"
                  value={maxTimeOut}
                  className="inputAuto"
                  onChange={(e) => setMaxTimeOut(e)}
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
            捆绑钱包数量
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item labelCol={{ flex: "120px" }} label="捆绑钱包">
                <InputNumber 
                value={bindWalletNums}
                onChange={(e)=>setBindWalletNums(e)}
                placeholder="请输入捆绑数量" className="inputAuto" />
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
                <Button type="primary" onClick={()=>buyChange()}>买入(0)</Button>
                <Button type="primary" onClick={()=>buyRatoChange()} className="btnMargin">
                  比例买入(0)
                </Button>
                <Button type="primary" danger className="btnMargin" onClick={()=>saleChange()}>
                  买入卖出(0)
                </Button>
                <Button type="primary" danger className="btnMargin" onClick={()=>developerSells()}>
                  开发者卖出(0)
                </Button>
                <Button type="primary" onClick={()=>allSaleChange()}>跑路</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default TokenTradingBox;
