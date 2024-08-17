import nftMarketplace from "./NFTMarketplace.json";
export const NFTMarketplaceAddress =
  "0x2880392716E260198d508f148e5741801575ac02";

  export const NFTMarketplaceABI = nftMarketplace.abi;



  //NETWORK
const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.drpc.org"],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};


  const changeNetwork = async ({ networkName }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  export const handleNetworkSwitch = async () => {
    const networkName = "sepolia";
    await changeNetwork({ networkName });
  };