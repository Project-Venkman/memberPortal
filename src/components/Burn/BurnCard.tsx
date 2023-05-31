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

// let initialBurn: Burn = {
// 	contractAddress: "",
// 	assetNumber: "",
// 	typeID: "",
// 	contractType: 0,
// 	assetID: "",
// }

export const BurnCard: React.FC<BurnCardProps> = (props) => {
    const { index, burnAsset, copiedAddress, onClick } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const walletAddress: string = useSelector(
        (state: RootState) => state.walletAddress
    );
    const walletAssets: Array<Asset> = useSelector(
        (state: RootState) => state.walletAssets
    );
    const [refreshBurn, setRefreshBurn] = useState<boolean>(false);
    const setAssets = useSetAssets(walletAddress);
    useEffect(() => {
        if (!walletAddress || walletAddress.length < 1) return;
        if (refreshBurn) {
            (async () => {
                await (
                    await setAssets
                )();
                setRefreshBurn(false);
            })();
        }
    }, [refreshBurn]);
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
        // let name = await BurnContract.name()
        if (
            BurnContract.Address ===
                '0xC4219CE63Cec2236A955655951AEA9b6f8B2431b' ||
            BurnContract.address ===
                '0xC843A8fcaa6540e895798C743a51C8b3c3b3Df40'
        ) {
            await BurnContract.transferFrom(
                walletAddress,
                address,
                burnAsset.tokenId
            );
            setRefreshBurn(true);
            await navigate('/burn');
        }
    };
    const burns: Array<Asset> = useSelector(
        (state: RootState) => state.burnAssets as Array<Asset>
    );

    const handleCardClick = async () => {
        if (burnAsset.burnNow !== 'burnandturn') return;
        await getProvider();
    };

    return (
        <BurnCardContainer onClick={handleCardClick} id={'burn-' + index}>
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
                <BurnURL />
            </BurnButtonContainer>
        </BurnCardContainer>
    );
};
