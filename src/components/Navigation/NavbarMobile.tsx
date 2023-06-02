import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Asset,
    Claim as ClaimType,
    Media as MediaType,
    NavBarProps,
} from '@customtypes/index';

import { ResultPageNavListItem, ResultPageNavMobile } from '@styles/index';
import { IoMenuSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@state/store';

export const NavbarMobile: React.FC<NavBarProps> = (props) => {
    const { modalOpen, setModalOpen, setModalType } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const navMobileButtons: Array<string> = ['media', 'claim', 'burn'];
    const claims: Array<ClaimType> = useSelector(
        (state: RootState) => state.claimAssets as Array<ClaimType>
    );
    const burns: Array<Asset> = useSelector(
        (state: RootState) => state.burnAssets as Array<Asset>
    );
    const currentMediaAssets: Array<MediaType> = useSelector(
        (state: RootState) => state.mediaAssets
    );

    const handleMobileDataModalClick = (e: string) => {
        setModalType(e);
        setModalOpen(true);
    };

    const handleMobileClick = () => {
        window.localStorage.clear();
        dispatch({ type: 'RESET' });
        navigate('/Login');
    };

    const handleBurnClick = () => {
        navigate('/Burn');
    };

    return (
        <ResultPageNavMobile id="resultpagenavmobile">
            <button className={'text-white px-4'} hidden={showMenu}>
                <IoMenuSharp
                    className={'text-2xl'}
                    onClick={() => setShowMenu(!showMenu)}
                />
            </button>
            {showMenu && (
                <div
                    className={'h-screen w-full absolute top-0 left-0'}
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                />
            )}
            <ul
                hidden={!showMenu}
                className={
                    'bg-black w-full relative mt-[100px] sm:mt-[15%] h-full'
                }
            >
                {navMobileButtons.map((btn: string) => {
                    const isMediaAvailable = currentMediaAssets.length > 0;
                    const isClaimAvailable = claims[0]?.assetId?.length > 0;
                    const isBurnAvailable = burns.length > 0;
                    const isDisabled =
                        (btn === 'media' && !isMediaAvailable) ||
                        (btn === 'claim' && !isClaimAvailable) ||
                        (btn === 'burn' && !isBurnAvailable);

                    return (
                        <ResultPageNavListItem
                            key={btn}
                            className={isDisabled ? 'cursor-not-allowed' : ''}
                            onClick={() => {

                                    if (btn === 'media' || btn === 'claim') {
                                        if (modalOpen) setModalOpen(!modalOpen);
                                        handleMobileDataModalClick(btn);
                                        setShowMenu(!showMenu);
                                    } else if (btn === 'burn') {
                                        handleBurnClick();
                                    }
                                }
                            }}
                        >
                            <span>{btn}</span>
                        </ResultPageNavListItem>
                    );

                })}
                <ResultPageNavListItem>
                    <button
                        className={
                            'uppercase font-barlow font-black text-[20px] text-gray-700 hover:text-gray-500 text-start'
                        }
                        onClick={handleMobileClick}
                    >
                        Logout
                    </button>
                </ResultPageNavListItem>
            </ul>
        </ResultPageNavMobile>
    );
};

export default NavbarMobile;
