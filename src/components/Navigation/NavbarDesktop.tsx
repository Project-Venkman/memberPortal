import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Asset,
    Claim as ClaimType,
    Media as MediaType,
    NavBarProps,
} from '@customtypes/index';
import { ResultPageNav, ResultPageNavButton } from '@styles/index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@state/store';

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
    const navButtons: Array<string> = ['media', 'claim', 'burn'];

    const [isMediaAvailable, setIsMediaAvailable] = useState(false);
    const [isClaimAvailable, setIsClaimAvailable] = useState(false);
    const [isBurnAvailable, setIsBurnAvailable] = useState(false);

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
        navigate('/Transfer');
    };

    return (
        <ResultPageNav id="resultpagenav">
            {navButtons.map((btn: string) => {
                const isDisabled =
                    (btn === 'media' && !isMediaAvailable) ||
                    (btn === 'claim' && !isClaimAvailable) ||
                    (btn === 'burn' && !isBurnAvailable);

                return (
                    <ResultPageNavButton
                        className={`ml-8 ${
                            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
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
                    </ResultPageNavButton>
                );
            })}
            <button
                className={
                    'absolute right-0 uppercase px-8 text-gray-700 hover:text-gray-500'
                }
                onClick={handleClick}
            >
                Logout
            </button>
        </ResultPageNav>
    );
};

export default NavbarDesktop;
