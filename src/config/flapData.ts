import { isDev } from "../utils/env";
const devData = [
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
]; //flap 代币发射税率
const proData = [
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
]; //3秒 

// 根据环境自动导出
const flapDataConfig = isDev ? devData : proData;

export default flapDataConfig;
