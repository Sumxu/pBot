import { isDev } from "../utils/env";
//自动拉盘公共数据
const devData = {
  minBuyAmount: [0.1, 0.5, 1], //最小买入数量
  maxBuyAmount: [0.1, 0.5, 1], //最小买入数量
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
  ], //任务执行时长(秒)
  expectTime: [5, 10, 30], //预期拉盘时长
  expectTimeType: [
    {
      label: "秒",
      key: "s",
      value: 1000,
    },
    {
      label: "分钟",
      key: "m",
      value: 600000,
    },
  ], //秒和分钟类型 直接乘就好了
  onceAccountNums: [1, 5, 10], //预期单批账号数
  recoveryRatio: [10, 20, 30], //回撤比例
  recoveryNums: [3, 5, 10], //回撤次数
  RecoveryTimes: [
    {
      label: "5s",
      value: 50000,
    },
    {
      label: "10s",
      value: 100000,
    },
    {
      label: "30s",
      value: 300000,
    },
  ], //回撤执行时间(秒)
  RecoveryWalletNums: [1, 3, 5], //回撤钱包数量
};
const proData = {
  minBuyAmount: [0.1, 0.5, 1], //最小买入数量
  maxBuyAmount: [0.1, 0.5, 1], //最小买入数量
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
  ], //任务执行时长(秒)
  expectTime: [5, 10, 30], //预期拉盘时长
  expectTimeType: [
    {
      label: "秒",
      key: "s",
      value: 1000,
    },
    {
      label: "分钟",
      key: "m",
      value: 600000,
    },
  ], //秒和分钟类型 直接乘就好了
  onceAccountNums: [1, 5, 10], //预期单批账号数
  recoveryRatio: [10, 20, 30], //回撤比例
  recoveryNums: [3, 5, 10], //回撤次数
  RecoveryTimes: [
    {
      label: "5s",
      value: 50000,
    },
    {
      label: "10s",
      value: 100000,
    },
    {
      label: "30s",
      value: 300000,
    },
  ], //回撤执行时间(秒)
  RecoveryWalletNums: [1, 3, 5], //回撤钱包数量
};

// 根据环境自动导出
const automaticReelDataConfig = isDev ? devData : proData;

export default automaticReelDataConfig;
