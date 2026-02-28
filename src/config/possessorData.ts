import { isDev } from "../utils/env";
//刷持有人公共数据
const devData = {
  possessorNums: [100, 200, 300], //新增持有人数量
  buyAmount: [0.000001, 0.000005], //购买代币数量
};
const proData = {};

// 根据环境自动导出
const possessorDataConfig = isDev ? devData : proData;

export default possessorDataConfig;
