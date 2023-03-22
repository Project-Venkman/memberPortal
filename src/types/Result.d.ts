import * as React from "react";
import { WalletData } from "@customtypes/Login";
import { Dispatch, SetStateAction } from "react";

export type ResultProps<
	D extends React.ElementType = div['defaultComponent'],
	P = { result? },
	> = div<P,D>
export type NavBarProps<
	P = {
		modalOpen: boolean;
		setModalOpen: Dispatch<SetStateAction<boolean>>;
		setModalType: Dispatch<SetStateAction<string>>;
	},
	> = P
export type PeachProps<
	P = { walletData: WalletData },
	> = P
export type ItemProps<
	P = { },
	> = P
export type ItemSelectProps<
	P = { },
	> = P
export type ResultModalProps<
	P = {
		modalOpen: boolean;
		setModalOpen: Dispatch<SetStateAction<boolean>>;
		modalType: string;
	},
	> = P
export interface Result {
	code?: string;
	url?: url;
}
export interface CouponType {
	code: string;
}
export interface URLType extends React.ElementType<HTMLAnchorElement>{
	url: string;
	text: string;
}

export type Web3ModalProps<
	P = {}
> = P
