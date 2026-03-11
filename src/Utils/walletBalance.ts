import chainListData from "@/config/chainListData";
import { multiCall } from "@/Utils/multiCallUtils";
import { findChainById, findListData } from "@/Utils/chainListDataUtils";
import { getAllWallet, addOrUpdateWallets } from "@/Idb/Servers/walletService";
import { fromWei, toWei } from "@/Hooks/Utils";
import { useChainStore } from "@/Store/chainStore";
import { useOriginTokenInfoStore } from "@/Store/originTokenInfoStore";
let pairAddress: string = "";
let chainId: number = 0;
const walletAddressList = async () => {
  const walletsData = await getAllWallet();
  return walletsData;
};
/**
 *
 * @param originTokenValue 代币名称
 * 通过代币去查询每个地址的余额然后汇总
 * 原生代币单独查询
 * esc20需要abi查询
 */
export const totalWalletBalance = async (originTokenValue) => {
  chainId = useChainStore.getState().chainId; //链id
  pairAddress = useChainStore.getState().pairAddress; //链id
  const chainData = findChainById(chainId);
  console.log("chainId==", chainId);
  console.log("chainData==", chainData);
  const findTokenData = findListData(
    chainData?.baseToken,
    "label",
    originTokenValue,
  );
  console.log("chainListData", chainListData);
  //数据库查询所有的钱包地址
  const walletList = await walletAddressList();
  console.log("originTokenValue==", originTokenValue);
  console.log("walletList==", walletList);
  console.log("tokenAddfindTokenData.addressress==", findTokenData.address);
  if (originTokenValue == "BNB") {
    //原生代币查询
  } else {
    //esc20查询
    await originTokenBalance(chainData, findTokenData.address, walletList);
  }
};
const originTokenBalance = async (chainData, tokenAddress, walletList) => {
  const originTokenInfo = useOriginTokenInfoStore.getState().tokenInfo; //lp地址
  console.log("pairAddress==", pairAddress);
  //解析
  try {
    const originTokenCalls = walletList.map((walletItem) => ({
      address: tokenAddress,
      abi: chainData.erc20,
      method: "balanceOf",
      params: [walletItem.address], // balanceOf 的参数就是钱包地址
    }));
    let tokenCalls = [];
    let tokenResult = [];

    const originTokenResult = await multiCall(
      chainData?.rpcUrl,
      chainData.multiCallAddress,
      originTokenCalls,
    );
    if (pairAddress != "-") {
      tokenCalls = walletList.map((walletItem) => ({
        address: pairAddress,
        abi: chainData.erc20,
        method: "balanceOf",
        params: [walletItem.address], // balanceOf 的参数就是钱包地址
      }));
      tokenResult = await multiCall(
        chainData?.rpcUrl,
        chainData.multiCallAddress,
        tokenCalls,
      );
    }
    walletList.map((walletItem, index) => {
      walletItem.originalTokenBalance = fromWei(originTokenResult[index]);
      if (pairAddress != "-") {
        walletItem.esc20Balance = fromWei(tokenResult[index]);
        //如果存在代币价格则进行计算
        if (originTokenInfo?.tokenPrice) {
          walletItem.saleOriginalTokenBalance =
            originTokenInfo?.tokenPrice * Number(fromWei(tokenResult[index]));
        }
      }
    });
    console.log("walletList==", walletList);
    //地址持有usdt数量
    const walletOriginTokenTotalAmount = walletList.reduce(
      (total, wallet) => Number(total) + Number(wallet.originalTokenBalance),
      0,
    );
    //地址持有代币数量
    const walletTokenTotalAmount = walletList.reduce(
      (total, wallet) => Number(total) + Number(wallet.esc20Balance),
      0,
    );
    //地址可掏池子基础代币数量
    const putableTokenAmount =
      Number(walletTokenTotalAmount) * Number(originTokenInfo.tokenPrice);
    const walletTokenRato =
      (walletTokenTotalAmount / Number(originTokenInfo.tokenAmount)) * 100;
    console.log("可掏池子基础代币数量==", putableTokenAmount);
    console.log("持有代币数量==", walletTokenTotalAmount);
    console.log("统计持有usdt数量==", walletOriginTokenTotalAmount);
    console.log("统计持有代币比例==", walletTokenRato);
    console.log("统计持有代币比例=tokenAmount=", originTokenInfo.tokenAmount);
    //地址持有代币比例
    await addOrUpdateWallets(walletList);
    useOriginTokenInfoStore.getState().setTokenInfo({
       putableTokenAmount,
       walletTokenTotalAmount,
       walletOriginTokenTotalAmount,
       walletTokenRato,
    });
  } catch (error) {
    throw new Error("查询地址余额错误", error);
  }
};
