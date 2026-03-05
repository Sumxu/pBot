// hooks/useInitApp.ts
import { useEffect, useState } from "react";
import { dbPromise } from "@/Idb/db";
import { addGlobal } from "@/Idb/Servers/globalService";
import chainConfig from "@/config/chainListData.ts";
export const useInitApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const db = await dbPromise; // 👈 这里就是调用 db.ts
      console.log("数据库已打开");
      console.log("1=-",chainConfig)
      // 初始化默认 chain
      await addGlobal({
        id: 1,
        chainId:chainConfig[0].chainId,
        rpc: chainConfig[0].rpcUrl, //rpc地址
        contractAddress: "", //合约地址
        baseToken: "1", //基础代币
        pool: "1", //池子
        gasPrice: "1", //gas价格
        briberyPrice: "1", //贿赂价格
      });
      setLoading(false);
    };

    init();
  }, []);

  return { loading };
};
