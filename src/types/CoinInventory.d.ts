import {Guid} from "guid-typescript";
import {Base} from "@customtypes/Base";

export type CoinInventoryProps<
	P = {

	},
	> = P;

export interface Coin extends Base {
	Name: string;
	Description: string;
	Url: string;
	ClaimTypeID: Guid;
	Claimed: boolean;
	Code: string;
	ContractTypeID: Guid;
	ParentAssetID: Guid;
	TokenID: string;

}