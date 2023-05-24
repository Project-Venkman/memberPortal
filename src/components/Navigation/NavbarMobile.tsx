import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBarProps } from '@customtypes/index';
import { ResultPageNavListItem, ResultPageNavMobile } from '@styles/index';
import { IoMenuSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

export const NavbarMobile: React.FC<NavBarProps> = (props) => {
    const { modalOpen, setModalOpen, setModalType } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const navMobileButtons: Array<string> = [
        'media',
        'claim',
        'events',
        'burn',
    ];

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
                    return (
                        <ResultPageNavListItem
                            key={btn}
                            hidden={btn === 'events'}
                            value={btn}
                            onClick={() => {
                                // if (modalOpen) setModalOpen(!modalOpen);
                                // handleMobileDataModalClick(btn);
                                // setShowMenu(!showMenu);
                            }}
                        >
                            {btn === 'burn' && (
                                <span onClick={handleBurnClick}>{btn}</span>
                            )}
                            {btn === 'claim' && <span>{btn}</span>}
                            {btn === 'media' && <span>{btn}</span>}
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
