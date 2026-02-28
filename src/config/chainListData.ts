import { isDev } from "../utils/env";
//
const devChain = [
  {
    label: "BSC",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "BNB Chain",
    baseToken: [
      {
        label: "BNB",
        value: "Wrapped",
        address: "",
      },
      {
        label: "USDT",
        value: "Tether USD",
        address: "",
      },
      {
        label: "USDC",
        value: "USD Coin",
        address: "",
      },
      {
        label: "USD1",
        value: "USD1",
        address: "",
      },
      {
        label: "FIST",
        value: "FIST",
        address: "",
      },
      {
        label: "ASTER",
        value: "ASTER",
        address: "",
      },
      {
        label: "COIN",
        value: "COIN",
        address: "",
      },
    ],
  },
  {
    label: "ETH",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "ETH",
        value: "Wrapped Ether",
        address: "",
      },
    ],
  },
  {
    label: "Base",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "ETH",
        value: "Wrapped Ether",
        address: "",
      },
      {
        label: "TOSHI",
        value: "Toshi",
        address: "",
      },
    ],
  },
  {
    label: "OKX",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "OKB",
        value: "OKB Token",
        address: "",
      },
    ],
  },
  {
    label: "Morph",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "ETH",
        value: "ETH Wrapped Ether",
        address: "",
      },
    ],
  },
  {
    label: "Monad",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "MON",
        value: "Monad",
        address: "",
      },
      {
        label: "USDC",
        value: "USD Coin",
        address: "",
      },
      {
        label: "USDT0",
        value: "USDT0",
        address: "",
      },
    ],
  },
]; //链列表

const prodChain = [
  {
    label: "BSC",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "BNB Chain",
    baseToken: [
      {
        label: "BNB",
        value: "Wrapped",
        address: "",
      },
      {
        label: "USDT",
        value: "Tether USD",
        address: "",
      },
      {
        label: "USDC",
        value: "USD Coin",
        address: "",
      },
      {
        label: "USD1",
        value: "USD1",
        address: "",
      },
      {
        label: "FIST",
        value: "FIST",
        address: "",
      },
      {
        label: "ASTER",
        value: "ASTER",
        address: "",
      },
      {
        label: "COIN",
        value: "COIN",
        address: "",
      },
    ],
  },
  {
    label: "ETH",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "ETH",
        value: "Wrapped Ether",
        address: "",
      },
    ],
  },
  {
    label: "Base",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "ETH",
        value: "Wrapped Ether",
        address: "",
      },
      {
        label: "TOSHI",
        value: "Toshi",
        address: "",
      },
    ],
  },
  {
    label: "OKX",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "OKB",
        value: "OKB Token",
        address: "",
      },
    ],
  },
  {
    label: "Morph",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "ETH",
        value: "ETH Wrapped Ether",
        address: "",
      },
    ],
  },
  {
    label: "Monad",
    icon: "",
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "ETH",
    baseToken: [
      {
        label: "MON",
        value: "Monad",
        address: "",
      },
      {
        label: "USDC",
        value: "USD Coin",
        address: "",
      },
      {
        label: "USDT0",
        value: "USDT0",
        address: "",
      },
    ],
  },
];

// 根据环境自动导出
const chainConfig = isDev ? devChain : prodChain;

export default chainConfig;
