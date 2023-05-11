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
    archived: boolean;
    assetId: string;
    claimed: boolean;
    code: string;
    createBy: string;
    createDate: string;
    description: string;
    id: string;
    name: string;
    orderId: string;
    tokenId: string;
    updateBy: string;
    updateDate: string;
    url: string;
}
