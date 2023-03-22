import * as React from "react";
import { Guid } from "guid-typescript";
import { Asset } from "@customtypes/index";

export type LoginProps<
	D extends React.ElementType = div['defaultComponent'],
	P = unknown,
	> = div<P,D>
export type LoginFormProps<
	D extends React.ElementType = div['defaultComponent'],
	P = {},
	> = div<P,D>
export interface Collection {
	ID: Guid | string;
}

export interface WalletData {
	companyId: string;
	walletAddress: string;
	walletBalance: number;
	metadata: Array<string>|null;
	ownedAssets?: Array<Asset>;
}

export interface UidPwd {
	userName?: string;
	password?: string;
	walletAddress?: string;
}

export interface CompanyUser {
	companyId: Guid | string;
	adminUserId: Guid | string | null;
	userName: string | null;
	sessionId: Guid | string | null;
	companyOnly: boolean;
	forceAuthDb: boolean;
	contractTypeId: Guid | string;
	token?: string | null;
}