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
            ).then(async (res: any) => {
                setBurnStatus('Burning!');
                setSpinnerCss(
                    'w-40 h-40 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 '
                );
            });

            BurnContract.on('Transfer', async (from, to, tokenId, event) => {
                console.log('Event:', event);
                setBurnStatus('Item Has Been Burned Click Here to Refresh Site!');
                // setDisabled(true);
                // setTailwindCss('bg-gray-800 text-gray-500 rounded-md opacity-50');
                setSpinnerCss(
                    'w-40 h-40 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 hidden'
                );
            });
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
            <div className="modal-overlay absolute inset-0 z-60"></div>
            <div className="modal-container bg-white h-[70%] w-[80%] rounded-lg p-4 z-70">
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
                <div className="flex h-[90%] justify-between space-x-16 z-90">
                    <div
                        onClick={selectLeft}
                        className={`w-full p-4 z-90 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg ${selected === 'left' ? 'bg-gray-200' : ''
                            }`}
                    >
                        <div className="mb-4 flex justify-center">
                            {burnNow === '3dglasses' ? (
                                <div className="w-full">
                                    {selected !== 'left' ? (
                                        <img
                                            src={leftImage}
                                            alt="Bill Gold"
                                            className="w-full h-[420px] object-contain rounded-lg mx-auto"
                                        />
                                    ) : (
                                        <div className="card-container flex w-full">
                                            <div className="card h-[420px] w-1/2 flex items-center justify-center border border-solid border-black">
                                                <div onClick={addImageClick} className="card-content flex flex-col items-center justify-center">
                                                    {!billBurn ? (
                                                        <div>
                                                            <img
                                                                src={addImage}
                                                                alt="Sample Image"
                                                                className="mb-2 max-h-[52px] max-w-[52px] mx-auto"
                                                            />
                                                            <span className="click-text">Click here to add or update image</span>
                                                        </div>
                                                    ) : (
                                                        <img className="h-full w-full max-h-[340px] max-w-[440px] object-contain" src={billBurn.imageSmall} alt="Image 1" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="plus-sign items-center flex text-3xl">+</div>
                                            <div className="card h-[420px] w-1/2 flex items-center justify-center border border-solid border-black">
                                                <img
                                                    className="h-full w-full object-contain max-h-[340px] max-w-[440px]"
                                                    src={Glasses}
                                                    alt="3D Glasses"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <img
                                    src={leftImage}
                                    alt="Bill Gold"
                                    className={`w-full h-[420px] object-contain rounded-lg mx-auto ${selected === 'left' ? 'w-full' : ''}`}
                                />
                            )}
                        </div>

                        {burnNow === '3dglasses' ? (
                            <div>
                                <h2 className="text-xl font-bold mb-4">
                                    3D Glass Frame Upgrade
                                </h2>
                                <p>Upgrade your Bill Murray 3D glass frames</p>
                                <br />
                                <p>Description 3dglasses</p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold mb-4">
                                    Burning Curtain Upgrade
                                </h2>
                                <p>Upgrade your burning curtain into a pair of 3D glasses</p>
                                <br />
                                <p>Description burnandturn</p>
                            </div>
                        )}
                    </div>
                    {rightCard}
                </div>
                <div className="h-[10%] flex items-center justify-end">
                    {burnStatus === 'Burn' && (
                        <button
                            className="flex flex-col items-center mr-4 text-black text-sm z-50 bg-goldish hover:bg-goldish-dark rounded-lg py-2 px-4 border border-black"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    )}
                    {selected && (
                        <button
                            className="flex flex-col items-center mr-4 text-black text-sm z-50 bg-goldish hover:bg-goldish-dark rounded-lg py-2 px-4 border border-black"
                            onClick={getProvider}
                        >
                            {burnStatus}
                        </button>
                    )}
                </div>

            </div>
            {isSelectModalOpen && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md z-100">
                    <h2 className="text-center mb-4">Please Select Your Bill Murray to Upgrade</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {walletAssets
                            .filter(walletAsset => walletAsset.contractId === '40000001-0001-0001-0002-000000000002')
                            .map((walletAsset: Asset, i: number) => (
                                <img
                                    key={walletAsset.id}
                                    src={walletAsset.imageSmall}
                                    alt={walletAsset.name}
                                    className="max-w-full h-auto"
                                    onClick={() => handleImageClick(walletAsset)}
                                />
                            ))}
                    </div>
                </div>
            )}


        </div>
    );
};

export default UpgradeModal;
