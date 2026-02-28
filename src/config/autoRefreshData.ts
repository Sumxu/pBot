import { isDev } from "../utils/env";
//自动刷新代币信息刷新数据配置
const devAutoRefresh = 30000; //3秒
const proAutoRefresh = 30000; //3秒

// 根据环境自动导出
const autoRefreshConfig = isDev ? devAutoRefresh : proAutoRefresh;

export default autoRefreshConfig;
