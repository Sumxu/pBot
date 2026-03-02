//限行交易表
import { dbPromise } from "../db";
// 单个新增
export async function addRestrictiveTrading(restrictiveTrading: any) {
  const db = await dbPromise;
  return db.put("restrictiveTrading", restrictiveTrading);
}
// 查询
export async function getRestrictiveTrading(id: number) {
  const db = await dbPromise;
  return db.get("restrictiveTrading", id);
}
//修改其中某个值
export async function updateRestrictiveTrading(id: number, updateData: any) {
  const db = await dbPromise;
  const restrictiveTrading = await db.get("restrictiveTrading", id);
  if (!restrictiveTrading) return;
  const newData = {
    ...restrictiveTrading,
    ...updateData,
  };
  return db.put("restrictiveTrading", newData);
}
// addRestrictiveTrading({
//   id: 1,
//   totalBuyAmount: 0, //累计买入
//   totalSaleAmount: 0, //累计卖出
//   taskTime: 0, //任务执行时长
//   isOpenBuy: false, //是否启动买入
//   subparPriceBuy: 0, //低于价格下行购买
//   minBuyAmount: 0, //最小买入金额
//   maxBuyAmount: 0, //最大买入金额
//   onceBuyAccountNums: 0, //单次买入账号数
//   isOpenSale: false, //是否启动卖出
//   exceedPriceSale: 0, //高于价格下单卖出
//   minSalePrice: 0, //最小卖出金额
//   maxSalePrice: 0, //最大卖出金额
//   onceSaleAccountNums: 1, //单次卖出账号数
//   type: 1, //1公共路由 2隐私路由
// });
