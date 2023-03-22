import {Base} from "@customtypes/Base";
import {handle} from "@scripts/Handles";
import {SetStateAction} from "react";

export type MintProps<
    P = {
        className?: string;
    },
    > = & P
export type MinterProps<
    P = {
        setContractName: Dispatch<SetStateAction<string>>;
    },
    > = & P
export type MintSelectComponentProps<
    P = {

    },
    > = P
export type UploaderProps<
    P = {
        uploaderId: string;
        multiple: boolean;
        fileType: string;
        edit: boolean;
        setMintObject?: Dispatch<SetStateAction<Array<MintItem>>>;
        setSingleImage?: Dispatch<SetStateAction<string>>;
    },
    > = P
export type FileTypeRadioProps<
    P = {
        radioValues: Array<{
            value: string,
            text: string
        }>;
        setType: Dispatch<SetStateAction<string>>;
    },
    > = P
type CardActionStateProps<
    P = {
        setCardAction: Dispatch<SetStateAction<string>>;
        setWorkingItemId: Dispatch<SetStateAction<string>>;
    },
    > = P
export type MintComponentProps<
    P = {

    },
    > = CardActionStateProps & P
export type MintCardProps<
    P = {
        assetID: string | null;
        cardItemData: MintItem;
        cardItemId: string;
        key: number;
    },
    > = CardActionStateProps & P
export type MintActionProps<
    P = {
        data: MintItem;
        edit: boolean;
        setEdit: Dispatch<SetStateAction<boolean>>;
        setWorkingItemId: Dispatch<SetStateAction<string>>;
        setCardAction: Dispatch<SetStateAction<string>>;
    },
    > = P
export type AttributeGridProps<
    P = {
        pageType: keyof typeof handle;
        edit: boolean;
        data: MintItem;
        setData: Dispatch<SetStateAction<MintItem>>;
    },
    > = P
export type DetailFormProps<
    P = {
        data: MintItem;
        setData: Dispatch<SetStateAction<MintItem>>;
        edit: boolean;
    },
    > = P
export type PreviewImageProps<
    P = {
        data: MintItem;
        setData: Dispatch<SetStateAction<MintItem>>;
        edit: boolean;
        cardItemId: string;
        id: Guid | string;
    },
    > = P
export interface MintAttribute extends Base{
    trait_type: string;
    value: string;
    IpfsItemID: string;
}
export interface MintItem extends Base {
    ItemName: string;
    ItemDescription: string;
    ItemImage: string;
    AssetID: string | null;
    ContractTypeID: string;
    ItemIndex: string;
    OnChain: boolean;
    Attributes?: Array<MintAttribute>;
}
export interface Contract {
    ContractTypeID: string;
    Description: string;
}
export interface ContractSetting {
    ContractDescription: string;
    ContractAddress: string;
    ContractType: number;
    ChainURL: string;
    ChainAPIKey: string;
    Abi: string;
    ChainID: string;
    ContractMinterType: string;
    ID: string;
    PartnerContractID: string;
}
export interface ContractSettingBase extends ContractSetting, Base {

}
