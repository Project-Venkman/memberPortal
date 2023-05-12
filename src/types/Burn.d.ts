export type BurnProps<P = {}> = P;
export type BurnsContainerProps<
    P = {
        burns: Array<Burn>;
    }
> = P;
export type BurnCardProps<
    P = {
        index: number;
        burnAsset: Asset;
        copiedAddress: boolean;
    }
> = P & {
    onClick?: (index: number) => void;
};

export type BurnURLProps<
    P = {
        // options: BurnDataOptions;
    }
> = P;
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
    }
> = P;
export interface Burn {
    abi: Array<>;
    address: string;
    archived: boolean;
    burnable: boolean;
    chainAPIKey: string;
    chainId: number;
    chainURL: string;
    createBy: string;
    createdDate: string;
    deployedBlock: string;
    description: string;
    id: string;
    minter: string;
    partnerContractId: string;
    symbol: string;
    type: string;
    updatedBy: string;
    updatedDate: string;
}
