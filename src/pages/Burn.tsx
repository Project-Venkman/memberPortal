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
import { useSelector } from 'react-redux';
import { FaRegCopy, FaCheckCircle } from 'react-icons/fa';
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { abi_721 } from '@components/Burn/abi_721';
import { Web3ModalProvider } from '@components/Wallet';

export const Burn: React.FC<BurnProps> = (props) => {
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
        navigate('/Results');
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
            </div>
            <BurnContainer id={'Burn-container'}>
                <BurnContainerHeader id={'Burn-header'}>
                    <BurnHeader>Burn and Turn!</BurnHeader>
                </BurnContainerHeader>

                <BurnItems id={'burn-items'}>
                    {/* {!copied && <BurnBlocker><p>Copy ETH Address Above To Burn</p></BurnBlocker>} */}
                    {burns[0] && (
                        // Height needs to be 90% and width 100% to make the carousel work
                        <Carousel
                            className="flex-col lg:flex-row lg:items-center lg:relative lg:w-full sm:mx-auto lg:align-middle 2xl:justify-center"
                            swipeable={true}
                            draggable={false}
                            showDots={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={false}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container flex flex-col items-center overflow-hidden"
                            dotListClass="custom-dot-list-style"
                            sliderClass="flex sm:flex-wrap-reverse md:flex-nowrap items-center justify-center w-full"
                            itemClass="carousel-item-padding-40-px w-1/2 max-w-[300px] h-full mt-12 min-h-[320px]"
                        >
                            {burns.map((burn: Asset, i: number) => {
                                return (
                                    <BurnCard
                                        key={i}
                                        index={i}
                                        burnAsset={burn}
                                        copiedAddress={copied} // Pass the click event handler
                                    />
                                );
                            })}
                        </Carousel>
                    )}
                </BurnItems>
            </BurnContainer>
        </BurnPage>
    );
};

export default Burn;
