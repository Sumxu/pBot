import { isDev } from "../utils/env";
//监听出货公共数据
const devData = {
  shipmentRatio: [25, 50.75, 100, 200], //出货比例
  minBuyAmount: [
    {
      label: "无限制",
      value: 0,
    },
    {
      label: "0.1",
      value: 0.1,
    },
    {
      label: "1",
      value: 1,
    },
  ], //最小买入金额阀值
};
const proData = {
  shipmentRatio: [25, 50.75, 100, 200], //出货比例
  minBuyAmount: [
    {
      label: "无限制",
      value: 0,
    },
    {
      label: "0.1",
      value: 0.1,
    },
    {
      label: "1",
      value: 1,
    },
  ], //最小买入金额阀值
};

// 根据环境自动导出
const monitorShipmentsDataConfig = isDev ? devData : proData;

export default monitorShipmentsDataConfig;
