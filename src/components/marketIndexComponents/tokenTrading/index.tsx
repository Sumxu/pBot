import React, { useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { Button, Card, Form, Input, Select, Divider, InputNumber } from "antd";
import tokenTradingData from "@/config/tokenTradingData";
import { checkOutField } from "@/Utils/marketIndexComponentsUtil/tokenTradingValidation";
import {
  getUseWalletsList,
  runSwapBot,
  runSwapRato,
  stopSwap,
} from "@/Utils/marketIndexComponentsUtil/tokenTradingWallets";
import autoRefreshConfig from "@/config/autoRefreshData";
const TokenTradingBox: React.FC = () => {
  const [minAmount, setMinAmout] = useState<number>(1); //最小买入金额
  const [maxAmount, setMaxAmount] = useState<number>(10); //最大买入金额
  const [minSaleAmount, setMinSaleAmount] = useState<number>(1); //最小卖出金额
  const [maxSaleAmount, setMaxSaleAmount] = useState<number>(10); //最大卖出金额
  const [buyRato, setBuyRato] = useState<number>(20); //买入比例0-90
  const [saleBuyRato, setSaleBuyRato] = useState<number>(); //卖出比例0-100
  const [minTimeOut, setMinTimeOut] = useState<number>(1); //最小延迟
  const [maxTimeOut, setMaxTimeOut] = useState<number>(5); //最大延迟
  const [bindWalletNums, setBindWalletNums] = useState<number>(1); //捆绑钱包数量
  const [useBuyWalletsList, setUseBuyWalletsList] = useState<Array>([]); //可使用购买钱包数组
  const [useSaleWalletsList, setUseSaleWalletsList] = useState<Array>([]); //可使用卖出钱包数组
  const [buyLoading, setBuyLoading] = useState<boolean>(false);
  const [saleLoading, setSaleLoading] = useState<boolean>(false);
  const [ratoBuyLoading, setRatoBuyLoading] = useState<boolean>(false);
  const [ratoSaleLoading, setRatoSaleLoading] = useState<boolean>(false);
  const [autoRefreshLoading, setAutoRefreshLoading] = useState<boolean>(false);
  const RouterOnChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  /**
   *
   * @param Buy 是否买和卖
   */
  const buyChange = async () => {
    setBuyLoading(true);
    const result = await checkOutField(
      1,
      {
        minAmount,
        maxAmount,
        minSaleAmount,
        maxSaleAmount,
        buyRato,
        saleBuyRato,
        minTimeOut,
        maxTimeOut,
        bindWalletNums,
      },
      useBuyWalletsList,
    );
    if (result) {
      //根据参数进行买入
      try {
        await runSwapBot({
          walletsList: useBuyWalletsList,
          bindWalletNums,
          minAmount,
          maxAmount,
          minDelay: minTimeOut,
          maxDelay: maxTimeOut,
          isBuy: true,
        });
      } catch (error) {
      } finally {
        setBuyLoading(false);
      }
    } else {
      setBuyLoading(false);
    }
  };
  /**
   * 比例买入
   */
  const buyRatoChange = async () => {
    setRatoBuyLoading(true);
    const result = await checkOutField(
      3,
      {
        minAmount,
        maxAmount,
        minSaleAmount,
        maxSaleAmount,
        buyRato,
        saleBuyRato,
        minTimeOut,
        maxTimeOut,
        bindWalletNums,
      },
      useBuyWalletsList,
    );
    if (result) {
      try {
        await runSwapRato({
          walletsList: useBuyWalletsList,
          bindWalletNums,
          ratoNum: buyRato,
          minDelay: minTimeOut,
          maxDelay: maxTimeOut,
          isBuy: true,
        });
      } catch (error) {
      } finally {
        setRatoBuyLoading(false);
      }
    } else {
      setRatoBuyLoading(false);
    }
  };
  /**
   * 卖出
   */
  const saleChange = async () => {
    setSaleLoading(true);
    const result = await checkOutField(
      2,
      {
        minAmount,
        maxAmount,
        minSaleAmount,
        maxSaleAmount,
        buyRato,
        saleBuyRato,
        minTimeOut,
        maxTimeOut,
        bindWalletNums,
      },
      useSaleWalletsList,
    );
    if (result) {
      //根据参数进行买入
      try {
        await runSwapBot({
          walletsList: useSaleWalletsList,
          bindWalletNums,
          minAmount: minSaleAmount,
          maxAmount: maxSaleAmount,
          minDelay: minTimeOut,
          maxDelay: maxTimeOut,
          isBuy: false,
        });
      } catch (error) {
      } finally {
        setSaleLoading(false);
      }
    } else {
      setSaleLoading(false);
    }
  };
  /**
   * 比例卖出
   */
  const developerSells = async () => {
    setRatoSaleLoading(true);
    const result = await checkOutField(
      4,
      {
        minAmount,
        maxAmount,
        minSaleAmount,
        maxSaleAmount,
        buyRato,
        saleBuyRato,
        minTimeOut,
        maxTimeOut,
        bindWalletNums,
      },
      useSaleWalletsList,
    );
    console.log("result==", result);
    if (result) {
      try {
        await runSwapRato({
          walletsList: useSaleWalletsList,
          bindWalletNums,
          ratoNum: saleBuyRato,
          minDelay: minTimeOut,
          maxDelay: maxTimeOut,
          isBuy: false,
        });
      } catch (error) {
      } finally {
        setRatoSaleLoading(false);
      }
    } else {
      setRatoSaleLoading(false);
    }
  };
  const initUseWalletsData = async () => {
    setAutoRefreshLoading(true);
    try {
      const useBuyWalletsList = await getUseWalletsList(true);
      const useSaleWalletsList = await getUseWalletsList(false);
      console.log("useWalletsList=可用钱包=", useBuyWalletsList);
      console.log("useWalletsList=卖掉钱包=", useSaleWalletsList);
      setUseBuyWalletsList(useBuyWalletsList);
      setUseSaleWalletsList(useSaleWalletsList);
    } catch (error) {
    } finally {
      setAutoRefreshLoading(false);
    }
  };
  useEffect(() => {
    initUseWalletsData();
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
                  onChange={(e) => setMinAmout(e)}
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
                  onChange={(e) => setMaxAmount(e)}
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
              <Form.Item label="最小卖出金额" labelCol={{ flex: "120px" }}>
                <InputNumber
                  placeholder="请输入最小卖出金额"
                  value={minSaleAmount}
                  className="inputBuy"
                  onChange={(e) => setMinSaleAmount(e)}
                />
              </Form.Item>
              <div className="btnListOption">
                {tokenTradingData.minSaleAmount.map((item) => {
                  return (
                    <Button
                      className="btnRight12"
                      onClick={() => setMinSaleAmount(item)}
                    >
                      {item}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="fromOption">
              <Form.Item label="最大卖出金额" labelCol={{ flex: "120px" }}>
                <InputNumber
                  placeholder="请输入最大卖出金额"
                  value={maxSaleAmount}
                  className="inputBuy"
                  onChange={(e) => setMaxSaleAmount(e)}
                />
              </Form.Item>
              <div className="btnListOption">
                {tokenTradingData.maxSaleAmount.map((item) => {
                  return (
                    <Button
                      className="btnRight12"
                      onClick={() => setMaxSaleAmount(item)}
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
                  onChange={(e) => setBuyRato(e)}
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
                  onChange={(e) => setSaleBuyRato(e)}
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
                <InputNumber
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
            可使用购买的钱包数量:{useBuyWalletsList.length} /
            可使用卖出的钱包数量:{useSaleWalletsList.length}{" "}
            <Button
              type="primary"
              loading={autoRefreshLoading}
              onClick={() => initUseWalletsData()}
              className="btnMargin"
            >
              刷新
            </Button>
          </Divider>
          <div className="contentOption">
            <div className="fromOption">
              <Form.Item
                labelCol={{ flex: "200px" }}
                label="捆绑钱包(最大可捆绑50钱包)"
              >
                <InputNumber
                  value={bindWalletNums}
                  max={50}
                  onChange={(e) => setBindWalletNums(e)}
                  placeholder="请输入捆绑数量"
                  className="inputAuto"
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
                <Button
                  type="primary"
                  loading={buyLoading}
                  onClick={() => buyChange()}
                >
                  买入
                </Button>
                <Button
                  type="primary"
                  loading={ratoBuyLoading}
                  onClick={() => buyRatoChange()}
                  className="btnMargin"
                >
                  比例买入
                </Button>
                <Button
                  type="primary"
                  danger
                  loading={saleLoading}
                  className="btnMargin"
                  onClick={() => saleChange()}
                >
                  卖出
                </Button>
                <Button
                  type="primary"
                  danger
                  loading={ratoSaleLoading}
                  className="btnMargin"
                  onClick={() => developerSells()}
                >
                  比例卖出
                </Button>
              </div>
            </div>
          </div>
           <div className="contentOption">
            <div className="fromOption">
              <div className="btnBox">
                <Button type="primary" onClick={() => stopSwap()}>
                  停止买入
                </Button>
              </div>
            </div>
          </div>
          <div className="contentOption">
            <div className="fromOption">
              <div className="btnBox">
                <Button type="primary" danger onClick={() => stopSwap()}>
                  停止卖出
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default TokenTradingBox;
