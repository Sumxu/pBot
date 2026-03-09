import { isDev } from "../utils/env";
//
import bscIcon from "@/assets/chainListIcon/bsc.svg";
import baseIcon from "@/assets/chainListIcon/base.svg";
import ethIcon from "@/assets/chainListIcon/eth.svg";
import monadIcon from "@/assets/chainListIcon/monad.svg";
import morphIcon from "@/assets/chainListIcon/morph.svg";
import okxIcon from "@/assets/chainListIcon/okx.svg";
import pairABI  from "@/Contract/ABI/PairABI";
const devChain = [
  {
    chainConfigId: 98,
    label: "BSC",
    icon: bscIcon,
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "BNB Chain",
    abi:pairABI,
    factory:'0xca143ce32fe78f1f7019d7d551a6402fc5350c73',//薄饼abi
    baseToken: [
      {
        label: "BNB",
        value: "Wrapped BNB",
        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
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
    chainConfigId: 1,
    label: "ETH",
    icon: ethIcon,
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x1",
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
    chainConfigId: 2,
    label: "Base",
    icon: baseIcon,
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x2",
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
    chainConfigId: 3,
    label: "OKX",
    icon: okxIcon,
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
    chainConfigId: 4,
    label: "Morph",
    icon: morphIcon,
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
    chainConfigId: 5,
    label: "Monad",
    icon: monadIcon,
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
