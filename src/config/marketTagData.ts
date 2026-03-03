import { isDev } from "../utils/env";
//市值管理tag公共数据
const devData = [
  {
    label: "代币发射(Four)",
    value: "1",
  },
  {
    label: "代币发射(Flap)",
    value: "2",
  },
  {
    label: "代币交易",
    value: "3",
  },
  {
    label: "监听出货",
    value: "4",
  },
  {
    label: "钱包管理",
    value: "5",
  },
  {
    label: "自动刷量",
    value: "6",
  },
  {
    label: "自动拉盘",
    value: "7",
  },
  {
    label: "自动砸盘",
    value: "8",
  },
  {
    label: "限价交易",
    value: "9",
  },
  {
    label: "刷持有人",
    value: "10",
  },
  {
    label: "捆绑换手",
    value: "11",
  },
];
const proData = [
  {
    label: "代币发射(Four)",
    value: "1",
  },
  {
    label: "代币发射(Flap)",
    value: "2",
  },
  {
    label: "代币交易",
    value: "3",
  },
  {
    label: "监听出货",
    value: "4",
  },
  {
    label: "钱包管理",
    value: "5",
  },
  {
    label: "自动刷量",
    value: "6",
  },
  {
    label: "自动拉盘",
    value: "7",
  },
  {
    label: "自动砸盘",
    value: "8",
  },
  {
    label: "限价交易",
    value: "9",
  },
  {
    label: "刷持有人",
    value: "10",
  },
  {
    label: "捆绑换手",
    value: "11",
  },
];

// 根据环境自动导出
const marketTagDataConfig = isDev ? devData : proData;

export default marketTagDataConfig;
