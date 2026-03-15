import { isDev } from "../utils/env";
//
import bscIcon from "@/assets/chainListIcon/bsc.svg";
import baseIcon from "@/assets/chainListIcon/base.svg";
import ethIcon from "@/assets/chainListIcon/eth.svg";
import monadIcon from "@/assets/chainListIcon/monad.svg";
import morphIcon from "@/assets/chainListIcon/morph.svg";
import okxIcon from "@/assets/chainListIcon/okx.svg";
import pairABI from "@/Contract/ABI/PairABI";
import ERC20_ABI from "@/Contract/ABI/Erc20";
import factoryAbi from "@/Contract/ABI/FactoryABI";
import routerAbi from "@/Contract/ABI/RouterABI";
import multiCallAbi from "@/Contract/ABI/MultiCallABI";
const devChain = [
  {
    chainConfigId: 97,
    label: "BSC",
    icon: bscIcon,
    rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
    chainId: "0x61",
    chainName: "BNB Smart Chain Testnet",
    pairAbi: pairABI,
    erc20: ERC20_ABI,
    multiCallAbi: multiCallAbi,
    factoryAbi: factoryAbi,
    swapRouterAddress: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
    swapRouterAbi: routerAbi,
    multiCallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    factoryAddress: "0x6725F303b657a9451d8BA641348b6761A6CC7a17", //薄饼abi //可以查询出合约地址的信息
    baseToken: [
      {
        label: "BNB",
        value: "Wrapped BNB",
        address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      },
      {
        label: "USDT",
        value: "Tether USD",
        address: "0x0158953982FbF5f42D5eb934046cD0707D1B2E74",
      },
      {
        label: "USDC",
        value: "USD Coin",
        address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      },
      {
        label: "USD1",
        value: "USD1",
        address: "0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d",
      },
      {
        label: "FIST",
        value: "FIST",
        address: "0xc9849e6fdB743d08fA48f4cD6d2A977c1C7E3cE4",
      },
      {
        label: "ASTER",
        value: "ASTER",
        address: "0x9a0a2c0f9dC7cF6F2a444ef322a32956543d4d6F",
      },
    ],
    pondList: [
      {
        label: "Uniswap V2",
        value: "Uniswap V2",
        type: "v2",
      },
    ], //池子固定数据
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
    chainConfigId: 56,
    label: "BSC",
    icon: bscIcon,
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: "0x38",
    chainName: "BNB Chain",
    pairAbi: pairABI,
    erc20: ERC20_ABI,
    multiCallAbi: multiCallAbi,
    factoryAbi: factoryAbi,
    swapRouterAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    swapRouterAbi: routerAbi,
    multiCallAddress: "0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb",
    factoryAddress: "0xca143ce32fe78f1f7019d7d551a6402fc5350c73", //薄饼abi //可以查询出合约地址的信息
    baseToken: [
      {
        label: "BNB",
        value: "Wrapped BNB",
        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      },
      {
        label: "USDT",
        value: "Tether USD",
        address: "0x55d398326f99059fF775485246999027B3197955",
      },
      {
        label: "USDC",
        value: "USD Coin",
        address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      },
      {
        label: "USD1",
        value: "USD1",
        address: "0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d",
      },
      {
        label: "FIST",
        value: "FIST",
        address: "0xc9849e6fdB743d08fA48f4cD6d2A977c1C7E3cE4",
      },
      {
        label: "ASTER",
        value: "ASTER",
        address: "0x9a0a2c0f9dC7cF6F2a444ef322a32956543d4d6F",
      },
    ],
    pondList: [
      {
        label: "Uniswap V2",
        value: "Uniswap V2",
        type: "v2",
      },
    ], //池子固定数据
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
];

// 根据环境自动导出
const chainConfig = isDev ? devChain : prodChain;

export default chainConfig;
