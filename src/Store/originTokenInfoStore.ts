import { create } from "zustand";
//代币信息的监听
interface TokenInfo {
  tokenRato: number; //池子占比
  tokenPrice: number; //代币价格
  originTokenAmount: number; //原始代币价格
  tokenAmount: number; //池子的代币数量
  putableTokenAmount: number; //地址可掏基础代币数量
  walletTokenTotalAmount: number; //钱包持有代币数量
  walletOriginTokenTotalAmount: number; //钱包持有基础代币数量
  walletTokenRato: number; //钱包持有基础代币比例
  externalOriginAmount: number; //外部可掏池子
  totalSupplyAmount:number;//池子的代币总数量
}
interface OriginTokenInfoStore {
  tokenInfo: TokenInfo;
  setTokenInfo: (data: Partial<TokenInfo>) => void;
}

export const useOriginTokenInfoStore = create<OriginTokenInfoStore>((set) => ({
  tokenInfo: {
    tokenRato: 0,
    tokenPrice: 0,
    originTokenAmount: 0,
    tokenAmount: 0,
    putableTokenAmount: 0,
    walletTokenTotalAmount: 0,
    walletOriginTokenTotalAmount: 0,
    walletTokenRato: 0,
    externalOriginAmount: 0,
    totalSupplyAmount:0,
  },
  setTokenInfo: (data) =>
    set((state) => ({
      tokenInfo: {
        ...state.tokenInfo,
        ...data,
      },
    })),
}));
