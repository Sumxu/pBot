//自动砸盘表
import { dbPromise } from "../db";
// 单个新增
export async function addMarketCrash(marketCrashInfo: any) {
  const db = await dbPromise;
  return db.put("marketCrash", marketCrashInfo);
}
// 查询
export async function getMarketCrash(id: number) {
  const db = await dbPromise;
  return db.get("marketCrash", id);
}
//修改其中某个值
export async function updateMarketCrash(id: number, updateData: any) {
  const db = await dbPromise;
  const marketCrash = await db.get("marketCrash", id);
  if (!marketCrash) return;
  const newData = {
    ...marketCrash,
    ...updateData,
  };
  return db.put("marketCrash", newData);
}
// addMarketCrash({
//   id: 1,
//   targetPriceRato: 20, //目标价格百分比
//   minBuyPrice: 1, //最小买入金额
//   maxBuyPrice: 1, //最大买入金额
//   buyTime: 12, //买入间隔(秒)
//   onceBuyAccountNums: 1, //单次买入账号数
//   totalOriginalToken: 1, //累计花费多少原生代币
//   taskTime: 12, //任务执行时长(秒)
//   type: 1, //1公共路由 2隐私路由
//   expectedMarketCrash:1,//预计砸盘时长(分钟)
//   expectedOnceAccountNums:1,//预期单批账号数
//   saleRato:12,//卖出百分比
// });
