import { isDev } from "../utils/env";
//限价交易公共数据
const devData = {
  minBuyAmount: [0.1, 0.5, 1], //最小买入数量
  maxBuyAmount: [0.1, 0.5, 1], //最大买出数量
  onceBuyAccount: [1, 5, 10], //单次买入账号数量
  minSaleAmount: [0.1, 0.5, 1], //最小卖出数量
  maxSaleAmount: [0.1, 0.5, 1], //最大卖出数量
  onceSaleAccount: [1, 5, 10], //单次卖出账号数量
};
const proData = {
  minBuyAmount: [0.1, 0.5, 1], //最小买入数量
  maxBuyAmount: [0.1, 0.5, 1], //最大买出数量
  onceBuyAccount: [1, 5, 10], //单次买入账号数量
  minSaleAmount: [0.1, 0.5, 1], //最小卖出数量
  maxSaleAmount: [0.1, 0.5, 1], //最大卖出数量
  onceSaleAccount: [1, 5, 10], //单次卖出账号数量
};

// 根据环境自动导出
const limitOrderTradingDataConfig = isDev ? devData : proData;

export default limitOrderTradingDataConfig;
