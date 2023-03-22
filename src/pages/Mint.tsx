import React, {useEffect, useState} from "react";
import {ContractSelect} from "@components/Mint/ContractSelect";
import {Api, Zuul} from "@scripts/API";
import {useDispatch, useSelector} from "react-redux";
import {setContracts} from "@state/features";
import {RootState} from "@state/store";
import {DataGrid} from "devextreme-react";
import {
	Column,
	Editing,
	FilterRow,
	MasterDetail,
	Pager,
	Scrolling,
	SearchPanel,
	Selection
} from "devextreme-react/data-grid";
import {RenderDetails} from "@components/index";
import {
	Asset,
	ContractSetting,
	ContractToken,
	CreateNFTContractMetadataRequest,
	CreateNFTContractRequest,
	CreateNFTNetworkRequest,
	Metadata,
	NetworkChain,
	NetworkEnvironment,
	NetworkType,
	NFTContractMetadataType,
	NFTContractType
} from "@customtypes/index";
import {HMApi} from "@scripts/API/HyperMintApi";

export const Mint: React.FC = () => {
	const dispatch = useDispatch();
	const contract: ContractSetting = useSelector((state: RootState) => state.contract);
	const [assets, setAssets] = useState<Array<Asset>>([]);
	const [tokenData, setTokenData] = useState<Array<ContractToken>>([]);
	const [owned, setOwned] = useState<Array<Metadata>>([]);
	const pageSizes = [10, 25, 50, 100];

	/*let createNFTContractMetadata: CreateNFTContractMetadataRequest = {
		type: NFTContractMetadataType.Hosted
	}
	let createNFTNetwork: CreateNFTNetworkRequest = {
		type: NetworkType.Polygon,
		environment: NetworkEnvironment.Testnet,
		chain: NetworkChain.Mumbai,
		recoveryAddress: "",
		customerPrimaryRoyaltyAddress: "",
		collectionOwnerAddress: "",
		contractType: NFTContractType.ERC721,
		useManagedAccessList: false,
		secondaryRoyaltyAddress: ""
	}
	let createNFTContract: CreateNFTContractRequest = {
		name: "Johnny-Test",
		network: createNFTNetwork,
		symbol: "JTN",
		allowBuyOnNetwork: false,
		metadata: createNFTContractMetadata,
		secondarySaleBasisPoints: 0,
		enableOpenSeaOperatorFilterRegistry: true
	}*/

	const BDO = {
		"name": "The Night Murray Met Clooney",
		"description": "\"We met in Venice. “Lost in Translation” opened at the Venice Film Festival. You have to remember most of these Hollywood guys are stiffs but one night a year they end up on this island in Venice. They all drink a lot… I don't remember much. But George and I met and we hit it off and I went back home to America and my son says, \"What's this about you and George Clooney pushing people around in wheelchairs in Venice?\" And I said, \"You're my son! I would have expected more from you than to believe that kind of a story. Why would you think something like that actually happened?\" My son replied, \"Because there are pictures.\"\n\n\"So it seems George and I had been taking women around in wheelchairs and trying to dump them into this beautiful swimming pool. No, no, it was all a joke. They just got a rinse.\"",
		"image": "https://metadata.hypermint.com/contracts/f47c42fe-ad88-4e14-b4aa-ef5be7846b85/85.png",
		"attributes": [
			{
				"trait_type": "Hand Embellishments",
				"value": "None"
			},
			{
				"trait_type": "Background",
				"value": "Synchronized Wheelchairs"
			},
			{
				"trait_type": "OBs",
				"value": "Yes"
			},
			{
				"trait_type": "Left Lens",
				"value": "Orange"
			},
			{
				"trait_type": "Story",
				"value": "Celebrities"
			},
			{
				"trait_type": "Right Lens",
				"value": "Pink 2"
			},
			{
				"trait_type": "Jacket",
				"value": "Black"
			},
			{
				"trait_type": "Tie",
				"value": "Lilac"
			},
			{
				"trait_type": "Shirt",
				"value": "White"
			},
			{
				"trait_type": "Frames",
				"value": "White"
			},
			{
				"trait_type": "Coin",
				"value": "910"
			}
		]
	}

	const updateToken = async () => {
		await HMApi.all.setTokenHostedMetadata("f47c42fe-ad88-4e14-b4aa-ef5be7846b85", "85", BDO)
			.then((res) => {
				console.log(res ? "success" : "fail");
			});
	}

	useEffect(() => {
		(async () => {
			await Zuul.contract.getAll()
				.then(async res => {
					dispatch(await setContracts(res.filter((r: ContractSetting) => r.ID !== null)));
				})
		})();
	}, [])

	useEffect(() => {
		if (!contract.ID.length) return;
		(async () => {
			await HMApi.all.getTokens(contract.PartnerContractID)
				.then(async (res ) => {
					let tks = res.tokens as Array<ContractToken>
					setTokenData(tks);
				});
			await HMApi.all.getContractInfo(contract.PartnerContractID)
				.then(res => {
					console.log("getContractInfo", res);
				})
			//HMApi.all.createDraftContract(createNFTContract);

			await Api.asset.getAllByContractId(contract.ID)
				.then(async res => {
					setAssets(res);
				})
		})();
	}, [contract]);

	useEffect(() => {
		console.log("tokenData", tokenData);
	}, [tokenData])

	const contentReady = (e: any) => {
		console.log("contentReady", e)
		if(e.component.getSelectedRowKeys().length) {
			e.component.selectRowsByIndexes(0);
		}
	}

	const selectionChanged = (e:  any) => {
		console.log("selectionChanged", e);
		e.component.collapseAll(-1);
		e.component.expandRow(e.currentSelectedRowKeys[0]);
	}

	return (
		<>
			<ContractSelect />
			<button className={"text-white border border-solid border-white"} onClick={updateToken}>Update Token</button>
			<DataGrid
				className={"w-3/4 h-full mx-auto"}
				dataSource={assets}
				showBorders={true}
				columnAutoWidth={true}
				allowColumnReordering={true}
				rowAlternationEnabled={true}
				showRowLines={true}
				onContentReady={contentReady}
				onSelectionChanged={selectionChanged}
				/*onSaving={handleSave}*/
			>
				<Selection mode="single" />
				<Column dataField={"AssetNumber"} allowFiltering={true} allowEditing={false} sortOrder={"asc"} />
				<Column dataField={"AssetOwnerID"} allowFiltering={false} />
				<Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
				<Editing mode={"cell"} allowUpdating={true} allowDeleting={false} allowAdding={false} />
				<FilterRow visible={true} />
				<SearchPanel visible={true} />
				<Scrolling mode="virtual" />
				<MasterDetail enabled={true} render={RenderDetails} />
			</DataGrid>
		</>
	)
}