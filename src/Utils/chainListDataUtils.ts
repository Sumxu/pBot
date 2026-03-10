import chainListData from "@/config/chainListData";
import { Totast, fromWei } from "@/Hooks/Utils";
import { multiCall } from "@/Utils/multiCallUtils";
const isZeroAddress = "0x0000000000000000000000000000000000000000";
/**
 *
 * @param chainId 链路id
 * @returns  返回对应的链路值
 */
export const findChainById = (chainId: number | string) => {
  return chainListData.find((item) => item.chainConfigId == chainId);
};
/**
 *
 * @param list 数据源
 * @param value 条件值
 * @returns 返回数组的对象
 */
export const findListData = (list, value) => {
  return list.find((item) => item.value == value);
};
/**
 *
 * @param contractAddress 查询的合约地址
 * @param type 池子类型
 * @param originTokenAddress 基础代币地址
 * @param chainId 链路id
 * 查询对应的池子
 */
export const findContractInfo = (
  contractAddress,
  type,
  originTokenAddress,
  chainId,
) => {
  console.log("查询对应的池子的值1", contractAddress);
  console.log("查询对应的池子的值2", type);
  console.log("查询对应的池子的值3", originTokenAddress);
  switch (type) {
    case "v2":
      //v2的查询
      findUniswapV2Info(contractAddress, originTokenAddress, chainId);
      break;
  }
};
/**
 *
 * @param contractAddress 查询的合约地址
 * @param type 池子类型
 * @param originTokenAddress 基础代币地址
 * @param chainId 链路id
 * 查询代币信息
 */
const findUniswapV2Info = async (
  contractAddress,
  originTokenAddress,
  chainId,
) => {
  const chainData = findChainById(chainId);
  console.log("chainData==", chainData);
  //查询pair地址
  const pairAddress: string = await findPairAddress(
    chainData,
    originTokenAddress,
    contractAddress,
  );
  //通过pair地址查询出对应的代币信息
  const pairInfoData = await pairAddressInfoByAddress(
    pairAddress,
    chainData,
    originTokenAddress,
    contractAddress,
  );
  console.log("pairInfoData===", pairInfoData);
  return pairInfoData;
};
/**
 * 查询对应的pair地址
 * @param chainData
 * @param originTokenAddress
 * @param contractAddress
 * @returns
 */
const findPairAddress = async (
  chainData,
  originTokenAddress,
  contractAddress,
) => {
  const result = await multiCall(
    chainData?.rpcUrl,
    chainData.multiCallAddress,
    [
      {
        address: chainData.factoryAddress,
        abi: chainData.factoryAbi,
        method: "getPair",
        params: [contractAddress, originTokenAddress],
      },
    ],
  );
  const pairAddress = result[0][0];
  console.log("pairAddress=", pairAddress);
  try {
    if (isZeroAddress == pairAddress) {
      Totast("未找到可用池子", "error");
      throw new Error("未找到可用池子");
    }
    return pairAddress;
  } catch (error) {}
};
const pairAddressInfoByAddress = async (
  pairAddress: string,
  chainData: any,
  originTokenAddress: string,
  contractAddress: string,
) => {
  const result = await multiCall(
    chainData?.rpcUrl,
    chainData.multiCallAddress,
    [
      {
        address: pairAddress,
        abi: chainData.pairAbi,
        method: "token0",
      },
      {
        address: pairAddress,
        abi: chainData.pairAbi,
        method: "token1",
      },
      {
        address: pairAddress,
        abi: chainData.pairAbi,
        method: "getReserves",
      },
      {
        address: contractAddress,
        abi: chainData.pairAbi,
        method: "totalSupply",
      },
    ],
  );
  //开始得出对应的值
  const token0 = result[0][0];
  const token1 = result[1][0];
  const reserve0 = result[2][0];
  const reserve1 = result[2][1];
  const totalSupplyAmount = Number(fromWei(result[3]));
  console.log("res==", result);
  console.log("res=totalSupplyAmount=", totalSupplyAmount);
  console.log("res=token0=", token0);
  console.log("res=token1=", token1);
  let tokenReserve;
  let usdtReserve;
  try {
    if (token0.toLowerCase() === originTokenAddress.toLowerCase()) {
      usdtReserve = reserve0;
      tokenReserve = reserve1;
    } else if (token1.toLowerCase() === originTokenAddress.toLowerCase()) {
      usdtReserve = reserve1;
      tokenReserve = reserve0;
    } else {
      throw new Error("池子不包含当前选中的代币");
    }
  } catch (error) {}
  const usdtAmount = Number(fromWei(usdtReserve));
  const tokenAmount = Number(fromWei(tokenReserve));
  // 代币价格（USDT）
  const tokenPriceUSDT = usdtAmount / tokenAmount;
  //池子代币占比
  const tokenRato = (tokenAmount / totalSupplyAmount) * 100;
  console.log("代币价格==", tokenPriceUSDT);
  console.log("池子代币占比==", tokenRato);
  console.log("池子usdt价格==", usdtAmount);
  return {
    tokenRato: tokenRato,
    tokenPrice: tokenPriceUSDT,
    usdtAmount: usdtAmount,
  };
};