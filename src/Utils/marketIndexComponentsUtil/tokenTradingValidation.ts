import { getUseWalletsList } from "@/Utils/marketIndexComponentsUtil/tokenTradingWallets";
import { isValidNumber, Totast } from "@/Hooks/Utils";
interface tokenTradingInfoTs {
  minAmount: number;
  maxAmount: number;
  buyRato: number;
  saleBuyRato: number;
  minTimeOut: number;
  maxTimeOut: number;
  bindWalletNums: number;
}
/**
 *
 * @param type 1买入 2比例买入 3买入卖出 4开发者卖出
 * @param tokenTradingInfo 设置的参数
 * 根据type 去校验是否参数正确
 *
 */
export const checkOutField = async (
  type: number,
  tokenTradingInfo: tokenTradingInfoTs,
  useWalletsList,
) => {
  switch (type) {
    case 1:
      return await buyValidation(tokenTradingInfo, useWalletsList);
      break;
    case 2:
      return await saleValidation(tokenTradingInfo, useWalletsList);
      break;
    case 3:
      return await buyRatoValidation(tokenTradingInfo);
      break;
    case 4:
      return await saleRatoValidation(tokenTradingInfo);
    default:
      return false;
  }
};
/**
 *
 * @param tokenTradingInfo 买入校验参数
 *
 */
const buyValidation = async (
  tokenTradingInfo: tokenTradingInfoTs,
  useWalletsList,
): Promise<boolean> => {
  if (!isValidNumber(tokenTradingInfo.minAmount)) {
    Totast("最小买入金额请输入合法数字", "error");
    return false;
  }

  if (!isValidNumber(tokenTradingInfo.maxAmount)) {
    Totast("最大买入金额请输入合法数字", "error");
    return false;
  }

  if (!isValidNumber(tokenTradingInfo.minTimeOut)) {
    Totast("最小延迟请输入合法数字", "error");
    return false;
  }

  if (!isValidNumber(tokenTradingInfo.maxTimeOut)) {
    Totast("最大延迟请输入合法数字", "error");
    return false;
  }

  if (!isValidNumber(tokenTradingInfo.bindWalletNums)) {
    Totast("捆绑钱包请输入合法数字", "error");
    return false;
  }

  if (Number(tokenTradingInfo.minAmount) > Number(tokenTradingInfo.maxAmount)) {
    Totast("最小买入金额不能大于最大买入金额", "error");
    return false;
  }
  if (
    Number(tokenTradingInfo.minTimeOut) > Number(tokenTradingInfo.maxTimeOut)
  ) {
    Totast("最小延迟不能大于最大延迟", "error");
    return false;
  }

  if (useWalletsList.length < tokenTradingInfo.bindWalletNums) {
    Totast("捆绑钱包的数量不能大于可买钱包数量", "error");
    return false;
  }
  return true;
};
/**
 * 卖出校验参数
 */
const saleValidation = async (
  tokenTradingInfo: tokenTradingInfoTs,
  useWalletsList,
) => {
  if (!isValidNumber(tokenTradingInfo.minSaleAmount)) {
    Totast("最小卖出金额请输入合法数字", "error");
    return false;
  }

  if (!isValidNumber(tokenTradingInfo.maxSaleAmount)) {
    Totast("最大卖出金额请输入合法数字", "error");
    return false;
  }
  if (!isValidNumber(tokenTradingInfo.minTimeOut)) {
    Totast("最小延迟请输入合法数字", "error");
    return false;
  }
  if (!isValidNumber(tokenTradingInfo.maxTimeOut)) {
    Totast("最大延迟请输入合法数字", "error");
    return false;
  }
  if (!isValidNumber(tokenTradingInfo.bindWalletNums)) {
    Totast("捆绑钱包请输入合法数字", "error");
    return false;
  }

  if (
    Number(tokenTradingInfo.minSaleAmount) >
    Number(tokenTradingInfo.maxSaleAmount)
  ) {
    Totast("最小卖出金额不能大于最大卖出金额", "error");
    return false;
  }
  if (useWalletsList.length < tokenTradingInfo.bindWalletNums) {
    Totast("捆绑钱包的数量不能大于可卖钱包数量", "error");
    return false;
  }
  return true;
};
/**
 * 卖出比例校验参数
 */
const buyRatoValidation = async (tokenTradingInfo: tokenTradingInfoTs) => {
  if (!isValidNumber(tokenTradingInfo.buyRato)) {
    Totast("比例买入请输入合法数字", "error");
    return false;
  }
  if (tokenTradingInfo.buyRato == 0) {
    Totast("比例买入不能为0", "error");
    return false;
  }
  return true;
};
/**
 * 卖出比例校验参数
 */
const saleRatoValidation = async (tokenTradingInfo: tokenTradingInfoTs) => {
  if (!isValidNumber(tokenTradingInfo.saleBuyRato)) {
    Totast("比例卖出请输入合法数字", "error");
    return false;
  }
  if (tokenTradingInfo.saleBuyRato == 0) {
    Totast("比例卖出不能为0", "error");
    return false;
  }
  return true;
};
