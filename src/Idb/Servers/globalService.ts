// userService.ts
import { dbPromise } from "../db";

// 单个新增
export async function addGlobal(globalInfo: any) {
  const db = await dbPromise;
  return db.put("global", globalInfo);
}
// 查询
export async function getGlobal(id: number) {
  const db = await dbPromise;
  return db.get("global", id);
}
//修改其中某个值
export async function updateGlobal(id: number, updateData: any) {
  const db = await dbPromise;
  const global = await db.get("global", id);
  if (!global) return;
  const newData = {
    ...global,
    ...updateData,
  };
  return db.put("global", newData);
}