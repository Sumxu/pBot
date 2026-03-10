const pairABI = [
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function getReserves() view returns (uint112 reserve0,uint112 reserve1,uint32)",
  "function totalSupply() view returns (uint256)",
];
export default pairABI;