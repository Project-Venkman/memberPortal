import React, { useEffect, useRef, useState } from "react";
import { Asset, WalletData, ResultProps, CompanyUser, UidPwd, ContractSetting } from "@customtypes/index";
import { Invalid, ItemAssetImage, ItemModal, ItemSelect, NavbarDesktop, NavbarMobile } from "@components/index";
import {
	FrameImg,
	ImageContainer, Maintenance,
	ResultCard,
	ResultCardContent,
	ResultPage
} from "@styles/index";
import frame from "@assets/bill/FRAME-NO-BILL2.png";
import { RootState } from "@state/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAsset } from "@state/features/CurrentAssetSlice";
import { setWinner } from "@state/features/WinnerSlice";
import { Api, Zuul } from "@pages/scripts/API";
import {
	setWallet,
	setEmptyWallet,
	setWalletAddress,
	setWalletAssets,
	clearCredentials,
	setContracts, setOwnedAssets
} from "@state/features";
import { truncateAddress } from "@pages/scripts/utils";
import { HMApi } from "@pages/scripts/API/HyperMintApi";
import { Guid } from "guid-typescript";
import { Metadata, Token, TokenOwnershipResponse } from "@customtypes/HyperMint";

const ResultTest: React.FC<ResultProps> = (props) => {
	const wallet: WalletData = useSelector((state: RootState) => state.wallet);
	const walletAddress: string = useSelector((state: RootState) => state.walletAddress);
	const ownedAssets: Array<Metadata> = useSelector((state: RootState) => state.ownedAssets);
	const userCredentials: UidPwd = useSelector((state: RootState) => state.userCredentials);
	const contracts: Array<ContractSetting> = useSelector((state: RootState) => state.allContracts);
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalType, setModalType] = useState<string>("");
	const [currentContract, setCurrentContract] = useState<ContractSetting | undefined>(undefined);
	const [ownedTokens, setOwnedTokens] = useState<Array<Token> | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (walletAddress.length > 0) {
			console.log("...Verifying Ownership");
			setLoading(true);
		}
	}, [walletAddress])

	useEffect(() => {
		if (contracts !== null)
			setCurrentContract(contracts.filter((contract: ContractSetting) => contract.ID === "40000001-0001-0001-0002-000000000001")[0]);
	}, [contracts])

	useEffect(() => {
		if (currentContract !== undefined) {
			let contractId = currentContract.PartnerContractID;
			console.log(contractId)
			HMApi.all.getOwnedTokens(contractId, "0xc8FC1962214E0B5fbaF0E707c503CA22cE93731E")
				.then(async (res: TokenOwnershipResponse) => {
					setOwnedTokens(res.tokens);
				});
		}
	}, [currentContract])

	useEffect(() => {
		if (ownedTokens !== null) {
			let oa: Array<Metadata> = new Array<Metadata>();
			ownedTokens.forEach(async (token: Token, index: number) => {
				let temp = await HMApi.all.getTokenHostedMetadata(currentContract!.PartnerContractID, token.tokenId.toString())
					.then(async (res: Metadata) => {
						return res;
					})
				oa.push(await temp);
				dispatch(setOwnedAssets(oa))
			})
			//console.log(99, oa);
			//dispatch(setOwnedAssets(oa));
			setLoading(false);
		}
	}, [ownedTokens])

	useEffect(() => {
		if (ownedAssets.length)
			console.log(99, ownedAssets);
	}, [ownedAssets]);

	useEffect(() => {
		if (userCredentials.walletAddress && window.localStorage.getItem("chainType") !== null) {
			//console.log("uc", userCredentials)
			Zuul.login.authenticate(userCredentials)
				.then(async (res) => {
					window.sessionStorage.setItem("sessionData", JSON.stringify(res));
					dispatch(clearCredentials());
				})
		}
	}, [userCredentials])

	useEffect(() => {
		Zuul.contract.getAll()
			.then(async res => {
				dispatch(await setContracts(res));
			})
	}, [])

	const handleDataModalClick = (e: string) => {
		setModalType(e)
		setModalOpen(true);
	}

	return (
		<ResultPage>
			{ownedAssets.length > 0 && !loading &&
				<ItemSelect />

			}
			{!loading && ownedAssets.length && [
				<NavbarDesktop key={0} modalOpen={modalOpen} setModalOpen={setModalOpen} setModalType={setModalType} />,
				<NavbarMobile key={1} modalOpen={modalOpen} setModalOpen={setModalOpen} setModalType={setModalType} />
			]
			}
			{loading && !ownedAssets.length &&
				<ResultCard id={"result-card"}>
					<ResultCardContent id={"result-card-content"}>
						<FrameImg id={"frame"} src={frame} />
						<ImageContainer id={"image-container"}>
							<div className={"bg-black text-white p-2 absolute top-1/2 left-1/2 w-[67%] h-[71%] z-100"} style={{ transform: "translate(-50%, -50%)" }}>
								<p>{"Getting NFTs for " + truncateAddress(wallet.walletAddress)}</p>
							</div>
						</ImageContainer>
					</ResultCardContent>
				</ResultCard>}
			{ownedAssets.length > 0 &&
				<ResultCard id={"result-card"}>
					{/* {!loading && <ItemSelect />} */}
					<ResultCardContent id={"result-card-content"}>
						<FrameImg id={"frame"} src={frame} />
						<ImageContainer id={"image-container"}>
							{!loading && <ItemAssetImage key={1} />}
						</ImageContainer>
					</ResultCardContent>
				</ResultCard>
			}
			{!ownedAssets.length && !loading &&
				<ResultCard id={"result-card"}>
					<ResultCardContent id={"result-card-content"}>
						<FrameImg id={"frame"} src={frame} />
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

export default ResultTest;
