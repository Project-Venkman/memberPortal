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
    const copyAddress = () => {
        setCopied(true);
        navigator.clipboard.writeText('bm1000burnandturn.eth');
    };

    const handleHomeClick = () => {
        navigate('/BMResult');
    };

    useEffect(() => {
        if (burns.length < 1) {
            navigate('/BMResult');
        }
    }, [burns]);

    return (
        <BurnPage className={'max-w-[1920px] px-32 mt-16'} id={'burn-page'}>
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
                {/*<ul className={'text-white text-xl m-4'}>*/}
                {/*    <li className={'mb-4'}>*/}
                {/*        We know you’ve all been patiently waiting for the*/}
                {/*        opportunity to burn those Burning Curtains in your*/}
                {/*        wallets for some 3D Glasses! Well, the wait is over.*/}
                {/*    </li>*/}
                {/*    <li className={'mb-4 flex flex-row'}>*/}
                {/*        To burn, all you need to do is transfer your Burning*/}
                {/*        Curtains to this ETH address:&ensp;*/}
                {/*        <div>*/}
                {/*            <span className={'text-gold'}>*/}
                {/*                bm1000burnandturn.eth*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        {copied ? (*/}
                {/*            <FaCheckCircle className={'ml-2'} />*/}
                {/*        ) : (*/}
                {/*            <button*/}
                {/*                className={'ml-1 text-lg hover:text-gold'}*/}
                {/*                onClick={copyAddress}*/}
                {/*            >*/}
                {/*                <FaRegCopy />*/}
                {/*            </button>*/}
                {/*        )}*/}
                {/*    </li>*/}
                {/*    <li className={'mb-4'}>*/}
                {/*        Project Venkman will airdrop one pair of 3D Glasses into*/}
                {/*        your wallet for every Burning Curtain that you redeem!*/}
                {/*        We expect a firestorm of curtains in these first few*/}
                {/*        days, but we will get the airdrops to you as quickly as*/}
                {/*        possible!*/}
                {/*    </li>*/}
                {/*    <li className={'mb-4'}>*/}
                {/*        After the burn is completed, we will update the Member*/}
                {/*        Portal with a new minting function (3D Glasses) where*/}
                {/*        you can redeem 3D Glasses for a custom attribute upgrade*/}
                {/*        or a new collection claim.*/}
                {/*    </li>*/}
                {/*</ul>*/}
                <BurnItems id={'burn-items'}>
                    {/* {!copied && <BurnBlocker><p>Copy ETH Address Above To Burn</p></BurnBlocker>} */}
                    {burns[0] && (
                        // Height needs to be 90% and width 100% to make the carousel work
                        <Carousel
                            className="items-center relative w-full sm:mx-auto align-middle 2xl:justify-center"
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
                            containerClass="carousel-container flex overflow-hidden"
                            dotListClass="custom-dot-list-style"
                            sliderClass={'flex relative w-full justify-center'}
                            itemClass="carousel-item-padding-40-px w-1/2 max-w-[300px] h-full"
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
