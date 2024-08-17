require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:  {
    hardhat: {
        chainId: 31337,
        blcokConfirmations: 6,
    },
    sepolia: {
        url: "https://eth-sepolia.g.alchemy.com/v2/dHmlLhgtpGD912yKoLHv37ggEsm3ziRw",
        accounts: ['5eeb8b551c55de3167c46ece0e1d91ac0b84cff5151ffb00c2f1d09310a500e5'],
        saveDeployments: true,
        chainId: 11155111,
        blcokConfirmations: 6,
    },
},
};
