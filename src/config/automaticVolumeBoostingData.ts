import { isDev } from "../utils/env";
//自动刷量公共数据
const devData = {
  minBuyAmount: [0.1, 0.5, 1], //最小买入数量
  maxBuyAmount: [0.1, 0.5, 1], //最小买入数量
  minSaleProportion: [25, 50, 100], //最小卖出比例
  maxSaleProportion: [25, 50, 100], //最大卖出比例
  buySellRation: [
    {
      label: "50/50",
      value: 50,
    },
    {
      label: "75/25",
      value: 25,
    },
  ], //买入/卖出比例
  buyInterval: [1, 5, 10], //买入间隔(秒)
  onceBuyAccountNums: [1, 5, 10], //单次买入账号数量
  times: [
    {
      label: "1分钟",
      value: 600000,
    },
    {
      label: "5分钟",
      value: 3000000,
    },
    {
      label: "10分钟",
      value: 6000000,
    },
  ], //持续时间(秒)
};
const proData = {
  minBuyAmount: [0.1, 0.5, 1], //最小买入数量
  maxBuyAmount: [0.1, 0.5, 1], //最小买入数量
  minSaleProportion: [25, 50, 100], //最小卖出比例
  maxSaleProportion: [25, 50, 100], //最大卖出比例
  buySellRation: [
    {
      label: "50/50",
      value: 50,
    },
    {
      label: "75/25",
      value: 25,
    },
  ], //买入/卖出比例
  buyInterval: [1, 5, 10], //买入间隔(秒)
  onceBuyAccountNums: [1, 5, 10], //单次买入账号数量
  times: [
    {
      label: "1分钟",
      value: 600000,
    },
    {
      label: "5分钟",
      value: 3000000,
    },
    {
      label: "10分钟",
      value: 6000000,
    },
  ], //持续时间(秒)
};

// 根据环境自动导出
const automaticVolumeBoostingDataConfig = isDev ? devData : proData;

export default automaticVolumeBoostingDataConfig;
