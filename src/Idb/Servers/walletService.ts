//钱包列表管理表
import { dbPromise } from "../db";
// 单个新增
export async function addWallet(walletInfo: any) {
  const db = await dbPromise;
  return db.put("wallet", walletInfo);
}
/**
 * 批量新增或修改钱包数据
 * @param list 数组，每个元素是钱包对象，必须包含唯一 id 或 key
 */
export async function addOrUpdateWallets(list: any[]) {
  if (!Array.isArray(list) || list.length === 0) return;

  try {
    const db = await dbPromise;
    const tx = db.transaction("wallet", "readwrite");
    const store = tx.objectStore("wallet");

    for (const item of list) {
      // put 会新增或覆盖已有记录
      store.put(item);
    }

    await tx.done; // 等待事务完成
    console.log(`成功写入/更新 ${list.length} 条钱包数据`);
  } catch (err) {
    console.error("批量写入钱包失败：", err);
  }
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
/**
 *
 * @param ids 批量删除
 */
export async function deleteWalletsByIds(ids: number[]) {
  const db = await dbPromise;

  const tx = db.transaction("wallet", "readwrite");
  const store = tx.objectStore("wallet");

  ids.forEach((id) => {
    store.delete(id);
  });

  await tx.done; // 等待事务完成
}
/**
 * 删除所有的数据
 */
export async function deleteAllWallets() {
  const db = await dbPromise;

  const tx = db.transaction("wallet", "readwrite");
  const store = tx.objectStore("wallet");

  store.clear(); // 清空整个表

  await tx.done;
}
//分页查询
export async function getWalletPage(page: number, pageSize: number) {
  const db = await dbPromise;
  const tx = db.transaction("wallet", "readonly");
  const store = tx.objectStore("wallet");
  let skip = (page - 1) * pageSize;
  let result: any[] = [];
  let cursor = await store.openCursor(null, "prev");
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
export async function getAllWallet() {
  const db = await dbPromise;
  const tx = db.transaction("wallet");
  const store = tx.objectStore("wallet");
  const result: any[] = [];
  let cursor = await store.openCursor(null, "prev"); // prev = 倒序
  while (cursor) {
    result.push(cursor.value);
    cursor = await cursor.continue();
  }

  return result;
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
