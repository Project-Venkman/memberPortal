import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from "web3modal";

const providerOptions = {
	injected: {
		package: null,
		options: {
			darkMode: true
		}
	},
	walletconnect: {
		package: WalletConnectProvider, // required
		options: {
			infuraId: "cadcede23805433d8a998682be5bc221", // required
			darkMode: true,
		},
	},
	coinbasewallet: {
		package: CoinbaseWalletSDK, // Required
		options: {
			appName: "web3modal", // Required
			//infuraId: "https://mainnet.infura.io/v3/cadcede23805433d8a998682be5bc221", // Required
			infuraId: "cadcede23805433d8a998682be5bc221", // Required
			rpc: "", // Optional if `infuraId` is provided; otherwise it's required
			chainId: 1, // Optional. It defaults to 1 if not provided
			darkMode: true, // Optional. Use dark theme, defaults to false
		},
	}
};

export const Web3ModalProvider = new Web3Modal({
	lightboxOpacity: 0,
	network: "mainnet", // optional
	cacheProvider: false, // optional
	//displayNoInjectedProvider: false,
	disableInjectedProvider: false,
	providerOptions, // required
	theme: "dark"
});