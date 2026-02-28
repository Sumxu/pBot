import { isDev } from "../utils/env";
//自动砸盘公共数据
const devData = {
  minSaleAmount: [0.1, 0.5, 1], //最小卖出数量
  maxSaleAmount: [0.1, 0.5, 1], //最大卖出数量
  saleInterval: [
    {
      label: "1",
      value: 1,
    },
    {
      label: "5",
      value: 5,
    },
    {
      label: "10",
      value: 10,
    },
  ], //卖出间隔(秒)
  onceSaleAccountNums: [1, 5, 10], //单次卖出账号数
  taskTime: [
    {
      label: "1分钟",
      value: 60,
    },
    {
      label: "5分钟",
      value: 300,
    },
    {
      label: "10分钟",
      value: 600,
    },
  ], //任务执行时长(秒)
  marketCrash: [
    {
      label: "5m",
      value: 5,
    },
    {
      label: "10m",
      value: 10,
    },
    {
      label: "30m",
      value: 40,
    },
  ], //预期砸盘时长(分钟)
  onceAccountNums: [1, 5, 10], //预期单批账号数
};
const proData = {};

// 根据环境自动导出
const automaticMarketCrashDataConfig = isDev ? devData : proData;

export default automaticMarketCrashDataConfig;
