import React, { useEffect, useState } from "react";
import {
	Asset,
	WalletData,
	ResultProps,
	Burn as BurnType
} from "@customtypes/index";
import { Invalid, ItemAssetImageELF, ItemAssetImage, ItemModal, ItemSelect, NavbarDesktop, NavbarMobile } from "@components/index";
import {
	FrameImg,
	ImageContainer,
	ResultCard,
	ResultCardContent,
	ResultPage
} from "@styles/index";
import frame from "@assets/bill/FRAME-NO-BILL2.png";
import { RootState } from "@state/store";
import { useDispatch, useSelector } from "react-redux";
import { Api } from "@scripts/API";
import {
	setWallet,
	setEmptyWallet,
	setWalletAssets,
	setBurnAssets
} from "@state/features";
import { truncateAddress } from "@scripts/utils";
import { LoadIndicator } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import telescope from "@assets/images/telescope.png"
import { NFTImg } from "@styles/index";
import PVResults from "@components/Result/PV/PVResults";
import BMResult from "@components/Result/BM/BMResults"
import ELFResult from "@components/Result/ELF/ELFResults"


const Result: React.FC<ResultProps> = (props) => {

	const { } = props;
	const navigate = useNavigate();
	const wallet: WalletData = useSelector((state: RootState) => state.wallet);
	const walletAddress: string = useSelector((state: RootState) => state.walletAddress);
	const walletAssets: Array<Asset> = useSelector((state: RootState) => state.walletAssets);
	const burns: Array<BurnType> = useSelector((state: RootState) => state.burnAssets as Array<BurnType>);
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalType, setModalType] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const currentUrl = new URL(window.location.href);
	console.log(currentUrl)
	useEffect(() => {
		if (!walletAddress.length) return;
		(async () => {
			console.log("...Verifying Ownership");
			setLoading(true);
			// await Api.ownership.verify(walletAddress)
			await Api.asset.getByWalletAddress(walletAddress)
				.then(async (res) => {
					console.log("...Setting Data", res);
					await dispatch(setWallet(res));
					let oa: Array<Asset> = [];
					let ba: Array<BurnType> = [];
					await res.forEach((r: WalletData) => {
						const burnContractIds = ["00000004-0000-0000-0000-000000000004", "00000004-0000-0000-0000-000000000005"];
						// HERE IS WHERE WE NEED TO FILTER OUT THE BURNABLES
						if (!burnContractIds.includes(r.ownedAssets![0].typeID))
							oa.push(...r.ownedAssets!);
						console.log(ba.findIndex((r2) => r.ownedAssets![0].burnBMAssets![0].assetNumber === r2.assetNumber))
						// 
						if (r.ownedAssets![0].burnBMAssets!.length) {
							let tmp = [...r.ownedAssets![0].burnBMAssets!];
							tmp.forEach(t => {
								if (!ba.find(b => b.assetNumber === t.assetNumber)) {
									ba.push(...r.ownedAssets![0].burnBMAssets!)
								}
							})
						}
					})
					console.log("oa", oa);
					console.log("ba", ba);
					await dispatch(setWalletAssets(oa));
					await dispatch(setBurnAssets(ba));
					await Api.asset.getBurnables(walletAddress)
						.then((res) => {
							console.log("getBurnables", res);
						});
					//getBurns();
					if (!oa.length && burns.length) navigate('/Burn');
					//setVerified(true);
					setLoading(false);
				})
				.catch(async (error) => {
					dispatch(setEmptyWallet(walletAddress));
					setLoading(false);
					console.error(await error);
				});
		})();
	}, [walletAddress])


	return (
		<>
			{currentUrl.pathname.includes("pvlogin") ? (
				<PVResults />
			) : currentUrl.pathname.includes("ELF") ? (
				<ELFResult />
			)
				: (
					<BMResult />
				)}
		</>
	)
}

export default Result;
