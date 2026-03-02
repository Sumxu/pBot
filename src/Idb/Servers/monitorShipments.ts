//监听出货表
import { dbPromise } from "../db";
// 单个新增
export async function addMonitorShipments(monitorShipments: any) {
  const db = await dbPromise;
  return db.put("monitorShipments", monitorShipments);
}
// 查询
export async function getMonitorShipments(id: number) {
  const db = await dbPromise;
  return db.get("monitorShipments", id);
}
//修改其中某个值
export async function updateMonitorShipments(id: number, updateData: any) {
  const db = await dbPromise;
  const monitorShipments = await db.get("monitorShipments", id);
  if (!monitorShipments) return;
  const newData = {
    ...monitorShipments,
    ...updateData,
  };
  return db.put("monitorShipments", newData);
}
//创建数据表
// addMonitorShipments({
//   minTime: 12, //跟卖间隔最小时间(s秒)
//   maxTime: 12, //跟卖间隔最大时间(s秒)
//   salesRatio: 50, //跟卖比例 出货比例
//   minBuyAmount: 12, //最小买入金额阀值
//   saleAmount: 12, //出货数量
// });
