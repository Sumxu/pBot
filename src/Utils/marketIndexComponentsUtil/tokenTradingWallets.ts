import { multiCall } from "@/Utils/multiCallUtils";
import { findChainById, findListData } from "@/Utils/chainListDataUtils";
import { useChainStore } from "@/Store/chainStore";
import { walletAddressList } from "@/Utils/walletBalance";
import type { BigNumber } from "ethers";
import { ethers } from "ethers";
import { fromWei, toWei } from "@/Hooks/Utils";
let chainId: number = 0; //链id
let searchAddress: string = ""; //合约地址
let pairAddress: string = ""; //lp地址
let originTokenName: string = ""; //基础代币名称
let stopSwapBot: boolean = false; //是否停止购买
/**
 * 得到拥有代币的钱包地址总数
 * 获取所有的钱包地址  查询代币地址余额
 * 返回总数
 */
export const getUseWalletsList = async (isBuy: boolean) => {
  //得到所有的钱包地址
  const walletAllList = await walletAddressList();
  //查询所有地址的代币余额
  chainId = useChainStore.getState().chainId; //链id
  originTokenName = useChainStore.getState().originTokenName; //基础代币地址
  const chainData: any = findChainById(chainId);
  searchAddress = useChainStore.getState().searchAddress; //合约地址
  const findTokenData = findListData(
    chainData?.baseToken,
    "label",
    originTokenName,
  );
  const tokenCalls = walletAllList.map((walletItem) => ({
    address: isBuy ? findTokenData.address : searchAddress,
    abi: chainData.erc20,
    method: "balanceOf",
    params: [walletItem.address], // balanceOf 的参数就是钱包地址
  }));
  const walletsTokenResult = await multiCall(
    chainData?.rpcUrl,
    chainData.multiCallAddress,
    tokenCalls,
  );
  let useWalletsData = [];
  walletsTokenResult.map((item: BigNumber, index: number) => {
    if (item[0].isZero()) return;
    useWalletsData.push(walletAllList[index]);
  });
  return useWalletsData;
};
/**
 * 停止购买
 */
export function stopSwap() {
  stopSwapBot = true;
}
/**
 *
 * @param arr 总数组
 * @param size 分割成多少份数
 * @returns
 */
function splitArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
/**
 *
 * @param min 最小
 * @param max 最大
 * @returns 在 最小金额和最大金额之间随机
 */
function randomAmount(min, max) {
  const amount = Math.random() * (max - min) + min;
  return Number(amount.toFixed(2));
}
/**
 *
 * @param min 最小延迟
 * @param max 最大延迟
 * @returns 随机延迟函数
 */
function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 *
 * @param ms 延迟多少
 * @returns
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//  ---------- 授权转账钱包数量 ----------
const authorizeWallets = async (
  provider,
  walletGroups,
  chainData,
  tokenAddress,
) => {
  for (let i = 0; i < walletGroups.length; i++) {
    const wallet = walletGroups[i];
    const signer = new ethers.Wallet(wallet.privateKey, provider);
    console.log(`正在处理钱包: ${wallet.address}`);
    const tokenContract = new ethers.Contract(
      tokenAddress,
      chainData.erc20,
      signer,
    );
    // 这里调用你的操作，比如授权
    try {
      await authorizeWallet(tokenContract, chainData.swapRouterAddress);
    } catch (err) {
      console.error(`  钱包 ${wallet.address} 授权失败:`, err);
    }
  }
};
//授权钱包函数
async function authorizeWallet(tokenContract, swapRouterAddress) {
  const MAX_UINT = ethers.constants.MaxUint256;
  try {
    const tx = await tokenContract.approve(swapRouterAddress, MAX_UINT, {
      gasLimit: 100000, // 可以根据需要调整
    });
    console.log("交易已发送，hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("授权成功，区块号:", receipt.blockNumber);
  } catch (err) {
    console.error("授权失败:", err);
  }
}
// ---------- 买入和卖出 ----------
export async function runSwapBot({
  walletsList,
  bindWalletNums,
  minAmount,
  maxAmount,
  minDelay,
  maxDelay,
  isBuy = true,
}: {
  walletsList: Array;
  bindWalletNums: number;
  minAmount: number;
  maxAmount: number;
  minDelay: number;
  maxDelay: number;
  isBuy?: boolean;
}) {
  stopSwapBot = false;
  chainId = useChainStore.getState().chainId; //链id
  originTokenName = useChainStore.getState().originTokenName; //基础代币地址
  searchAddress = useChainStore.getState().searchAddress; //基础代币地址
  const chainData: any = findChainById(chainId);
  //查询所有地址的代币余额
  const findTokenData = findListData(
    chainData?.baseToken,
    "label",
    originTokenName,
  );
  const provider = new ethers.providers.JsonRpcProvider(chainData.rpcUrl);
  const walletGroups = splitArray(walletsList, bindWalletNums);
  //如果不是原生代币就需要授权
  if (findTokenData.label != "BNB") {
    //查询额度是否大于0 如果大于0就代表都是授权最大值过
    const tokenAllowanceCalls = walletsList.map((walletItem) => ({
      address: isBuy ? findTokenData.address : searchAddress, //买入就是查询usdt的额度 卖就是代币地址的额度
      abi: chainData.erc20,
      method: "allowance",
      params: [walletItem.address, chainData.swapRouterAddress], // balanceOf 的参数就是钱包地址
    }));
    const tokenAllowanceResult = await multiCall(
      chainData?.rpcUrl,
      chainData.multiCallAddress,
      tokenAllowanceCalls,
    );
    let approveWallets = []; //需要授权的钱包地址数组
    tokenAllowanceResult.map((approveWalletItem, index) => {
      console.log("approveWalletItem==", approveWalletItem[0]);
      if (approveWalletItem[0].isZero()) {
        approveWallets.push(walletsList[index]);
      }
    });
    await authorizeWallets(
      provider,
      approveWallets,
      chainData,
      isBuy ? findTokenData.address : searchAddress,
    );
    for (let r = 0; r < walletGroups.length; r++) {
      if (stopSwapBot) {
        console.log("停止执行");
        return;
      }

      const wallets = walletGroups[r].map(
        (pk) => new ethers.Wallet(pk.privateKey, provider),
      );
      const txs: string[] = [];
      const amount = randomAmount(minAmount, maxAmount); //得到的随机金额
      const amountIn = toWei(amount);
      const amountOutMin = toWei(0); // 可自行设置滑点
      console.log(
        "组内钱包数量:",
        wallets.length,
        "随机金额:",
        fromWei(amountIn),
      );
      for (const wallet of wallets) {
        if (stopSwapBot) {
          console.log("停止执行");
          return;
        }
        await swapToken({
          wallet,
          provider,
          router: chainData.swapRouterAddress,
          fromToken: isBuy ? findTokenData.address : searchAddress,
          toToken: isBuy ? searchAddress : findTokenData.address,
          amountIn,
          amountOutMin,
          txs,
        });
      }
      await sendBundle(provider, txs);
      if (stopSwapBot) {
        console.log("停止执行");
        return;
      }
      const delaySec = randomDelay(minDelay, maxDelay);
      console.log("等待", delaySec, "秒再执行下一组");
      await delay(delaySec * 1000);
    }
  }
}
// ---------- 比例买和卖 ----------
export async function runSwapRato({
  walletsList,
  bindWalletNums,
  ratoNum,
  minDelay,
  maxDelay,
  isBuy = true,
}: {
  walletsList: Array;
  bindWalletNums: number;
  ratoNum: number; //卖出和买入的比例
  minDelay: number;
  maxDelay: number;
  isBuy?: boolean;
}) {
  console.log("钱包地址---", walletsList);
  console.log("钱包数量---", bindWalletNums);
  console.log("比例---", ratoNum);
  console.log("比例---", isBuy);
  const buyPercent: number = ratoNum / 100; //买个钱包买或卖的比例
  console.log("购买比例buyPercent", buyPercent);
  chainId = useChainStore.getState().chainId; //链id
  originTokenName = useChainStore.getState().originTokenName; //基础代币地址
  searchAddress = useChainStore.getState().searchAddress; //基础代币地址
  const chainData: any = findChainById(chainId);
  //查询所有地址的代币余额
  const findTokenData = findListData(
    chainData?.baseToken,
    "label",
    originTokenName,
  );
  const provider = new ethers.providers.JsonRpcProvider(chainData.rpcUrl);
  const walletGroups = splitArray(walletsList, bindWalletNums);
  if (findTokenData.label != "BNB") {
    //查询额度是否大于0 如果大于0就代表都是授权最大值过
    const tokenAllowanceCalls = walletsList.map((walletItem) => ({
      address: isBuy ? findTokenData.address : searchAddress, //买入就是查询usdt的额度 卖就是代币地址的额度
      abi: chainData.erc20,
      method: "allowance",
      params: [walletItem.address, chainData.swapRouterAddress], // balanceOf 的参数就是钱包地址
    }));
    const tokenAllowanceResult = await multiCall(
      chainData?.rpcUrl,
      chainData.multiCallAddress,
      tokenAllowanceCalls,
    );
    let approveWallets = []; //需要授权的钱包地址数组
    tokenAllowanceResult.map((approveWalletItem, index) => {
      console.log("approveWalletItem==", approveWalletItem[0]);
      if (approveWalletItem[0].isZero()) {
        approveWallets.push(walletsList[index]);
      }
    });
    await authorizeWallets(
      provider,
      approveWallets,
      chainData,
      isBuy ? findTokenData.address : searchAddress,
    );
    //开始比例购买
    for (let r = 0; r < walletGroups.length; r++) {
      const wallets = walletGroups[r].map(
        (pk) => new ethers.Wallet(pk.privateKey, provider),
      );
      const tokenBalance = walletGroups[r].map((walletsItem) =>
        isBuy ? walletsItem.originalTokenBalance : walletsItem.esc20Balance,
      );
      const txs: string[] = [];
      const amount = tokenBalance * buyPercent; //得到的卖和买的比例金额
      const amountIn = toWei(amount);
      const amountOutMin = toWei(0); // 可自行设置滑点
      console.log(
        "组内钱包数量:",
        wallets.length,
        "随机金额:",
        fromWei(amountIn),
      );
      for (const wallet of wallets) {
        await swapToken({
          wallet,
          provider,
          router: chainData.swapRouterAddress,
          fromToken: isBuy ? findTokenData.address : searchAddress,
          toToken: isBuy ? searchAddress : findTokenData.address,
          amountIn,
          amountOutMin,
          txs,
        });
      }
      await sendBundle(provider, txs);
      const delaySec = randomDelay(minDelay, maxDelay);
      console.log("等待", delaySec, "秒再执行下一组");
      await delay(delaySec * 1000);
    }
  }
}
// ---------- 交易方法 ----------
export async function swapToken({
  wallet,
  provider,
  router,
  fromToken,
  toToken,
  amountIn,
  amountOutMin,
  txs,
}: {
  wallet: ethers.Wallet;
  provider: ethers.providers.JsonRpcProvider;
  router: string;
  fromToken: string;
  toToken: string;
  amountIn: ethers.BigNumber;
  amountOutMin: ethers.BigNumber;
  txs: string[];
}) {
  try {
    const iface = new ethers.utils.Interface([
      // 普通 swap
      "function swapExactTokensForTokens(uint amountIn,uint amountOutMin,address[] path,address to,uint deadline)",
      "function swapExactETHForTokens(uint amountOutMin,address[] path,address to,uint deadline)",
      "function swapExactTokensForETH(uint amountIn,uint amountOutMin,address[] path,address to,uint deadline)",
      // ✅ 带税 token swap
      "function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint amountIn,uint amountOutMin,address[] path,address to,uint deadline)",
      "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin,address[] path,address to,uint deadline)",
      "function swapExactTokensForETHSupportingFeeOnTransferTokens(uint amountIn,uint amountOutMin,address[] path,address to,uint deadline)",
    ]);
    const deadline = Math.floor(Date.now() / 1000) + 60;
    const data = iface.encodeFunctionData(
      "swapExactTokensForTokensSupportingFeeOnTransferTokens",
      [amountIn, amountOutMin, [fromToken, toToken], wallet.address, deadline],
    );
    const gasEstimate = await provider.estimateGas({
      from: wallet.address,
      to: router,
      data,
    });
    const gasPrice = await provider.getGasPrice();
    const gasLimit = gasEstimate.mul(120).div(100); // +20%
    const nonce = await provider.getTransactionCount(wallet.address);
    const tx = await wallet.signTransaction({
      from: wallet.address,
      to: router,
      data,
      gasLimit,
      gasPrice,
      nonce,
      chainId: chainId,
    });
    txs.push(tx);
    console.log("交易构建成功");
  } catch (error) {
    console.log(`钱包 ${wallet.address} gas预估失败，跳过`, error);
    return; // 直接跳过
  }
}
// ---------- bundle发送方法 ----------
export async function sendBundle(
  provider: ethers.providers.JsonRpcProvider,
  txs: string[],
) {
  for (let i = 0; i < txs.length; i++) {
    try {
      await provider.sendTransaction(txs[i]);
      console.log(`第 ${i + 1} 个交易成功`);
    } catch (error) {
      console.log(`第 ${i + 1} 个交易失败`, error);
    }
  }
  // const bundleSubmit = [{ txs }];
  // try {
  //   //只能在主网上跑 测试网络没效果
  //   const bundleHash = await provider.send("eth_sendBundle", bundleSubmit);
  //   console.log("Bundle sent successfully:", bundleHash);
  // } catch (error) {
  //   console.error("Error sending bundle:", error);
  //   await delay(200);
  //   await sendBundle(provider, txs);
  // }
}
//-------每一笔交易都需要预估税点------
export async function estimateAmountOutMin(isBuy: boolean, path: Array) {}
