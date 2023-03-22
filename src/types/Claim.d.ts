export type ClaimProps<
	P = {

	},
	> = P;
export type ClaimsContainerProps<
	P = {
		claims: Array<Claim>
	},
	> = P;
export type ClaimCardProps<
	P = {
		index: number;
		children?: JSX.Element;
	},
	> = P;
export type ClaimURLProps<
	P = {
		claimed: boolean;
		url: string;
		text: string;
	},
	> = P
export type ClaimRegistrationButtonProps<
	P = {
		index: number;
		text: string;
	},
	> = P
export interface Claim {
	claimTypeID?: string;
	contractTypeID?: string;
	name?: string;
	url?: string;
	description?: string;
	code?: string;
	claimed: boolean;
	tokenID: string;
	orderID?: string;
}

