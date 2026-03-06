import { useState } from "react";
import { BigNumber, ethers } from "ethers";

export interface WalletInfo {
  address: string;
  privateKey: string;
  originalTokenBalance?: string;
}

export const useGenerateWallets = () => {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [generateLoading, setGenerateLoading] = useState(false);

  /**
   * 生成钱包
   * @param count 生成数量
   */
  const generateWallets = async (
    count: number,
    rpcUrl: string,
  ): Promise<WalletInfo[]> => {
    setGenerateLoading(true);
    try {
      const list: WalletInfo[] = [];

      // 创建 provider 用于查余额
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      for (let i = 0; i < count; i++) {
        // 随机生成钱包
        const wallet = ethers.Wallet.createRandom();

        // 查询原生代币余额
        const balanceBigNumber = await provider.getBalance(wallet.address);

        list.push({
          address: wallet.address,
          privateKey: wallet.privateKey,
          originalTokenBalance: 0,
        });
      }
      setWallets(list);
      return list;
    } catch (error) {
      console.error("生成钱包失败:", error);
      return [];
    } finally {
      setGenerateLoading(false);
    }
  };

  return {
    wallets,
    generateLoading,
    generateWallets,
  };
};
