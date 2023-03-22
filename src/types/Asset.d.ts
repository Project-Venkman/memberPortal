import * as React from "react";
import {Guid} from "guid-typescript";
import {Burn, Claim, Media} from "@customtypes/index";

export interface Asset {
	name: string;
	description: string;
	url: string;
	typeID: string;
	assetID: string;
	assetNumber: string;
	assetOwnerID: string;
	childAssets?: Array<Asset>;
	mediaAssets?: Array<Media>;
	claimAssets?: Array<Claim>;
	burnBMAssets?: Array<Burn>;
	burnTixAssets?: Array<Burn>;
	ipfsItems?: Array<IpfsItem>;
	assetOwner?: Owner;
}

export interface IpfsItem {
	AssetID: string;
	ContractTypeID: string;
	ID: string;
	ItemDescription: string;
	ItemIndex: string;
	ItemImage: string;
	ItemName: string;
	OnChain: boolean;
}

export interface Owner {
	WalletAddress: string;
}

export type DetailProps<
	p = {
		data: DetailAsset;
	}
> = p

export interface DetailAsset {
	Name: string;
	Description: string;
	Url: string;
	TypeID: string;
	AssetID: string;
	AssetNumber: string;
	ChildAssets?: Array<Asset>;
	MediaAssets?: Array<Media>;
	ClaimAssets?: Array<Claim>;
	BurnBMAssets?: Array<Burn>;
	BurnTixAssets?: Array<Burn>;
	IpfsItems?: Array<IpfsItem>;
	AssetOwner?: Owner;
}

