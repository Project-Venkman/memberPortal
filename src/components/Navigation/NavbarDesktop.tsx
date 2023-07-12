import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Asset,
    Claim as ClaimType,
    Media as MediaType,
    NavBarProps,
} from '@customtypes/index';
import {
    ConnectedButton,
    ConnectedButtonContainer,
    ConnectedButtonGrid,
    ConnectedButtonText,
    ResultPageNav,
    ResultPageNavButton,
    WalletIcon,
} from '@styles/index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@state/store';
import { useAccount, useDisconnect } from 'wagmi';
import { truncateAddress } from '@pages/scripts';
import { Magic } from 'magic-sdk';

export const NavbarDesktop: React.FC<NavBarProps> = (props) => {
    const { modalOpen, setModalOpen, setModalType } = props;
    const claims: Array<ClaimType> = useSelector(
        (state: RootState) => state.claimAssets as Array<ClaimType>
    );
    const burns: Array<Asset> = useSelector(
        (state: RootState) => state.burnAssets as Array<Asset>
    );
    const currentMediaAssets: Array<MediaType> = useSelector(
        (state: RootState) => state.mediaAssets
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { disconnect } = useDisconnect();
    const { isConnected, isDisconnected, address, status } = useAccount();

    const navButtons: Array<string> = ['media', 'claim', 'burn'];

    const [isMediaAvailable, setIsMediaAvailable] = useState(false);
    const [isClaimAvailable, setIsClaimAvailable] = useState(false);
    const [isBurnAvailable, setIsBurnAvailable] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const label = isConnected ? 'Disconnect' : 'Connect Wallet';

    useEffect(() => {
        setIsMediaAvailable(currentMediaAssets.length > 0); // Enable media button if there are claims
        setIsClaimAvailable(claims[0]?.assetId.length > 0); // Enable claim button if there are claims
        setIsBurnAvailable(burns.length > 0); // Enable burn button if there are burns
        // console.log('claims', claims);
        // console.log('burns', burns);
        // console.log('currentMediaAssets', currentMediaAssets);
    }, [claims, burns, currentMediaAssets]);
    const handleDataModalClick = (e: string) => {
        setModalType(e);
        setModalOpen(true);
    };

    const handleClick = () => {
        disconnect();
        window.localStorage.clear();
        dispatch({ type: 'RESET' });
        const url = new URL(window.location.href);
        if (url.pathname.includes('pv')) {
            navigate('/PVLogin');
        } else if (url.pathname.includes('ELF')) {
            navigate('/ELFLogin');
        } else {
            navigate('/Login');
        }
    };

    const handleBurnClick = () => {
        navigate('/Burn');
    };

    const handleProfileClick = () => {
        navigate('/ProfilePage');
    };

    const onOpen = async () => {
        clearAllCookies();
        setLoading(true);
        await open();
        setLoading(false);
    };
    const onClick = async () => {
        if (isConnected) {
            disconnect();
            //new Magic(process.env.REACT_APP_MAGIC_KEY as string).user.logout();
            window.localStorage.clear();
            dispatch({ type: 'RESET' });
            localStorage.clear();
            const url = new URL(window.location.href);
            if (url.pathname.includes('pv')) {
                navigate('/PVLogin');
            } else if (url.pathname.includes('ELF')) {
                navigate('/ELFLogin');
            } else {
                navigate('/Login');
            }
        } else await onOpen();
    };

    return (
        <ResultPageNav id="resultpagenav">
            {isConnected &&
                navButtons.map((btn: string) => {
                    const isDisabled =
                        (btn === 'media' && !isMediaAvailable) ||
                        (btn === 'claim' && !isClaimAvailable) ||
                        (btn === 'burn' && !isBurnAvailable);

                    return (
                        <ResultPageNavButton
                            className={`ml-8 ${
                                isDisabled
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                            }`}
                            key={btn}
                            value={btn}
                            onClick={() => {
                                if (modalOpen) setModalOpen(!modalOpen);
                                if (btn === 'burn') {
                                    navigate('/Burn');
                                } else {
                                    handleDataModalClick(btn);
                                }
                            }}
                            disabled={isDisabled}
                        >
                            <span>{btn}</span>
                            {/*{btn === 'profile' && (*/}
                            {/*    <span onClick={handleProfileClick}>Profile</span>*/}
                            {/*)}*/}
                        </ResultPageNavButton>
                    );
                })}
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
            {/*<button
                className={
                    'absolute right-0 uppercase px-8 text-gray-700 hover:text-gray-500'
                }
                onClick={handleClick}
            >
                Logout
            </button>*/}
        </ResultPageNav>
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

export default NavbarDesktop;
