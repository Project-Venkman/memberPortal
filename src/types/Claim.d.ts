export type ClaimProps<P = {}> = P;
export type ClaimsContainerProps<
    P = {
        claims: Array<Claim>;
    }
> = P;
export type ClaimCardProps<
    P = {
        index: number;
        children?: JSX.Element;
    }
> = P;
export type ClaimURLProps<
    P = {
        claimed: boolean;
        url: string;
        text: string;
    }
> = P;
export type ClaimRegistrationButtonProps<
    P = {
        index: number;
        text: string;
    }
> = P;
export interface Claim {
    id: string;
    name: string;
    description: string;
    tokenId: string;
    orderId: string;
    url: string;
    code: string;
    claimed: boolean;
    type: string;
    assetId: string;
    createBy: string;
    createDate: string;
    updateBy: string;
    updateDate: string;
    archived: boolean;
}
