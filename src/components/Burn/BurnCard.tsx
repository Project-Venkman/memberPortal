import React, { useEffect, useState } from "react";
import {
	BurnButtonContainer,
	BurnCardContainer,
	BurnImage,
	BurnImageContainer, BurnDataHeader, BurnName
} from "@styles/index";
import { Burn, BurnCardProps, BurnDataOptions } from "@customtypes/Burn";
import { BurnURL } from "@components/index";

let initialBurn: Burn = {
	contractAddress: "",
	assetNumber: "",
	typeID: "",
	contractType: 0,
	assetID: "",
}

export const BurnCard: React.FC<BurnCardProps> = (props) => {

	const { index, burnAsset, copiedAddress } = props;
	const [burnOptions, setBurnOptions] = useState<BurnDataOptions>({
		contractAddress: "",
		tokenId: "",
		contractType: 0,
		burnAsset: initialBurn,
		copiedAddress: copiedAddress,
		assetID: "",
		assetTypeID: ""
	})

	useEffect(() => {
		console.log("burnOptions", burnOptions);
		setBurnOptions({
			contractAddress: burnAsset.contractAddress,
			tokenId: burnAsset.assetNumber,
			contractType: burnAsset.contractType,
			burnAsset: burnAsset,
			copiedAddress: copiedAddress,
			assetID: burnAsset.assetID,
			assetTypeID: burnAsset.typeID
		})
	}, [burnAsset])

	return (
		<BurnCardContainer id={"burn-" + index}>
			<BurnDataHeader id={"Burn-header-info"}>
				<BurnName id={"Burn-name"}>{burnAsset.name! + ": " + burnAsset.assetNumber ?? ""}</BurnName>
			</BurnDataHeader>
			<BurnImageContainer>
				<BurnImage src={burnAsset.ipfsImage} />
			</BurnImageContainer>
			<BurnButtonContainer>
				<BurnURL options={burnOptions} />
			</BurnButtonContainer>


		</BurnCardContainer>
	)
}
