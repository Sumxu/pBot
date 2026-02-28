import { isDev } from "../utils/env";
//代币交易公共数据
const  devData = {
    minBuyAmount:[0.1,0.5,1,5],//最小购买金额
    maxBuyAmount:[0.1,0.5,1,5],//最大购买金额
    buyProportion:[25,50,75,90],//买入比例
    saleRatio:[25,50,75,100],//卖出比例
}; //3秒
const proData = {
    minBuyAmount:[0.1,0.5,1,5],//最小购买金额
    maxBuyAmount:[0.1,0.5,1,5],//最大购买金额
    buyProportion:[25,50,75,90],//买入比例
    saleRatio:[25,50,75,100],//卖出比例
};;

// 根据环境自动导出
const tokenTradingDataConfig = isDev ? devData : proData;

export default tokenTradingDataConfig;
