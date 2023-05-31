import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Asset, Claim as ClaimType, NavBarProps } from '@customtypes/index';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navButtons: Array<string> = ['media', 'claim', 'burn'];

    // const navButtons: Array<string> = ["media", "claim", "events", "Profile"];

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
                if (
                    (btn === 'claim' && claims[0].assetId) ||
                    btn === 'media' ||
                    (btn === 'burn' && burns.length > 0)
                )
                    return (
                        <ResultPageNavButton
                            className="ml-8"
                            key={btn}
                            value={btn}
                            onClick={() => {
                                if (modalOpen) setModalOpen(!modalOpen);
                                handleDataModalClick(btn);
                            }}
                        >
                            <span>{btn}</span>
                            {/*{btn === 'Profile' && (*/}
                            {/*    <span onClick={handleProfileClick}>{btn}</span>*/}
                            {/*)}*/}
                        </ResultPageNavButton>
                    );
            })}
            {/* <button className={"font-barlow uppercase tracking-[1.5px] text-[18px] leading-[28.8px] font-black antialiased hover:animate-pulse hover:text-gold"} onClick={handleBurnClick} >Burn</button> */}
            <button
                className={
                    'absolute right-0  uppercase px-8 text-gray-700 hover:text-gray-500'
                }
                onClick={handleClick}
            >
                Logout
            </button>
        </ResultPageNav>
    );
};

export default NavbarDesktop;
