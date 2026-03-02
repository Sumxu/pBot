//刷持有人表
import { dbPromise } from "../db";
// 单个新增
export async function addHolderOfTheCard(holderOfTheCard: any) {
  const db = await dbPromise;
  return db.put("holderOfTheCard", holderOfTheCard);
}
// 查询
export async function getHolderOfTheCard(id: number) {
  const db = await dbPromise;
  return db.get("holderOfTheCard", id);
}
//修改其中某个值
export async function updateHolderOfTheCard(id: number, updateData: any) {
  const db = await dbPromise;
  const holderOfTheCard = await db.get("holderOfTheCard", id);
  if (!holderOfTheCard) return;
  const newData = {
    ...holderOfTheCard,
    ...updateData,
  };
  return db.put("holderOfTheCard", newData);
}
// addHolderOfTheCard({
//   id: 1,
//   gasPayWallets: "", //gas支付钱包
//   buyOriginalToken: 1, //原生代币
//   holderNumber: 1, //持有人数量
// });
