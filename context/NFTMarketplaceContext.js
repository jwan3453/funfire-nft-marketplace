import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { upload,  download} from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";
 


const apiKey = "b78d3bfa7d474ec5b5bfec515285addd";
const projectSecretKey = "3LwULg/A+LT3Fy1DwTPrvnz6o6NETCGgmJe5SqEOUuJB5XARNnfbzQ";
const auth = "Basic " + btoa(apiKey + ":" + projectSecretKey)

// const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN;
// const client = ipfsHttpClient({
// 	host: "ipfs.infura.io",
// 	// path: "/api/v0",
// 	port: 5001,
// 	protocol: "https",
// 	headers: {
// 		authorization: auth,
// 	  },
// });

const clientId = 'b0ebb354ca0759ee26818a65c3f951ea';
// const client = `https://${clientId}.ipfscdn.io/ipfs/`
const client = createThirdwebClient({
	clientId: clientId,
  });



import {
	NFTMarketplaceAddress,
	NFTMarketplaceABI,
	// transferFundsAddress,
	// transferFundsABI,
	handleNetworkSwitch,
} from "./constants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
	new ethers.Contract(
		NFTMarketplaceAddress,
		NFTMarketplaceABI,
		signerOrProvider
	);





export const NFTMarketplaceContext = React.createContext();


export const NFTMarketplaceProvider = ({ children }) => {
	const titleData = "Funfire NFTs, create with passion";

	//------USESTAT
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [openError, setOpenError] = useState(false);
	const [currentAccount, setCurrentAccount] = useState("");
	const [accountBalance, setAccountBalance] = useState("");
	const router = useRouter();

	//---CONNECTING WITH SMART CONTRACT

	const connectingWithSmartContract = async () => {
		// try {

		const web3Modal = new Web3Modal();

		const connection = await web3Modal.connect();

		const provider = new ethers.BrowserProvider(connection);
		const signer = await provider.getSigner();

		const contract = fetchContract(signer);

		return contract;
		// } catch (error) {
		//   console.log("Something went wrong while connecting with contract", error);
		// }
	};
	//---UPLOAD TO IPFS FUNCTION
	const uploadToIPFS = async (file) => {
		try {
			// const added = await client.add({ content: file });
			// const url = `${subdomain}/ipfs/${added.path}`;
			// return url;
			setLoading(true)
			const uri = await upload({
				client,
				files: [
				  new File([file], file.name),
				],
			  });
			//   alert('789');
			const url = await download({
				client,
				uri,
			  });
			  setLoading(false)
			  return url.url;
	
		} catch (error) {
			setError("Error Uploading to IPFS");
			setOpenError(true);
			setLoading(false)
		}
	};


	const checkIfWalletConnected = async () => {
		try {
			if (!window.ethereum)
				return setOpenError(true), setError("Install MetaMask");
			const network = await handleNetworkSwitch();
			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
				// console.log(accounts[0]);
			} else {
				setError("No Account Found");
				// setOpenError(true);
				console.log("No account");
			}

			// const provider = new ethers.providers.Web3Provider(window.ethereum);
			// const getBalance = await provider.getBalance(accounts[0]);
			// const bal = ethers.utils.formatEther(getBalance);
			// setAccountBalance(bal);


		} catch (error) {
			setError("Something wrong while connecting to wallet");
			setOpenError(true);
			console.log("not connected");
		}
	};

	useEffect(() => {
		checkIfWalletConnected();
	}, []);


	//---CONNET WALLET FUNCTION
	const connectWallet = async () => {
		try {
			if (!window.ethereum)
				return setOpenError(true), setError("Install MetaMask");

			const network = await handleNetworkSwitch();
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setCurrentAccount(accounts[0]);
			const contract = await connectingWithSmartContract();
		} catch (error) {
			setError("Error while connecting to wallet");
			setOpenError(true);
		}
	};


	//---CREATENFT FUNCTION
	const createNFT = async (name, price, image, description, router) => {
		setLoading(true);
		if (!name || !description || !price || !image)
			return setError("NFT Data Is Missing"), setOpenError(true);


		const data = JSON.stringify({ name, description, image });
		console.log('data',data);
		try {

			const uri = await upload({
				client,
				files: [
				  new File([data], 'data.json'),
				],
			  });

			const url = await download({
				client,
				uri,
			  });
			  console.log('create url', url.url);



			// const added = await client.add(data);
			// const url = `${subdomain}/ipfs/${added.path}`;

			await createSale(url.url, price);
			setLoading(false);
			router.push("/search");
		} catch (error) {
			setError("Error while creating NFT");
			setOpenError(true);
			setLoading(false);
		}

	}


	//--- createSale FUNCTION
	const createSale = async (url, formInputPrice, isReselling, id) => {
		try {

			const price = ethers.parseUnits(formInputPrice, "ether");
			console.log('啥玩意1', contract,  listingPrice);
			const contract = await connectingWithSmartContract();
			console.log('啥玩意2', contract,  listingPrice);
			const listingPrice = await contract.getFunction("getListingPrice").call(null);
			console.log('啥玩意3', contract,  listingPrice);
			const transaction = !isReselling
				? await contract.createToken(url, price, {
					value: listingPrice.toString(),
				})
				: await contract.resellToken(id, price, {
					value: listingPrice.toString(),
				});

			await transaction.wait();
			console.log('transaction', transaction); 
		} catch (error) {
			setError("error while creating sale");
			setOpenError(true);
			console.log(error);
		}
	};

	const fetchNFTs = async () => {
		try {
			
			// const provider = new ethers.BrowserProvider(
			//   //--process.env.NEXT_PUBLIC_POLYGON_MUMBAI_RPC
			//   "https://polygon-mumbai.g.alchemy.com/v2/0awa485pp03Dww2fTjrSCg7yHlZECw-K"
			// );

			// const contract = fetchContract(provider);

			const contract = await connectingWithSmartContract()
			console.log('sss', contract)
			const data = await contract.fetchMarketItems();
			console.log('data', data);
			const items = await Promise.all(
				data.map(
					async ({ tokenId, seller, owner, price: unformattedPrice }) => {
						console.log('wtf', tokenId, seller);
						const tokenURI = await contract.tokenURI(tokenId);

						const {
							data: { image, name, description },
						} = await axios.get(tokenURI, {});
						const price = ethers.formatUnits(
							unformattedPrice.toString(),
							"ether"
						);
						console.log(image, name,description, tokenId );
						return {
							price,
							tokenId: parseInt(tokenId),
							seller,
							owner,
							image,
							name,
							description,
							tokenURI,
						};
					}
				)
			);
			return items;

			// }
		} catch (error) {
			// setError("Error while fetching NFTS");
			// setOpenError(true);
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	fetchNFTs();
	// }, []);


	//--FETCHING MY NFT OR LISTED NFTs
	const fetchMyNFTsOrListedNFTs = async (type) => {
		try {
	
			if (currentAccount) {
				const contract = await connectingWithSmartContract();
				// console.log('fetchMyNFTsOrListedNFTs');
				const data =
					type == "fetchItemsListed"
						? await contract.fetchItemsListed()
						: await contract.fetchMyNFTs();

						console.log('fetchMyNFTsOrListedNFTs123', type, data);
				const items = await Promise.all(
					data.map(
						async ({ tokenId, seller, owner, price: unformattedPrice }) => {
							const tokenURI = await contract.tokenURI(tokenId);
							const {
								data: { image, name, description },
							} = await axios.get(tokenURI);
							const price = ethers.formatUnits(
								unformattedPrice.toString(),
								"ether"
							);
							console.log('wtf', image, name,description, tokenId );
							return {
								price,
								tokenId: parseInt(tokenId),
								seller,
								owner,
								image,
								name,
								description,
								tokenURI,
							};
						}
					)
				);
				return items;
			}
		} catch (error) {
			// setError("Error while fetching listed NFTs");
			// setOpenError(true);
		}
	};

	// useEffect(() => {
	// 	// fetchMyNFTsOrListedNFTs();
	// }, []);


	//---BUY NFTs FUNCTION
	const buyNFT = async (nft) => {
		try {
			const contract = await connectingWithSmartContract();
			const price = ethers.parseUnits(nft.price.toString(), "ether");

			const transaction = await contract.createMarketSale(nft.tokenId, {
				value: price,
			});

			await transaction.wait();
			router.push("/author");
		} catch (error) {
			setError("Error While buying NFT");
			setOpenError(true);
		}
	};

	return (
		<NFTMarketplaceContext.Provider
			value={{
				titleData,
				currentAccount,
				connectWallet,
				checkIfWalletConnected,
				fetchMyNFTsOrListedNFTs,
				buyNFT,
				fetchNFTs,
				createSale,
				createNFT,
				uploadToIPFS,
				openError,
				error,
				setOpenError,
				loading,
				setLoading,
			}}
		>
			{children}
		</NFTMarketplaceContext.Provider>)
}