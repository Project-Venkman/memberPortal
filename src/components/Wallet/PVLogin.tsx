import React, { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    ConnectedButton,
    ConnectedButtonContainer,
    ConnectedButtonGrid,
    ConnectedButtonText, WalletIcon,
} from '@styles/Login.styled';
import { useAccount, useDisconnect } from 'wagmi';
import { truncateAddress } from '@pages/scripts';

export const PVLogin = () => {
    const { open, close } = useWeb3Modal();
    const { isConnected, isDisconnected, address, status } = useAccount();
    const { disconnect } = useDisconnect();
    axios.defaults.withCredentials = true;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const label = isConnected ? 'Disconnect' : 'Connect Wallet';
    const onOpen = async () => {
        setLoading(true);
        await open();
        setLoading(false);
    };
    const onClick = async () => {
        if(isConnected) disconnect();
        else await onOpen();
    }

    useEffect(() => {}, []);

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
                    <span className={"text-white text-xs text-gray-600 flex-nowrap"}>{isConnected ? "Connected to " + truncateAddress(address!.toString()) : ""}</span>
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