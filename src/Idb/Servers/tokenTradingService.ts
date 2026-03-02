//代币交易表
import { dbPromise } from "../db";
// 单个新增
export async function addTokenTrading(tokenTradingInfo: any) {
  const db = await dbPromise;
  return db.put("tokenTradingInfo", tokenTradingInfo);
}
// 查询
export async function getTokenTradingInfo(id: number) {
  const db = await dbPromise;
  return db.get("tokenTradingInfo", id);
}
//修改其中某个值
export async function updateTokenTradingInfo(id: number, updateData: any) {
  const db = await dbPromise;
  const tokenTradingInfo = await db.get("tokenTradingInfo", id);
  if (!tokenTradingInfo) return;
  const newData = {
    ...tokenTradingInfo,
    ...updateData,
  };
  return db.put("tokenTradingInfo", newData);
}
//代币交易信息
// await addTokenTrading({
//   id: 1,
//   minBuyAmount: 1,
//   maxBuyAmount: 2,
//   buyRatio: 20, //买入比例
//   saleRatio: 30, //卖出比例
//   minDelay: 1, //最小延迟
//   maxDelay: 1, //最大延迟
//   type: 1, //1公共路由 2隐私路由
//   bindingNums: 1, //捆绑数量
// });