//代币发射表
import { dbPromise } from "../db";

// 单个新增
export async function addTokenIssuance(tokenIssuanceInfo: any) {
  const db = await dbPromise;
  return db.put("tokenIssuance", tokenIssuanceInfo);
}
// 查询
export async function getTokenIssuance(id: number) {
  const db = await dbPromise;
  return db.get("tokenIssuance", id);
}
//修改其中某个值
export async function updateTokenIssuance(id: number, updateData: any) {
  const db = await dbPromise;
  const tokenIssuance = await db.get("tokenIssuance", id);
  if (!tokenIssuance) return;
  const newData = {
    ...tokenIssuance,
    ...updateData,
  };
  return db.put("tokenIssuance", newData);
}
//代币创建信息
// await addTokenIssuance({
//   id: 1, //1代表four平台 2flap平台 3Nad
//   contractAddress: "", //合约地址
//   tokenName: "测试", //代币名称
//   tokenSymbol: "", //代币符号
//   tokenDesc: "", //代币描述
//   tokenIcon: "", //代币头像
//   webSite: "", //社交字符串
//   twitter: "", //社交字符串
//   telegram: "", //社交字符串
//   devWalletAddress: "", //钱包地址
//   buyAmount: "", //购买的数量
//   bindingWalletAddress: "", //捆绑钱包
//   isRandom: false, //是否范围随机
//   minbindingAmount: 0, //最小捆绑数量
//   maxbindingAmount: 0, //最大捆绑数量
//   totalBuyAmount: 0, //总买入金额
//   taxRate: "1", //税率 id为2有
//   isRatePlus: false, //是否高级税收
//   fundsAcceptance: "", //资金接受钱包比例
//   destroy: "", //销毁比例
//   dividend: "", //分红(持有者奖励)
//   mobility: "", //流动性(增加流动性)
//   minDividend: "", //分红资格最低余额分红
//   walletAddress: "", //接受钱包地址,留空默认为dev地址
// });