//自动刷量表
import { dbPromise } from "../db";
// 单个新增
export async function addAutoOrder(autoOrderInfo: any) {
  const db = await dbPromise;
  return db.put("autoOrder", autoOrderInfo);
}
// 查询
export async function getAutoOrder(id: number) {
  const db = await dbPromise;
  return db.get("autoOrder", id);
}
//修改其中某个值
export async function updateAutoOrder(id: number, updateData: any) {
  const db = await dbPromise;
  const autoOrder = await db.get("autoOrder", id);
  if (!autoOrder) return;
  const newData = {
    ...autoOrder,
    ...updateData,
  };
  return db.put("autoOrder", newData);
}
// addAutoOrder({
//   id: 1,
//   type: 1, //震荡模式 2捆绑模式
//   priceLower: 1, //价格下限
//   priceTop:1,//价格上限
//   isOverstepStop:false,//是否超出停止
//   CumulativePay:1,//累计支出
//   CumulativeSale:1,//累计卖出
//   minBuyPrice:1,//最小买入金额
//   maxBuyPrice:1,//最大买入金额
//   minSaleRato:1,//最小卖出比例
//   maxSaleRato:1,//最大卖出比例
//   useWalletType:1,//1全部钱包 2选中的钱包
//   buySaleRato:1,//买入/卖出比例
//   buyTime:1,//买入间隔(秒)
//   onceBuyAccountNums:1,//单次买入账号数
//   totalTime:'',//持续时间
//   routeType:1,//1公共路由 2隐私路由                                                                                                                                                                                                                                                                                                                                                                                      
// });