//自动拉盘表
import { dbPromise } from "../db";
// 单个新增
export async function addAutoReel(autoReelInfo: any) {
  const db = await dbPromise;
  return db.put("autoReel", autoReelInfo);
}
// 查询
export async function getAutoOrder(id: number) {
  const db = await dbPromise;
  return db.get("autoReel", id);
}
//修改其中某个值
export async function updateAutoReel(id: number, updateData: any) {
  const db = await dbPromise;
  const autoReel = await db.get("autoReel", id);
  if (!autoReel) return;
  const newData = {
    ...autoReel,
    ...updateData,
  };
  return db.put("autoReel", newData);
}
// addAutoReel({
//   id: 1,
//   targetPriceRato: 20, //目标价格百分比
//   minBuyPrice: 1, //最小买入金额
//   maxBuyPrice: 1, //最大买入金额
//   buyTime: 12, //买入间隔(秒)
//   onceBuyAccountNums: 1, //单次买入账号数
//   totalOriginalToken:1,//累计花费多少原生代币
//   taskTime: 12, //任务执行时长(秒)
//   type: 1, //1公共路由 2隐私路由
//   shockType: false, //是否开启震荡上行
//   totalBuyAmount: 0, //累计买入代币
//   totalSaleAmount: 0, //累计卖出代币
//   retracementTotal: 1, //回撤轮次
//   retracementRate: 1, //回撤比例
//   retracementNums: 1, //回撤次数
//   retracementTime: 1, //回撤时间(秒)
//   retracementWalletNums: 1, //回撤钱包数量
//   expectedPullback: 1, //预期拉盘时间
//   expectedPullbackType: 1, //1分钟 2秒
//   expectedPullbackOnceWallet: 12, //预期单批账号数
//   costOriginalToken:12,//预估花费多少原始代币
// });
