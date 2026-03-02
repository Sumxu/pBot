//捆绑换手表
import { dbPromise } from "../db";
// 单个新增
export async function addBindingChange(bindingChange: any) {
  const db = await dbPromise;
  return db.put("bindingChange", bindingChange);
}
// 查询
export async function getBindingChange(id: number) {
  const db = await dbPromise;
  return db.get("bindingChange", id);
}
//修改其中某个值
export async function updateBindingChange(id: number, updateData: any) {
  const db = await dbPromise;
  const bindingChange = await db.get("bindingChange", id);
  if (!bindingChange) return;
  const newData = {
    ...bindingChange,
    ...updateData,
  };
  return db.put("bindingChange", newData);
}
// addBindingChange({
//   id: 1,
//   walletAddress:'',//主钱包
//   saleAddress:'',//卖出
//   type:1,//1快速选择 2自定义输入
//   rato:20,//输入的比例
//   saleAmount:1,//卖出的代币
// });
