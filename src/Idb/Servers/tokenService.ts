import { dbPromise } from "../db";
//代币信息表
// 单个新增
export async function addToken(globalInfo: any) {
  const db = await dbPromise;
  return db.put("token", globalInfo);
}
// 查询
export async function getToken(id: number) {
  const db = await dbPromise;
  return db.get("token", id);
}
//修改其中某个值
export async function updateToken(id: number, updateData: any) {
  const db = await dbPromise;
  const global = await db.get("token", id);
  if (!global) return;
  const newData = {
    ...global,
    ...updateData,
  };
  return db.put("token", newData);
}
// await addToken({
//   id: 1,
//   refreshTime: "1", //刷新时间
//   esc20TokenPrice: "12", //代币价格
//   poolOriginalTokenBalance: "12", //池子原始代币余额
//   withdrawOriginalTokenAmount: "12", //可掏池子原始代币数量
//   externalWithdrawOriginalTokenAmount: "12", //外部可掏池子
//   possessOriginalTokenAmount: "12", //持有原始代币数量
//   esc20TokenAmount: "12", //持有代币数量
//   esc20TokenProportion: "12", //持有代币比例
//   tokenizationOfThePool: "12", //池子代币占比
// });
