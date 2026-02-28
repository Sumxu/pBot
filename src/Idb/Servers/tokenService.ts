// userService.ts
import { dbPromise } from "../db";

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
