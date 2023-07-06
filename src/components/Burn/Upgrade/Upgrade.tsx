import React, { useState, FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Asset } from '@customtypes/index';
import { RootState } from '@state/store';
import { Web3ModalProvider } from '@components/Wallet';
import { ethers } from 'ethers';
import { BurnAsset } from '@customtypes/index';
import { abi_721 } from '@components/Burn/abi_721';
import { useNavigate } from 'react-router';
import { Api } from '@pages/scripts';
import {
    UpgradeModalBody,
    UpgradeModalBodyLeft,
    UpgradeModalBodyLeftImageContainer,
    UpgradeModalBodyLeftTextContainer,
    UpgradeModalContainer,
    UpgradeModalFooter,
    UpgradeModalHeader,
    UpgradeModalOverlay,
    UpgradeSelectionBodyContainer,
    UpgradeSelectionContainer,
    UpgradeSelectionHeader,
    UpgradeSpinnerContainer,
    UpgradeModalWrapper,
} from '@styles/Upgrade.styled';
import { Upgrade3D } from '@components/Burn/Upgrade/Upgrade3D';
import { BurnCurtain } from '@components/Burn/Upgrade/BurnCurtain';

interface UpgradeModalProps {
    selected: string | null;
    selectLeft: () => void;
    rightCard: JSX.Element;
    closeModal: () => void;
    leftImage: string;
    burnNow: string;
    burnAsset: BurnAsset;
}

interface BurnNowText {
    h2: string;
    p1: string;
    p2: string;
}

export const UpgradeModal: FC<UpgradeModalProps> = ({
    selected,
    selectLeft,
    rightCard,
    closeModal,
    leftImage,
    burnNow,
    burnAsset,
}) => {
    // console.log(burnAsset)
    const navigate = useNavigate();

    const walletAddress: string = useSelector(
        (state: RootState) => state.walletAddress
    );
    const [isSelectModalOpen, setIsSelectModalOpen] = useState<boolean>(false);
    const [billBurn, setBillBurn] = useState<Asset | null>(null);
    const walletAssets: Array<Asset> = useSelector(
        (state: RootState) => state.walletAssets
    );
    const [burnStatus, setBurnStatus] = useState<string>('Burn');
    const [spinnerCss, setSpinnerCss] = useState<string>('initial');
    const [burnNowText, setBurnNowText] = useState<BurnNowText | null>(null);
    console.log(burnAsset);

    const getProvider = async () => {
        if (burnStatus === 'Item Has Been Burned Click Here to Refresh Site!') {
            navigate('/Results');
        } else {
            let provider = await Web3ModalProvider.connectTo(
                Web3ModalProvider.cachedProvider
            );
            let ethersProvider = new ethers.providers.Web3Provider(provider);
            let address =
                (await ethersProvider.resolveName('bm1000burnandturn.eth')) ||
                '0x4B77b0CcF0eB6125CeaBc4e9a43c7a87CDEDCeff';
            let signer = ethersProvider.getSigner();

            let BurnContract = new ethers.Contract(
                burnAsset.contractAddress,
                abi_721,
                signer
            );

            await BurnContract.transferFrom(
                walletAddress,
                address,
                burnAsset.tokenId
            ).then(async () => {
                setBurnStatus('Burning!');
                setSpinnerCss('burning');
            });

            const transferEventHandler = async (
                from: any,
                to: any,
                tokenId: any,
                event: any
            ) => {
                console.log('Event:', event);
                // setDisabled(true);
                // setTailwindCss('bg-gray-800 text-gray-500 rounded-md opacity-50');
                if (
                    burnAsset.contractId ===
                    '45a65ea1-e349-4003-8647-2025b905980d'
                ) {
                    setBurnStatus('Upgrading your 3D Glasses!');
                    // Here we will be calling the UpgradeBill3DFrame Api Call
                    await Api.asset
                        .UpgradeBill3DFrame(billBurn!.id)
                        .then(async (res) => {
                            console.log(res);
                            setBurnStatus(
                                '3D Glasses Upgraded! Click Here to Refresh Site!'
                            );
                        });
                } else {
                    setBurnStatus(
                        'Item Has Been Burned Click Here to Refresh Site!'
                    );
                }
                setSpinnerCss('initial');

                // End the watcher by removing the event listener
                BurnContract.off('Transfer', transferEventHandler);
            };
            BurnContract.on('Transfer', transferEventHandler);
        }
    };

    const addImageClick = () => {
        setIsSelectModalOpen(true);
    };
    const handleImageClick = (asset: Asset) => {
        setBillBurn(asset);
        setIsSelectModalOpen(false); // Optionally close the select modal after selecting an asset
        console.log(billBurn);
    };
    const handleSubmitBurnClick = () => {
        closeModal();
    };

    useEffect(() => {
        switch (burnAsset.burnNow) {
            case 'burnandturn':
                setBurnNowText({
                    h2: 'Burning Curtain Upgrade',
                    p1: 'Upgrade your burning curtain into a pair of 3D glasses',
                    p2: 'Description burnandturn',
                });
                break;
            case '3dglasses':
                setBurnNowText({
                    h2: '3D Glass Frame Upgrade',
                    p1: 'Upgrade your Bill Murray 3D glass frames',
                    p2: 'Description 3dglasses',
                });
                break;
            default:
                break;
        }
    }, [burnAsset.burnNow]);
    return (
        <UpgradeModalWrapper className="upgrade-modal">
            <UpgradeModalOverlay className="upgrade-modal-overlay" />
            <UpgradeModalContainer className="upgrade-modal-container">
                <UpgradeSpinnerContainer className={'spinner'} id={'spinner'}>
                    <svg
                        aria-hidden="true"
                        className={spinnerCss}
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </UpgradeSpinnerContainer>
                <UpgradeModalHeader className={'modal-header'}>
                    <p>Choose what you would like to do with your burn item.</p>
                </UpgradeModalHeader>
                <UpgradeModalBody className={'modal-body'}>
                    <UpgradeModalBodyLeft
                        className={'modal-body-left'}
                        onClick={selectLeft}
                    >
                        <UpgradeModalBodyLeftImageContainer>
                            {burnNow === '3dglasses' && (
                                <Upgrade3D
                                    selected={selected}
                                    leftImage={leftImage}
                                    addImageClick={addImageClick}
                                    billBurn={billBurn}
                                    burnAsset={burnAsset}
                                />
                            )}
                            {burnNow === 'burnandturn' && (
                                <BurnCurtain
                                    leftImage={leftImage}
                                    selected={selected!}
                                    burnAsset={burnAsset}
                                />
                            )}
                        </UpgradeModalBodyLeftImageContainer>
                        <UpgradeModalBodyLeftTextContainer>
                            <div>
                                <h2>{burnNowText?.h2}</h2>
                                <p>{burnNowText?.p1}</p>
                                <p>{burnNowText?.p2}</p>
                            </div>
                        </UpgradeModalBodyLeftTextContainer>
                    </UpgradeModalBodyLeft>
                    {rightCard}
                </UpgradeModalBody>
                <UpgradeModalFooter className="h-[10%] flex items-center justify-end">
                    {/* {burnStatus === 'Burn' && ( */}
                    <button className="cancel" onClick={closeModal}>
                        Cancel
                    </button>
                    {/* )} */}
                    {selected && (
                        <button className="burn-status" onClick={getProvider}>
                            {burnStatus}
                        </button>
                    )}
                </UpgradeModalFooter>
            </UpgradeModalContainer>
            {isSelectModalOpen && (
                <UpgradeSelectionContainer>
                    <UpgradeSelectionHeader>
                        <h2>Please Select Your Bill Murray to Upgrade</h2>
                    </UpgradeSelectionHeader>
                    <UpgradeSelectionBodyContainer>
                        <div>
                            {walletAssets
                                .filter((walletAsset) =>
                                    [
                                        '40000001-0001-0001-0002-000000000001',
                                        '40000001-0001-0001-0002-000000000002',
                                        'efe0d138-eb40-4ec8-8714-0d02ca5b59ab',
                                    ].includes(walletAsset.contractId)
                                )
                                .sort(
                                    (a, b) =>
                                        parseInt(a.tokenId) -
                                        parseInt(b.tokenId)
                                )
                                .map((walletAsset: Asset, i: number) => (
                                    <div key={i}>
                                        <img
                                            key={walletAsset.id}
                                            src={walletAsset.image}
                                            alt={walletAsset.name}
                                            onClick={() =>
                                                handleImageClick(walletAsset)
                                            }
                                        />
                                        <div>
                                            <p>{`${walletAsset.name} - ${walletAsset.tokenId}`}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </UpgradeSelectionBodyContainer>
                </UpgradeSelectionContainer>
            )}
        </UpgradeModalWrapper>
    );
};

export default UpgradeModal;