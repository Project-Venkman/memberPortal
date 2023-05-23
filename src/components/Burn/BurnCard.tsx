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
import { Asset } from '@customtypes/index';
import { RootState } from '@state/store';
import { ethers } from 'ethers';
import { abi_721 } from '@components/Burn/abi_721';
import Web3Modal from 'web3modal';
import { useDispatch, useSelector } from 'react-redux';
import { Web3ModalProvider } from '@components/Wallet';
import { BurnURL } from '@components/Burn/BurnURL';

// let initialBurn: Burn = {
// 	contractAddress: "",
// 	assetNumber: "",
// 	typeID: "",
// 	contractType: 0,
// 	assetID: "",
// }

export const BurnCard: React.FC<BurnCardProps> = (props) => {
    const walletAddress: string = useSelector(
        (state: RootState) => state.walletAddress
    );

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
        await BurnContract.transferFrom(
            walletAddress,
            address,
            burnAsset.tokenId
        );
        console.log(address);
    };
    const burns: Array<Asset> = useSelector(
        (state: RootState) => state.burnAssets as Array<Asset>
    );
    const { index, burnAsset, copiedAddress, onClick } = props;

    const handleCardClick = () => {
        getProvider();
    };
    // const [burnOptions, setBurnOptions] = useState<BurnDataOptions>({
    // 	contractAddress: "",
    // 	tokenId: "",
    // 	contractType: 0,
    // 	burnAsset: initialBurn,
    // 	copiedAddress: copiedAddress,
    // 	assetID: "",
    // 	assetTypeID: ""
    // })

    useEffect(() => {
        // setBurnOptions({
        // 	contractAddress: burnAsset.contractAddress,
        // 	tokenId: burnAsset.assetNumber,
        // 	contractType: burnAsset.contractType,
        // 	burnAsset: burnAsset,
        // 	copiedAddress: copiedAddress,
        // 	assetID: burnAsset.assetID,
        // 	assetTypeID: burnAsset.typeID
        // })
    }, [burnAsset]);

    return (
        <BurnCardContainer onClick={handleCardClick} id={'burn-' + index}>
            <BurnDataHeader id={'Burn-header-info'}>
                <BurnName id={'Burn-name'}>
                    {burnAsset.name! + ': ' + burnAsset.tokenId ?? ''}
                </BurnName>
            </BurnDataHeader>
            <BurnImageContainer>
                <BurnImage src={burnAsset.image} />
            </BurnImageContainer>
            <BurnButtonContainer>
                <BurnURL />
            </BurnButtonContainer>
        </BurnCardContainer>
    );
};
