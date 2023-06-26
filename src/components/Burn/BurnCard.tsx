import React, { useEffect, useState } from 'react';
import {
    BurnButtonContainer,
    BurnCardContainer,
    BurnImage,
    BurnImageContainer,
    BurnDataHeader,
    BurnName,
} from '@styles/index';
import { Burn, BurnCardProps, BurnDataOptions } from '@customtypes/Burn';
import { Asset, BurnAsset } from '@customtypes/index';
import { RootState } from '@state/store';
import { ethers } from 'ethers';
import { abi_721 } from '@components/Burn/abi_721';
import Web3Modal from 'web3modal';
import { useDispatch, useSelector } from 'react-redux';
import { Web3ModalProvider } from '@components/Wallet';
import { BurnURL } from '@components/Burn/BurnURL';
import { Api } from '@pages/scripts';
import {
    setBurnAssets,
    setEmptyWallet,
    setWallet,
    setWalletAssets,
} from '@state/features';
import { useNavigate } from 'react-router-dom';
import { useSetAssets } from '@components/Loading';
import Upgrade from '@assets/images/Upgrade.png';
import { UpgradeModal } from '@components/Burn';
import C3D from '@assets/images/C3D.png';
export const BurnCard: React.FC<BurnCardProps> = (props) => {
    const [leftImage, setLeftImage] = useState<string>('');
    const [selected, setSelected] = useState<string>('');
    const { index, burnAsset, copiedAddress, onClick } = props;
    const [disabled, setDisabled] = useState<boolean>(false);
    const [tailwindCss, setTailwindCss] = useState<string>('');
    const [comingSoonCard, setComingSoonCard] = useState<React.ReactNode | any>(
        <div
            className={`w-full p-4 cursor-not-allowed hover:bg-gray-200 border border-gray-300 rounded-lg ${selected === 'right' ? 'bg-gray-200' : ''
                }`}
            style={{ opacity: 0.5 }}
        >
            <div className="mb-4 flex justify-center">
                {/* <img src={VPass} alt="Venkman Pass" className="w-1/2 h-auto rounded-lg mx-auto" /> */}
            </div>
            <h2 className="text-xl font-bold mb-4">Coming Soon</h2>
            <p>This will be coming soon</p>
        </div>
    );


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [burnStatus, setBurnStatus] = useState<string>('Click here to burn');
    const walletAddress: string = useSelector(
        (state: RootState) => state.walletAddress
    );
    const walletAssets: Array<Asset> = useSelector(
        (state: RootState) => state.walletAssets
    );
    const [refreshBurn, setRefreshBurn] = useState<boolean>(false);
    const setAssets = useSetAssets(walletAddress);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // New state for modal visibility



    const handleCardClick = async () => {
        if (burnAsset.burnNow === '3dglasses') {
            setLeftImage(Upgrade)
            setIsModalOpen(true); // Open the modal
        } else if (burnAsset.burnNow === 'burnandturn') {
            // await getProvider();
            setSelected('left');
            setComingSoonCard(null);
            setLeftImage(C3D);
            setIsModalOpen(true); // Open the modal
        }
        if (disabled) return;
    };
    const selectLeft = () => {
        setSelected('left');
        setComingSoonCard(null);
    };

    const handleVPUpgrade = async () => {
        console.log('Venkman Upgrade');
        setSelected('right');
    };
    const handleSubmit = async () => {
        setIsModalOpen(false);
        setSelected('');
        setComingSoonCard(<div
            className={`w-full p-4 cursor-not-allowed hover:bg-gray-200 border border-gray-300 rounded-lg ${selected === 'right' ? 'bg-gray-200' : ''
                }`}
            style={{ opacity: 0.5 }}
        >
            <div className="mb-4 flex justify-center">
                {/* <img src={VPass} alt="Venkman Pass" className="w-1/2 h-auto rounded-lg mx-auto" /> */}
            </div>
            <h2 className="text-xl font-bold mb-4">Coming Soon</h2>
            <p>This will be coming soon</p>
        </div>);
    }

    // console.log(selected)
    return (
        <>
            {isModalOpen && (
                <UpgradeModal
                    selected={selected}
                    selectLeft={selectLeft}
                    rightCard={comingSoonCard}
                    closeModal={handleSubmit}
                    // billGoldImage={Upgrade}
                    burnAsset={burnAsset}
                    burnNow={burnAsset.burnNow}
                    leftImage={leftImage}
                />
            )}
            <BurnCardContainer
                className={tailwindCss}
                onClick={handleCardClick}
                id={'burn-' + index}
                style={{ height: '300px' }}
            >


                <BurnDataHeader id={'Burn-header-info'}>
                    <BurnName id={'Burn-name'}>
                        {burnAsset.name! + ': ' + burnAsset.tokenId ?? ''}
                    </BurnName>
                </BurnDataHeader>
                <BurnImageContainer>
                    {burnAsset.animation ? (
                        <video
                            className={'max-h-[174px] w-full'}
                            //@ts-ignore
                            onMouseOver={(event) => event.target.play()}
                            //@ts-ignore
                            onMouseOut={(event) => event.target.pause()}
                            loop
                            muted
                        >
                            <source src={burnAsset.animation} type="video/mp4" />
                        </video>
                    ) : (
                        <BurnImage src={burnAsset.image} />
                    )}
                </BurnImageContainer>
                <BurnButtonContainer>
                    <BurnURL burnStatus={burnStatus} disabled={disabled} />
                </BurnButtonContainer>
            </BurnCardContainer>
        </>
    );
};
