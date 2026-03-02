//钱包管理配置表
import { dbPromise } from "../db";
// 单个新增
export async function addWalletSetting(walletSettingInfo: any) {
  const db = await dbPromise;
  return db.put("walletSetting", walletSettingInfo);
}
// 查询
export async function getWalletSetting(id: number) {
  const db = await dbPromise;
  return db.get("walletSetting", id);
}
//修改其中某个值
export async function updateGlobal(id: number, updateData: any) {
  const db = await dbPromise;
  const walletSetting = await db.get("walletSetting", id);
  if (!walletSetting) return;
  const newData = {
    ...walletSetting,
    ...updateData,
  };
  return db.put("walletSetting", newData);
}
// addWalletSetting({
//   id: 1,
//   type: 1, //1 erc20代币 2原生代币
//   walletAddress: "", //资金钱包地址
//   tokenContractAddress: "", //代币合约地址
//   giveWalletsNums: 12, //分发给每个钱包的代币数量
//   gasNums: 0, //gas系数
//   collectionWalletAddress:'',//归集主钱包
//   collectionContractAddress:'',//归集代币合约地址
//   collectionRato:"",//归集比例
//   collectionGasNums:"",//归集gas系数
//   rapidProportion:25,//快速比例
// });
