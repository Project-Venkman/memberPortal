export type BurnProps<
	P = {

	},
	> = P;
export type BurnsContainerProps<
	P = {
		burns: Array<Burn>
	},
	> = P;
export type BurnCardProps<
	P = {
		index: number;
		burnAsset: Burn;
		copiedAddress: boolean;
	},
	> = P;
export type BurnURLProps<
	P = {
		options: BurnDataOptions;
	},
	> = P
export interface BurnDataOptions {
	contractAddress: string;
	assetID: string;
	assetTypeID: string;
	tokenId: string;
	contractType: number;
	burnAsset: Burn;
	copiedAddress: boolean;
}
export type BurnRegistrationButtonProps<
	P = {
		index: number;
		text: string;
	},
	> = P
export interface Burn {
	burnTypeID?: string;
	typeID: string;
	name?: string;
	ipfsImage?: string;
	url?: string;
	description?: string;
	assetID: string;
	assetNumber: string;
	contractAddress: string;
	contractType: number;
}

