import { isDev } from "../utils/env";
//代币发射flap公共数据
const devData = {
  taxRate: [
    {
      label: "1%",
      value: 1.0,
      inputValue: "1.0%",
    },
    {
      label: "3%",
      value: 3.0,
      inputValue: "3.0%",
    },
    {
      label: "5%",
      value: 5.0,
      inputValue: "5.0%",
    },
    {
      label: "10%",
      value: 10.0,
      inputValue: "10.0%",
    },
  ],
  moneyWallet: [
    {
      label: "10%",
      value: 10,
    },
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
  ], //资金接受钱包
  destroyRate: [
    {
      label: "0%",
      value: 0,
    },
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
  ], //销毁(减少供应量)
  dividendRate: [
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
    {
      label: "75%",
      value: 75,
    },
  ], //分红(持有者奖励)
  liquidity: [
    {
      label: "0%",
      value: 0,
    },
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
  ], //流动性(增加流动性)
};
const proData = {
  taxRate: [
    {
      label: "1%",
      value: 1.0,
      inputValue: "1.0%",
    },
    {
      label: "3%",
      value: 3.0,
      inputValue: "3.0%",
    },
    {
      label: "5%",
      value: 5.0,
      inputValue: "5.0%",
    },
    {
      label: "10%",
      value: 10.0,
      inputValue: "10.0%",
    },
  ],
  moneyWallet: [
    {
      label: "10%",
      value: 10,
    },
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
  ], //资金接受钱包
  destroyRate: [
    {
      label: "0%",
      value: 0,
    },
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
  ], //销毁(减少供应量)
  dividendRate: [
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
    {
      label: "75%",
      value: 75,
    },
  ], //分红(持有者奖励)
  liquidity: [
    {
      label: "0%",
      value: 0,
    },
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
  ], //流动性(增加流动性)
  minDividendAmount: [
    {
      label: "10k",
      value: 10000,
    },
    {
      label: "50k",
      value: 500000,
    },
    {
      label: "100k",
      value: 100000,
    },
  ], //分红资格最低余额(代币)
};
// 根据环境自动导出
const flapDataConfig = isDev ? devData : proData;

export default flapDataConfig;
