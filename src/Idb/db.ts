// db.ts
import { openDB } from "idb";

export const dbPromise = openDB("appDB", 1, {
  upgrade(db) {
    // 创建钱包表
    const walletStore = db.createObjectStore("wallet", {
      keyPath: "id", // 主键
    });
    // 创建钱包索引
    walletStore.createIndex("address", "address");
    walletStore.createIndex("tag", "tag");

    //创建全局设置表
    const globalStore = db.createObjectStore("global", {
      keyPath: "id", // 主键
    });
    //创建代币信息表
    const tokenStore = db.createObjectStore("token", {
      keyPath: "id", // 主键
    });
  },
});
