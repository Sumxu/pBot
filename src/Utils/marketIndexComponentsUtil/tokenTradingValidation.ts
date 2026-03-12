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
export const checkOutField = (type, tokenTradingInfo: tokenTradingInfoTs) => {
  switch (type) {
    case 1:
      buyValidation(tokenTradingInfo)
      break;
  }
};
/**
 * 
 * @param tokenTradingInfo 买入校验参数
 * 
 */
const buyProportion=(tokenTradingInfo:tokenTradingInfoTs)=>{

}
