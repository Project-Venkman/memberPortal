import React, { useEffect, useState } from "react";
import {
	Asset,
	WalletData,
	ResultProps,
	Burn as BurnType
} from "@customtypes/index";
import { Invalid, ItemAssetImage, ItemModal, ItemSelect, NavbarDesktop, NavbarMobile } from "@components/index";
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

	useEffect(() => {
		if (!walletAddress.length) return;
		(async () => {
			console.log("...Verifying Ownership");
			setLoading(true);
			await Api.ownership.verify(walletAddress)
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
		<ResultPage>
			{walletAssets.length > 0 && !loading &&
				<ItemSelect />

			}
			{!loading && walletAssets.length && [
				<NavbarDesktop key={0} modalOpen={modalOpen} setModalOpen={setModalOpen} setModalType={setModalType} />,
				<NavbarMobile key={1} modalOpen={modalOpen} setModalOpen={setModalOpen} setModalType={setModalType} />
			]
			}
			{loading && !walletAssets.length &&
				<ResultCard id={"result-card"}>
					<ResultCardContent id={"result-card-content"}>
						<FrameImg id={"frame"} src={telescope} />
						<ImageContainer id={"image-container"}>
							<div className={"bg-black text-white p-2 absolute top-1/2 left-1/2 w-[67%] h-[62%] z-100"} style={{ transform: "translate(-50%, -50%)" }}>
								<p>{`Retrieving NFTs for ${truncateAddress(walletAddress)}`}</p>
								<LoadIndicator visible={loading}></LoadIndicator>
							</div>
						</ImageContainer>
					</ResultCardContent>
				</ResultCard>}
			{walletAssets.length > 0 &&
				<ResultCard id={"result-card"}>
					<ResultCardContent id={"result-card-content"}>
						<FrameImg className="z-30" id={"frame"} src={telescope} />
						{/* <ImageContainer className="z-50" id={"image-container"}>
							{!loading && <ItemAssetImage key={1} />}
						</ImageContainer> */}
						{walletAddress === "0x42017df7ce71AD2Fe80cCa4C3D9bFc0512fff5Cf" && (
							<NFTImg className={loaded ? "loaded" : ""} src={asset.url || oAsset.image} onLoad={onLoad} />

						)}
						{/* <ImageContainer className="z-50" id={"image-container"}>
							
							{!loading && <ItemAssetImage key={1} />}
						</ImageContainer> */}

					</ResultCardContent>
				</ResultCard>
			}
			{!walletAssets.length && !loading &&
				<ResultCard id={"result-card"}>
					<ResultCardContent id={"result-card-content"}>
						<FrameImg id={"frame"} src={telescope} />
						<ImageContainer id={"image-container"}>
							<Invalid walletData={wallet} />
						</ImageContainer>
					</ResultCardContent>
				</ResultCard>
			}
			{modalOpen && (
				<ItemModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalType={modalType} />
			)}
		</ResultPage>
	)
}

export default Result;
