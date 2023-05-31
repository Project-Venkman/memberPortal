import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Asset, Claim as ClaimType, NavBarProps } from '@customtypes/index';
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
                    if (
                        (btn === 'claim' && claims[0].assetId) ||
                        btn === 'media' ||
                        (btn === 'burn' && burns.length > 0)
                    )
                        return (
                            <ResultPageNavListItem
                                key={btn}
                                // hidden={btn === 'burn'}
                                value={btn}
                                onClick={() => {
                                    if (btn === 'media' || btn === 'claim') {
                                        if (modalOpen) setModalOpen(!modalOpen);
                                        handleMobileDataModalClick(btn);
                                        setShowMenu(!showMenu);
                                    } else if (btn === 'burn') {
                                        handleBurnClick();
                                    }
                                }}
                            >
                                {/*{btn === 'burn' && (*/}
                                {/*    <span onClick={handleBurnClick}></span>*/}
                                {/*)}*/}
                                {/*{btn === 'claim' && claims[0].assetId && (*/}
                                {/*    <span>{btn}</span>*/}
                                {/*)}*/}
                                {/*{btn === 'media' && <span>{btn}</span>}*/}
                                {/*{btn === 'burn' && burns.length > 0 && (*/}
                                {/*    <span>{btn}</span>*/}
                                {/*)}
                                 */}
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
