let inited = false;
import { create } from "zustand";
import { getGlobal, updateGlobal } from "@/Idb/Servers/globalService";
//链路的监听
interface ChainState {
  chainId: number; //链Id
  originTokenName: string;//代币名称
  pairAddress:string;//lp池地址
  setOriginTokenName: (originTokenName: string) => void;
  setPairAddress: (pairAddress: string) => void;
  setChainId: (chain: number) => void;
  initChainId: () => Promise<void>;
}
export const useChainStore = create<ChainState>((set, get) => ({
  chainId: 0, //链Id
  originTokenName:'-',//代币名称
  pairAddress:'-',//lp地址
  setPairAddress:async(pairAddress :string)=>{
     set({ pairAddress });
  },
  setOriginTokenName:async(originTokenName :string)=>{
     set({ originTokenName });
  },
  // ✅ 设置链 + 同步数据库
  setChainId: async (chainId: number) => {
    console.log("chainId---储存的内容", chainId);
    // 1️⃣ 更新内存状态
    set({ chainId });
    // 2️⃣ 写入 IndexedDB
    await updateGlobal(
      1, // 或者 id: "chain"
      {
        chainConfigId: chainId,
      },
    );
    console.log("chainId 已同步到 DB:", chainId);
  },
  initChainId: async () => {
    if (inited) return; // 已经初始化过
    inited = true;
    const globalData = await getGlobal(1); //默认查询BSC值
    const chainId = globalData.chainConfigId;
    if (globalData) {
      set({ chainId });
    }
  },
}));
