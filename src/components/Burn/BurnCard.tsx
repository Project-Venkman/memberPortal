import React, { useEffect, useState } from "react";
import {
	BurnButtonContainer,
	BurnCardContainer,
	BurnImage,
	BurnImageContainer, BurnDataHeader, BurnName
} from "@styles/index";
import { Burn, BurnCardProps, BurnDataOptions } from "@customtypes/Burn";
import {
	Asset
} from "@customtypes/index";
import { RootState } from "@state/store";
import { ethers } from "ethers";
import { abi_721 } from "@components/Burn/abi_721";
import Web3Modal from 'web3modal';
import { useDispatch, useSelector } from "react-redux";
import { Web3ModalProvider } from "@components/Wallet"

// let initialBurn: Burn = {
// 	contractAddress: "",
// 	assetNumber: "",
// 	typeID: "",
// 	contractType: 0,
// 	assetID: "",
// }

export const BurnCard: React.FC<BurnCardProps> = (props) => {
	const walletAddress: string = useSelector((state: RootState) => state.walletAddress);


	const getProvider = async () => {
		let provider = await Web3ModalProvider.connectTo(Web3ModalProvider.cachedProvider)
		let ethersProvider = new ethers.providers.Web3Provider(provider)
		let signer = ethersProvider.getSigner()
		let BurnContract = new ethers.Contract(burnAsset.contractAddress, abi_721, signer)
		// let name = await BurnContract.name()
		await BurnContract.transferFrom(walletAddress, "bm1000burnandturn.eth", burnAsset.tokenId)
	}

	const burns: Array<Asset> = useSelector((state: RootState) => state.burnAssets as Array<Asset>);
	console.log("burns", burns)
	const { index, burnAsset, copiedAddress, onClick } = props;
	console.log("burnAsset", burnAsset)

	const handleCardClick = () => {
		console.log(index)
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
		// console.log("burnOptions", burnOptions);
		// setBurnOptions({
		// 	contractAddress: burnAsset.contractAddress,
		// 	tokenId: burnAsset.assetNumber,
		// 	contractType: burnAsset.contractType,
		// 	burnAsset: burnAsset,
		// 	copiedAddress: copiedAddress,
		// 	assetID: burnAsset.assetID,
		// 	assetTypeID: burnAsset.typeID
		// })
	}, [burnAsset])

	return (
		<BurnCardContainer onClick={handleCardClick} id={"burn-" + index}>
			<BurnDataHeader id={"Burn-header-info"}>
				<BurnName id={"Burn-name"}>{burnAsset.name! + ": " + burnAsset.tokenId ?? ""}</BurnName>
			</BurnDataHeader>
			<BurnImageContainer>
				<BurnImage src={burnAsset.image} />
			</BurnImageContainer>
			<BurnButtonContainer>
				{/* <BurnURL options={burnOptions} /> */}
			</BurnButtonContainer>


		</BurnCardContainer>
	)
}
