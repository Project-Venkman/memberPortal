import React, { useEffect } from 'react';
import '@styles/output.css';
import MRoutes from './MRoutes';
import Login from '@pages/Login';
import { mainnet, polygon, goerli, polygonMumbai } from 'wagmi/chains';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import CBLogo from '@assets/cbwallet.png';
import { MagicConnectConnector } from '@everipedia/wagmi-magic-connector';
import * as process from 'process';

const projectId = process.env.REACT_APP_WC_APP_ID as string;
const alchemyKey = process.env.REACT_APP_ALCHEMY_API_KEY as string;
const magicKey = process.env.REACT_APP_MAGIC_KEY as string;

const { chains, publicClient } = configureChains(
    [mainnet, polygon, goerli, polygonMumbai],
    [alchemyProvider({ apiKey: alchemyKey })]
);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
        new CoinbaseWalletConnector({
            chains: [mainnet],

            options: {
                appName: 'Project Venkman',
                jsonRpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`,
            },
        }),
        new MagicConnectConnector({
            chains: [mainnet, goerli],
            options: {
                apiKey: magicKey,
            },
        }),
        ...w3mConnectors({ projectId, chains }),
    ],
    publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const App = () => {
    useEffect(() => {
        console.log({ alchemyKey });
    }, []);

    return (
        <div className="App">
            <WagmiConfig config={wagmiConfig}>
                <MRoutes />
            </WagmiConfig>
            <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
                walletImages={{
                    coinbaseWallet: CBLogo,
                }}
            />
        </div>
    );
};

export default App;
