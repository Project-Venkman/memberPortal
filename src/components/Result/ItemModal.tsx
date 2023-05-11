import React, { useEffect } from "react";
import { Claim as ClaimType, Asset, ResultModalProps, Burn as BurnType, Media as MediaType } from "@customtypes/index";
import {
	ModalCloseButton,
	ResultDataModal,
	ResultDataModalContainer,
	ResultDataModalHeader,
	ResultDataModalOverlay,
} from "@styles/index";
import { FaTimes } from "react-icons/fa";
import { Claim, Media, Events } from "@components/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setMediaAssets, setClaimAssets, setBurnAssets } from "@state/index";
import { Api } from "@pages/scripts/API";

export const ItemModal: React.FC<ResultModalProps> = (props) => {
	const { modalOpen, setModalOpen, modalType } = props;
	const dispatch = useDispatch();
	const asset: Asset = useSelector((state: RootState) => state.currentAsset)
	let currentAsset: Asset = useSelector((state: RootState) => state.currentAsset);

	const id = {
		claimCoin: "40000001-0000-0000-0000-000000000001",
		image: "40000001-0000-0000-0000-000000000002",
		video: "40000001-0000-0000-0000-000000000003",
		audio: "40000001-0000-0000-0000-000000000004",
		burnBM: "00000004-0000-0000-0000-000000000004",
		burnTix: "00000004-0000-0000-0000-000000000005"
	}
	// useEffect(() => {
	// 	console.log({ currentAsset });
	// 	if (!asset) return;
	// 	const claimAssets: Array<ClaimType> = asset.claimAssets as Array<ClaimType>;
	// 	const mediaAssets: Array<MediaType> = asset.mediaAssets as Array<MediaType>;
	// 	// const burnBMAssets: Array<BurnType> = [...asset.burnBMAssets as Array<BurnType>, ...asset.burnTixAssets as Array<BurnType>];
	// 	dispatch(setClaimAssets(claimAssets.filter((asset: ClaimType) => asset.claimTypeID === id.claimCoin)));
	// 	dispatch(setMediaAssets(mediaAssets));
	// 	// dispatch(setBurnAssets(burnBMAssets));
	// }, [asset])
	useEffect(() => {
		let assetId = currentAsset.id;
		console.log(assetId)
		if (!currentAsset) return;
		(async () => {
			await Api.claim.getAllByAsset(assetId).then(async (res) => {
				console.log(res);
				let AssetClaim = res
				console.log(AssetClaim)
				const claimAssets: Array<ClaimType> = AssetClaim as Array<ClaimType>;
				dispatch(setClaimAssets(claimAssets));
			});
			// const mediaAssets: Array<MediaType> = asset.mediaAssets as Array<MediaType>;
			// // const burnBMAssets: Array<BurnType> = [...asset.burnBMAssets as Array<BurnType>, ...asset.burnTixAssets as Array<BurnType>];
			// dispatch(setMediaAssets(mediaAssets));
		})();
		// dispatch(setBurnAssets(burnBMAssets));
	}, [currentAsset])

	return (
		<ResultDataModalContainer>
			<ResultDataModalOverlay id={"modal-overlay"} onClick={() => setModalOpen(false)} />
			<ResultDataModal id={"modal-data"}>
				<ResultDataModalHeader>
					<ModalCloseButton onClick={() => setModalOpen(!modalOpen)}><FaTimes /></ModalCloseButton>
				</ResultDataModalHeader>
				{modalType === "media" && <Media />}
				{modalType === "events" && <Events />}
				{modalType === "claim" && <Claim />}
			</ResultDataModal>
		</ResultDataModalContainer>
	)
}
