import WalletConnectProvider from '@walletconnect/web3-provider';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from 'web3modal';
import { Magic, UserInfo } from 'magic-sdk';
import { ledger } from 'web3modal/dist/providers/connectors';
//import axios from 'axios';

const magicKey: string | undefined = process.env.REACT_APP_MAGIC_KEY as string;
const infuraKey: string | undefined = process.env.REACT_APP_INFURA_KEY as string;
const alchemyKey = process.env.REACT_APP_ALCHEMY_API_KEY as string;

const magic = new Magic(magicKey, {
    network: 'mainnet',
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
            infuraId: infuraKey, // required
            //rpc: `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`, // Optional if `infuraId` is provided; otherwise it's required
            darkMode: true,
            chains: [1],
            optionalChains: [5]
        },
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: 'web3modal', // Required
            //infuraId: "https://mainnet.infura.io/v3/cadcede23805433d8a998682be5bc221", // Required
            infuraId: infuraKey, // Required
            //rpc: `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`, // Optional if `infuraId` is provided; otherwise it's required
            chainId: 1, // Optional. It defaults to 1 if not provided
            darkMode: true, // Optional. Use dark theme, defaults to false
        },
    },
    /*'ledger': {
        package: ledger,
        options: {
            darkMode: true,
            chainId: 1,
        },
        display: {
          name: 'Ledger',
            description: 'Connect to Ledger',
        }
    },*/
    'custom-wallet': {
        package: magic,
        options: {
            darkMode: true,
            chainId: 1,
        },
        display: {
            name: 'MagicLink',
            description: 'Log in with MagicLink',
            onClick: () => {
                // Implement the MagicLink login logic here
            },
        },
        // move over to the drop page.

        connector: async () => {
            const accounts: string[] = await magic.wallet.connectWithUI();
            try {
                const userInfo: UserInfo =
                    await magic.wallet.requestUserInfoWithUI({
                        scope: { email: 'required' },
                    });
            } catch (err) {
                console.log(err);
            }

            return magic.wallet.getProvider();
        },
    },
};

export const Web3ModalProvider = new Web3Modal({
    lightboxOpacity: 0,
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    //displayNoInjectedProvider: false,
    disableInjectedProvider: false,
    providerOptions, // required
    theme: 'dark',
});
