import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [account, setAccount] = useState<string>("");
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [chainId, setChainId] = useState<number>();

  // 初始化 provider
  const initProvider = () => {
    if (!window.ethereum) return null;
    return new ethers.providers.Web3Provider(window.ethereum);
  };

  // 连接钱包
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("请安装 MetaMask");
      return;
    }

    const web3Provider = initProvider();
    if (!web3Provider) return;

    try {
      const accounts = await web3Provider.send("eth_requestAccounts", []);

      const signer = web3Provider.getSigner();
      const address = accounts[0];

      const network = await web3Provider.getNetwork();

      setProvider(web3Provider);
      setSigner(signer);
      setAccount(address);
      setChainId(network.chainId);
      // 保存自动重连
      localStorage.setItem("wallet_connected", "1");
      // 签名登录
      await signLogin(address, signer);

      return address;
    } catch (err) {
      console.error("连接钱包失败", err);
    }
  };

  // 签名登录
  const signLogin = async (address: string, signer: ethers.Signer) => {
    try {
      const message = `Login\n\nWallet: ${address}\nTime: ${Date.now()}`;

      const signature = await signer.signMessage(message);

      console.log("签名消息:", message);
      console.log("签名:", signature);
    } catch (err) {
      console.error("签名失败", err);
    }
  };

  // 自动重连
  const autoConnect = async () => {
    if (!window.ethereum) return;

    const connected = localStorage.getItem("wallet_connected");
    if (!connected) return;

    const web3Provider = initProvider();
    if (!web3Provider) return;

    const accounts = await web3Provider.listAccounts();

    if (accounts.length === 0) return;

    const signer = web3Provider.getSigner();
    const network = await web3Provider.getNetwork();

    setProvider(web3Provider);
    setSigner(signer);
    setAccount(accounts[0]);
    setChainId(network.chainId);
  };

  // 监听账户变化
  const listenAccountChange = () => {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length === 0) {
        setAccount("");
        localStorage.removeItem("wallet_connected");
      } else {
        setAccount(accounts[0]);
      }
    });
  };

  // 监听链变化
  const listenChainChange = () => {
    if (!window.ethereum) return;

    window.ethereum.on("chainChanged", (chainId: string) => {
      setChainId(parseInt(chainId, 16));
      window.location.reload();
    });
  };

  useEffect(() => {
    autoConnect();
    listenAccountChange();
    listenChainChange();
  }, []);

  return {
    account,
    provider,
    signer,
    chainId,
    connectWallet,
  };
};
