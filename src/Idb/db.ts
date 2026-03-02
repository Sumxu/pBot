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

    //创建代币发射表
    const tokenIssuance = db.createObjectStore("tokenIssuance", {
      keyPath: "id", // 主键
    });

    //代币交易
    const tokenTrading = db.createObjectStore("tokenTrading", {
      keyPath: "id", // 主键
    });

    //监听出货
    const monitorShipments = db.createObjectStore("monitorShipments", {
      keyPath: "id", // 主键
    });

    //钱包设置表
    const walletSetting = db.createObjectStore("walletSetting", {
      keyPath: "id", // 主键
    });
    //自动刷量
    const autoOrder = db.createObjectStore("autoOrder", {
      keyPath: "id", // 主键
    });
    //自动拉盘
    const autoReel = db.createObjectStore("autoReel", {
      keyPath: "id", // 主键
    });
    //自动砸盘
    const marketCrash = db.createObjectStore("marketCrash", {
      keyPath: "id", // 主键
    });
    //限行交易
    const restrictiveTrading = db.createObjectStore("restrictiveTrading", {
      keyPath: "id", // 主键
    });
    //刷持有人
    const holderOfTheCard = db.createObjectStore("holderOfTheCard", {
      keyPath: "id", // 主键
    });
    //捆绑换手
    const bindingChange = db.createObjectStore("bindingChange", {
      keyPath: "id", // 主键
    });
  },
});
