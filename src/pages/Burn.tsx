import React, { useEffect, useState } from 'react';
import { Asset, BurnProps } from '@customtypes/index';
import { BurnCard } from '@components/Burn';
import {
    BurnBlocker,
    BurnContainer,
    BurnContainerHeader,
    BurnHeader,
    BurnItems,
    BurnPage,
} from '@styles/index';
import { RootState } from '@state/store';
import { FaRegCopy, FaCheckCircle } from 'react-icons/fa';
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { abi_721 } from '@components/Burn/abi_721';
import { Web3ModalProvider } from '@components/Wallet';
import { useDispatch, useSelector } from 'react-redux';

export const Burn: React.FC<BurnProps> = (props) => {
    const dispatch = useDispatch();

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 2200 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 2200, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 413 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 413, min: 350 },
            items: 2,
        },
    };
    const {} = props;
    const navigate = useNavigate();
    const burns: Array<Asset> = useSelector(
        (state: RootState) => state.burnAssets as Array<Asset>
    );
    const [copied, setCopied] = useState<boolean>(false);

    const handleHomeClick = () => {
        // const url = new URL(window.location.href);
        // const origin = url.origin;
        //
        // window.location.href(origin);
        window.location.reload();
    };
    const handleClick = () => {
        window.localStorage.clear();
        dispatch({ type: 'RESET' });
        navigate('/Login');
    };
    useEffect(() => {
        if (burns.length < 1) {
            navigate('/Results');
        }
    }, [burns]);

    return (
        <BurnPage className={'max-w-[1920px] md:px-32 mt-16'} id={'burn-page'}>
            <div>
                <button
                    className={
                        'font-barlow uppercase tracking-[1.5px] text-[18px] leading-[28.8px] text-white antialiased hover:animate-pulse hover:text-gold'
                    }
                    onClick={handleHomeClick}
                >
                    Home
                </button>
                <button
                    className={
                        'absolute right-0 uppercase px-8 text-gray-700 hover:text-gray-500'
                    }
                    onClick={handleClick}
                >
                    Logout
                </button>
            </div>
            <BurnContainer id={'Burn-container'}>
                <BurnContainerHeader id={'Burn-header'}>
                    <BurnHeader>Burn and Turn!</BurnHeader>
                </BurnContainerHeader>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                    {burns[0] &&
                        burns.map((burn: Asset, i: number) => (
                            <div
                                className="w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto max-w-[222px]"
                                key={i}
                            >
                                <BurnCard
                                    index={i}
                                    burnAsset={burn}
                                    copiedAddress={copied} // Pass the click event handler
                                />
                            </div>
                        ))}
                </div>
            </BurnContainer>
        </BurnPage>
    );
};

export default Burn;
