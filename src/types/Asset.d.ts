import * as React from 'react';
import { Guid } from 'guid-typescript';
import { Burn, Claim, Media } from '@customtypes/index';

export interface Asset {
    animation: string;
    animationSmall: string;
    archived: boolean;
    attributes: Array<Attribute>;
    contractId: string;
    createdBy: string;
    createdDate: string;
    description: string;
    id: string;
    image: string;
    imageSmall: string;
    name: string;
    ownerId: string;
    status: string;
    tokenId: string;
    updatedBy: string;
    updatedDate: string;
}
export interface BurnAsset extends Asset {
    contractAddress: string;
    burnNow: string;
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
> = p;

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
