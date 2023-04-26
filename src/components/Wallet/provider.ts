import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from "web3modal";
import { Magic, UserInfo } from "magic-sdk";
import axios from "axios";
const magicKey: string | undefined = process.env.REACT_APP_MAGIC_KEY as string;
console.log(magicKey);
const magic = new Magic(magicKey, {
	network: "goerli",
});

const providerOptions = {
	injected: {
		package: null,
		options: {
			darkMode: true,
		},
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
	},
	"custom-wallet": {
		package: magic,
		options: {
			darkMode: true,
		},
		display: {
			name: "MagicLink",
			description: "Log in with MagicLink",
			onClick: () => {
				console.log("onClick");
				// Implement the MagicLink login logic here
			},
		},
		// move over to the drop page.

		connector: async () => {
			const accounts: string[] = await magic.wallet.connectWithUI();
			console.log("Logged in user:", accounts[0]);
			const userInfo: UserInfo = await magic.wallet.requestUserInfoWithUI({
				scope: { email: "required" },
			});
			console.log("userinfo", userInfo);

			return magic.wallet.getProvider();
		},
	},
};

export const Web3ModalProvider = new Web3Modal({
	lightboxOpacity: 0,
	network: "mainnet", // optional
	cacheProvider: false, // optional
	//displayNoInjectedProvider: false,
	disableInjectedProvider: false,
	providerOptions, // required
	theme: "dark",
});
