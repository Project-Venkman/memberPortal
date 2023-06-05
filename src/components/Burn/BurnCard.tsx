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

export const BurnCard: React.FC<BurnCardProps> = (props) => {
    const { index, burnAsset, copiedAddress, onClick } = props;
    const [disabled, setDisabled] = useState<boolean>(false);
    const [tailwindCss, setTailwindCss] = useState<string>('');
    const [spinnerCss, setSpinnerCss] = useState<string>(
        'w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 hidden'
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

    const getProvider = async () => {
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
            console.log(res);
            setBurnStatus('Burning!');
            setSpinnerCss(
                'w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 '
            );
        });

        BurnContract.on('Transfer', async (from, to, tokenId, event) => {
            console.log('Event:', event);
            setBurnStatus('Burned!');
            setDisabled(true);
            setTailwindCss('bg-gray-800 text-gray-500 rounded-md opacity-50');
            setSpinnerCss(
                'w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 hidden'
            );
        });
    };

    const handleCardClick = async () => {
        if (burnAsset.burnNow !== 'burnandturn') return;
        if (disabled) return;
        await getProvider();
    };

    return (
        <BurnCardContainer
            className={tailwindCss}
            onClick={handleCardClick}
            id={'burn-' + index}
        >
            <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 right-0 bottom-0">
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

            <BurnDataHeader id={'Burn-header-info'}>
                <BurnName id={'Burn-name'}>
                    {burnAsset.name! + ': ' + burnAsset.tokenId ?? ''}
                </BurnName>
            </BurnDataHeader>
            <BurnImageContainer>
                {burnAsset.animation ? (
                    <video
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
    );
};
