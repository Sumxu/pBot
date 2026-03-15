import chainListData from "@/config/chainListData";
import { multiCall } from "@/Utils/multiCallUtils";
import { findChainById, findListData } from "@/Utils/chainListDataUtils";
import { getAllWallet, addOrUpdateWallets } from "@/Idb/Servers/walletService";
import { fromWei, toWei } from "@/Hooks/Utils";
import { useChainStore } from "@/Store/chainStore";
import { useOriginTokenInfoStore } from "@/Store/originTokenInfoStore";
const burnAddress1 = "0x000000000000000000000000000000000000dEaD"; //销毁地址
const burnAddress2 = "0x0000000000000000000000000000000000000000"; //销毁地址
let pairAddress: string = "";
let searchAddress: string = "";
let chainId: number = 0;
export const walletAddressList = async () => {
  const walletsData = await getAllWallet();
  return walletsData;
};
export const originTokensBalance = async (
  chainData,
  tokenAddress,
  walletList,
) => {
  const originTokenCalls = walletList.map((walletItem) => ({
    address: chainData.multiCallAddress,
    abi: chainData.multiCallAbi,
    method: "getEthBalance",
    params: [walletItem.address], // balanceOf 的参数就是钱包地址
  }));
  const ethBalanceResult = await multiCall(
    chainData?.rpcUrl,
    chainData.multiCallAddress,
    originTokenCalls,
  );
  await walletDataTotal(chainData, walletList, ethBalanceResult, tokenAddress);
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
  searchAddress = useChainStore.getState().searchAddress; //链id
  const chainData = findChainById(chainId);
  const findTokenData = findListData(
    chainData?.baseToken,
    "label",
    originTokenValue,
  );
  //数据库查询所有的钱包地址
  const walletList = await walletAddressList();
  if (originTokenValue == "BNB") {
    //原生代币查询
    await originTokensBalance(chainData, findTokenData.address, walletList);
  } else {
    //esc20查询
    await tokensBalance(chainData, findTokenData.address, walletList);
  }
};
//esc20查询
const tokensBalance = async (chainData, tokenAddress, walletList) => {
  //解析
  try {
    const originTokenCalls = walletList.map((walletItem) => ({
      address: tokenAddress,
      abi: chainData.erc20,
      method: "balanceOf",
      params: [walletItem.address], // balanceOf 的参数就是钱包地址
    }));
    const originTokenResult = await multiCall(
      chainData?.rpcUrl,
      chainData.multiCallAddress,
      originTokenCalls,
    );
    await walletDataTotal(
      chainData,
      walletList,
      originTokenResult,
      tokenAddress,
    );
  } catch (error) {
    throw new Error("查询地址余额错误", error);
  }
};
export const walletDataTotal = async (
  chainData,
  walletList,
  walletsBalanceResult,
  tokenAddress,
) => {
  const originTokenInfo = useOriginTokenInfoStore.getState().tokenInfo; //lp地址
  let tokenCalls = [];
  let tokenResult = [];
  const searchAddress = useChainStore.getState().searchAddress; //
  console.log("searchAddress==", searchAddress);
  if (searchAddress != "-") {
    tokenCalls = walletList.map((walletItem) => ({
      address: searchAddress,
      abi: chainData.erc20,
      method: "balanceOf",
      params: [walletItem.address], // balanceOf 的参数就是钱包地址
    }));
    tokenCalls.push({
      address: chainData.swapRouterAddress,
      abi: chainData.swapRouterAbi,
      method: "getAmountsOut",
      params: [toWei(1), [searchAddress, tokenAddress]],
    });
    tokenResult = await multiCall(
      chainData?.rpcUrl,
      chainData.multiCallAddress,
      tokenCalls,
    );
  }
  walletList.map((walletItem, index) => {
    walletItem.originalTokenBalance = fromWei(walletsBalanceResult[index]);
    if (searchAddress != "-") {
      walletItem.esc20Balance = fromWei(tokenResult[index]);
      //如果存在代币价格则进行计算
      const tokenPriceFormOne = tokenResult[walletList.length];
      const tokenPriceFormOneAmount = fromWei(tokenPriceFormOne.amounts[1]);
      walletItem.saleOriginalTokenBalance = (
        Number(tokenPriceFormOneAmount) * Number(fromWei(tokenResult[index]))
      ).toFixed(4);
    }
  });
  const burnCalls = [
    {
      address: pairAddress,
      abi: chainData.erc20,
      method: "balanceOf",
      params: [burnAddress1], // balanceOf 的参数就是钱包地址
    },
    {
      address: pairAddress,
      abi: chainData.erc20,
      method: "balanceOf",
      params: [burnAddress2], // balanceOf 的参数就是钱包地址
    },
  ];
  const burnsResult = await multiCall(
    chainData?.rpcUrl,
    chainData.multiCallAddress,
    burnCalls,
  );

  //地址持有基础代币数量
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
  console.log("统计持有基础代币数量==", walletOriginTokenTotalAmount);
  console.log("统计持有代币比例==", walletTokenRato);
  console.log("统计持有代币比例=tokenAmount=", originTokenInfo.tokenAmount);
  //外部可掏池子的usdt数量减去两个销毁地址的数量
  console.log("burnsResult", burnsResult);

  let burnsNums =
    Number(fromWei(burnsResult[0])) + Number(burnsResult[1]?.toString());
  const externalTokenAmount =
    originTokenInfo.totalSupplyAmount -
    originTokenInfo.tokenAmount -
    burnsNums -
    putableTokenAmount;
  const swapRouterCall = [
    {
      address: chainData.swapRouterAddress,
      abi: chainData.swapRouterAbi,
      method: "getAmountsOut",
      params: [toWei(externalTokenAmount), [searchAddress, tokenAddress]],
    },
  ];
  const externalOriginAmountResult = await multiCall(
    chainData?.rpcUrl,
    chainData.multiCallAddress,
    swapRouterCall,
  );
  const amountsOut = externalOriginAmountResult[0].amounts[1];
  const externalOriginAmount = fromWei(amountsOut[1]);
  console.log("储存的值==", walletList);
  //地址持有代币比例
  await addOrUpdateWallets(walletList);
  useOriginTokenInfoStore.getState().setTokenInfo({
    putableTokenAmount,
    walletTokenTotalAmount,
    walletOriginTokenTotalAmount,
    walletTokenRato,
    externalOriginAmount,
  });
};
