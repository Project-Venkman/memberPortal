import React, { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    ConnectedButton,
    ConnectedButtonContainer,
    ConnectedButtonGrid,
    ConnectedButtonText,
    WalletIcon,
} from '@styles/Login.styled';
import {
    useAccount,
    useDisconnect,
    usePublicClient,
    useSignMessage,
    useWalletClient,
} from 'wagmi';
import { Api, truncateAddress } from '@pages/scripts';
import { Web3ModalProvider } from '@components/Wallet/provider';
import { ethers, providers } from 'ethers';
import { SiweMessage } from 'siwe';
import { setWalletAddress } from '@state/features';
import { Magic } from 'magic-sdk';

export const PVLogin = () => {
    const { open, close } = useWeb3Modal();
    const { isConnected, isDisconnected, address, status } = useAccount();
    const { disconnect } = useDisconnect();
    const publicClient = usePublicClient();
    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage(
        { message: 'Please sign this message to authenticate' }
    );
    axios.defaults.withCredentials = true;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const label = isConnected ? 'Disconnect' : 'Connect Wallet';
    const onOpen = async () => {
        clearAllCookies();
        setLoading(true);
        await open();
        setLoading(false);
    };
    const onClick = async () => {
        if (isConnected) {
            disconnect();
            new Magic(process.env.REACT_APP_MAGIC_KEY as string).user.logout();
        } else await onOpen();
    };

    useEffect(() => {
        (async () => {
            const domain = window.location.host;
            const origin = window.location.origin;
            let nonce = await Api.auth.generateChallenge();
            let siweMessage = new SiweMessage({
                domain: domain,
                address: address,
                statement: origin,
                uri: origin,
                version: '1',
                chainId: 1,
                nonce: nonce,
            });
            let message = siweMessage.toMessage();
            setMessage(message);
            signMessage({ message: message });
        })();
    }, [isConnected, address]);

    useEffect(() => {
        (async () => {
            if (isSuccess && address) {
                try {
                    await Api.auth.issueTokens(message, data!.toString());
                } catch (err: any) {
                    if (err.response && err.response.status === 403) {
                        navigate('/login');
                    }
                }
                localStorage.setItem('IssuedTokens', 'true');
                dispatch(setWalletAddress(address!.toString()));
                navigate('/Results');
            }
        })();
    }, [isSuccess, address]);

    return (
        <ConnectedButtonGrid id={'connected-button-grid'}>
            <ConnectedButtonContainer id={'connected-button-container'}>
                <ConnectedButton
                    id={'connected-button'}
                    type="button"
                    className="btn btn-primary connectWallet"
                    onClick={onClick}
                >
                    <ConnectedButtonText>
                        <WalletIcon />
                        {loading ? 'Loading...' : label}
                    </ConnectedButtonText>
                    <span className={'text-xs text-gray-600 flex-nowrap'}>
                        {isConnected
                            ? 'Connected to ' +
                              truncateAddress(address!.toString())
                            : ''}
                    </span>
                </ConnectedButton>
            </ConnectedButtonContainer>
        </ConnectedButtonGrid>
    );
};

const clearAllCookies = () => {
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf('=');
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie =
            name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
};

const returnMessage = () => {};
