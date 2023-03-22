import {Network} from "@web3-react/network";
import {Web3ReactHooks} from "@web3-react/core";
import {Dispatch, SetStateAction} from "react";

export interface ConnectorButtonProps {
	accounts: Array<string> | undefined
	provider: ReturnType<Web3ReactHooks['useProvider']>
	connector: MetaMask | WalletConnect | CoinbaseWallet | Network
	chainId: ReturnType<Web3ReactHooks['useChainId']>
	isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
	error: Error | undefined
	setError: (error: Error | undefined) => void
	isActive: ReturnType<Web3ReactHooks['useIsActive']>
	walletType: "metamask" | "walletconnect" | "coinbase" | "network"
	imageLink?: string;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface ConnectorButtonGroupProps {

}

export interface WalletButtonProps {
	setLoading: Dispatch<SetStateAction<boolean>>;
}