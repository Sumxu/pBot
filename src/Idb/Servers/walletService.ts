// userService.ts
import { dbPromise } from "../db";

// 单个新增
export async function addWallet(walletInfo: any) {
  const db = await dbPromise;
  return db.put("wallet", walletInfo);
}
//多个新增
export async function addWalletsList(list: any[]) {
  const db = await dbPromise;
  const tx = db.transaction("wallet", "readwrite");
  const store = tx.objectStore("wallet");
  for (const item of list) {
    store.put(item);
  }
  await tx.done; // 等待事务完成
}
// 查询
export async function getWallet(id: number) {
  const db = await dbPromise;
  return db.get("wallet", id);
}

// 删除
export async function deleteWallet(id: number) {
  const db = await dbPromise;
  return db.delete("wallet", id);
}
//分页查询
export async function getWalletPage(page: number, pageSize: number) {
  const db = await dbPromise;
  const tx = db.transaction("wallet", "readonly");
  const store = tx.objectStore("wallet");
  let skip = (page - 1) * pageSize;
  let result: any[] = [];
  let cursor = await store.openCursor();
  while (cursor) {
    if (skip > 0) {
      skip--;
    } else if (result.length < pageSize) {
      result.push(cursor.value);
    } else {
      break;
    }
    cursor = await cursor.continue();
  }
  return result;
}
//查询钱包地址的总数
export async function getWalletTotal() {
  const db = await dbPromise;
  return db.count("wallet");
}
// 获取全部
export async function getAllWallet() {
  const db = await dbPromise;
  return db.getAll("wallet");
}
// 根据地址索引查对应的数据
export async function getWalletByAddress(address: string) {
  const db = await dbPromise;
  const index = db.transaction("wallet").store.index("address");
  return index.get(address);
}
// 根据tag查询对应的数据
export async function getByTag(tag) {
  const db = await dbPromise;
  return db.getAllFromIndex("wallet", "tag", tag);
}
