import React, { useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { Asset } from '@customtypes/index';
import { RootState } from '@state/store';
import Glasses from '@assets/images/3dglasses.png';
import addImage from '@assets/images/addImage.png';
import { Web3ModalProvider } from '@components/Wallet';
import { ethers } from 'ethers';
import { BurnAsset } from '@customtypes/index';
import { abi_721 } from '@components/Burn/abi_721';
import { useNavigate } from 'react-router';
import { Api } from '@pages/scripts';
interface UpgradeModalProps {
    selected: string | null;
    selectLeft: () => void;
    rightCard: JSX.Element;
    closeModal: () => void;
    leftImage: string;
    burnNow: string;
    burnAsset: BurnAsset;
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

    const [spinnerCss, setSpinnerCss] = useState<string>(
        'w-40 h-40 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 hidden'
    );
    console.log(burnAsset)
    const getProvider = async () => {
        if (burnStatus === 'Item Has Been Burned Click Here to Refresh Site!') {
            navigate('/Results')
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
                setSpinnerCss(
                    'w-40 h-40 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 '
                );
            });

            const transferEventHandler = async (from: any, to: any, tokenId: any, event: any) => {
                console.log('Event:', event);
                // setDisabled(true);
                // setTailwindCss('bg-gray-800 text-gray-500 rounded-md opacity-50');
                if (burnAsset.contractId === '45a65ea1-e349-4003-8647-2025b905980d') {
                    setBurnStatus('Upgrading your 3D Glasses!');
                    // Here we will be calling the UpgradeBill3DFrame Api Call
                    await Api.asset.UpgradeBill3DFrame(billBurn!.id)
                        .then(async (res) => {
                            console.log(res);
                            setBurnStatus('3D Glasses Upgraded! Click Here to Refresh Site!');
                        })
                } else {
                    setBurnStatus('Item Has Been Burned Click Here to Refresh Site!');
                }
                setSpinnerCss(
                    'w-40 h-40 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 hidden'
                );

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
        console.log(billBurn)
    };
    const handleSubmitBurnClick = () => {
        closeModal();
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute inset-0 z-60 bg-black/75"></div>
            <div className="modal-container relative bg-gold/75 border-2 border-gold border-solid h-[70%] w-[80%] rounded-lg z-70 flex flex-col">
                <div id={'spinner'} className="flex items-center justify-center w-full h-full absolute top-0 left-0 right-0 bottom-0">
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
                </div>
                <div className={"p-4 font-bold text-white text-xl h-[10%] flex items-center justify-center"}>
                    <p>Choose what you would like to do with your burn item.</p>
                </div>
                <div className="flex h-[80%] z-90 border-y border-gold border-solid bg-white">
                    <div
                        onClick={selectLeft}
                        className={`relative flex flex-col w-full z-90 p-4 cursor-pointer hover:bg-gray-200 border-r border-gold
                            }`}
                    >
                        <div className="flex flex-1 justify-center h-4/5">
                            {burnNow === '3dglasses' ? (
                                <div className="w-full">
                                    {selected !== 'left' ? (
                                        <img
                                            src={leftImage}
                                            alt="Bill Gold"
                                            className="w-full h-[420px] object-contain rounded-lg mx-auto"
                                        />
                                    ) : (
                                        <div className="card-container flex w-full h-full">
                                            <div className="card w-1/2 flex items-center justify-center">
                                                <div onClick={addImageClick} className="card-content flex flex-col items-center justify-center p-4">
                                                    {!billBurn ? (
                                                        <div className={"h-full p-4 rounded-lg"}>
                                                            <img
                                                                src={addImage}
                                                                alt="Sample Image"
                                                                className="mb-2 max-h-[52px] max-w-[52px] mx-auto"
                                                            />
                                                            <span className="click-text">Click here to add or update image</span>
                                                        </div>
                                                    ) : (
                                                        <div className={"relative"}>
                                                            <img className="h-full w-full max-h-[340px] max-w-[440px] object-contain rounded-lg border-2 border-solid border-gray-500" src={billBurn.image} alt="Image 1" />
                                                            <div className={"text-white bg-black/50 absolute bottom-0 w-full p-2 rounded-b-lg"}>
                                                                <p>{billBurn?.name} - {billBurn?.tokenId}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="plus-sign items-center flex text-[64px]">+</div>
                                            <div className="card w-1/2 flex items-center justify-center">
                                                <div className={"relative"}>
                                                    <img
                                                        className="h-full w-full object-contain max-h-[340px] max-w-[440px] rounded-lg border-2 border-solid border-gray-500"
                                                        //src={Glasses}
                                                        src={burnAsset?.image}
                                                        alt="3D Glasses"
                                                    />
                                                    <div className={"text-white bg-black/50 absolute bottom-0 w-full p-2 rounded-b-lg"}>
                                                        <p>{burnAsset?.name} - {burnAsset?.tokenId}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={"flex flex-col"}>
                                    <div>
                                        <img
                                            src={leftImage}
                                            alt="Bill Gold"
                                            className={`w-full h-[420px] object-contain rounded-lg mx-auto ${selected === 'left' ? 'w-full' : ''}`}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={"flex-0 h-1/5 mt-2"}>
                            {burnNow === '3dglasses' ? (
                                <div>
                                    <h2 className="text-xl font-bold mb-2">
                                        3D Glass Frame Upgrade
                                    </h2>
                                    <p className={""}>Upgrade your Bill Murray 3D glass frames</p>
                                    <p>Description 3dglasses</p>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-xl font-bold mb-2">
                                        Burning Curtain Upgrade
                                    </h2>
                                    <p>Upgrade your burning curtain into a pair of 3D glasses</p>
                                    <br />
                                    <p>Description burnandturn</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {rightCard}
                </div>
                <div className="h-[10%] flex items-center justify-end">
                    {/* {burnStatus === 'Burn' && ( */}
                    <button
                        className="flex flex-col w-1/2 h-full items-center justify-center text-white font-bold text-lg z-50 hover:bg-gold/25 border-r-2 border-gold border-solid"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    {/* )} */}
                    {selected && (
                        <button
                            className="flex flex-col w-1/2 h-full items-center justify-center text-white font-bold text-lg z-50 hover:bg-gold/25"
                            onClick={getProvider}
                        >
                            {burnStatus}
                        </button>
                    )}
                </div>
            </div>
            {isSelectModalOpen && (
                <div className="absolute flex flex-col rounded-lg h-[70%] w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black shadow-md z-100 border-gold border-2 border-solid">
                    <div className={"px-8 py-4 bg-gold/50 text-white text-2xl font-bold"}>
                        <h2 className="text-center">Please Select Your Bill Murray to Upgrade</h2>
                    </div>
                    <div className={"overflow-auto relative bg-gold/50"}>
                        <div className="grid grid-cols-4 gap-4 p-4">
                            {walletAssets
                                .filter(walletAsset => ['40000001-0001-0001-0002-000000000001', '40000001-0001-0001-0002-000000000002', 'efe0d138-eb40-4ec8-8714-0d02ca5b59ab'].includes(walletAsset.contractId))
                                .sort((a, b) => parseInt(a.tokenId) - parseInt(b.tokenId))
                                .map((walletAsset: Asset, i: number) => (
                                    <div key={i} className={"relative hover:border-green-500"}>
                                        <img
                                            key={walletAsset.id}
                                            src={walletAsset.image}
                                            alt={walletAsset.name}
                                            className="max-w-full h-auto hover:opacity-50 cursor-pointer rounded-lg hover:border-4 border-solid"
                                            onClick={() => handleImageClick(walletAsset)}
                                        />
                                        <div className={"text-white bg-black/50 absolute bottom-0 w-full p-2 rounded-b-lg"}>
                                            <p>{`${walletAsset.name} - ${walletAsset.tokenId}`}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                </div>
            )}


        </div>
    );
};

export default UpgradeModal;
