import React from "react";
import { Guid } from "guid-typescript";
import { CustomerBase } from "@customtypes/Customer";
import { GroupBase } from "@customtypes/Group";
import { IFormOptions } from "devextreme-react/form";
import { IDataGridOptions } from "devextreme-react/data-grid";
import { handle } from "@scripts/Handles";

export interface Base {
	ID: Guid | string;
	CreatedBy: Guid | string | null;
	CreatedDate: Date;
	UpdatedBy?: Guid | string | null;
	UpdatedDate?: Date | null;
	Deleted: boolean | null;
}

export interface BaseComponents {
	Customer: CustomerBase;
	Group: GroupBase;
}

export interface PagedData<T> {
	TotalRecords: number;
	PageIndex: number;
	PageSize: number;
	Data: Array<T>;
}

export interface KahlilApi {
	host?: string;
	version?: string;
	key?: string;
	secret?: string;
	url: string;
}

export interface VenkmanIFormOptions extends IFormOptions {
	options: DetailOptions;
}

export interface DetailOptions {
	pageType: keyof typeof handle;
	detailOwner: string;
	includedItems: Array<string>;
	uneditableItems: Array<string>;
}

export type PageTypeMap<T extends keyof typeof handle> = T;

export interface VenkmanDataGridOptions {
	dataSource: any;
	pageType: keyof typeof handle;
	options: IDataGridOptions;
	expandable?: boolean;
}


export interface BaseStyleProps {
	style: React.CSSProperties;
}

interface editors {
	Add: (data: any) => void;
	Delete: (id: Guid) => void;
	Edit: (data: any) => void;
}

export interface handleType {
	admin: editors;
	company: editors;
	customer: editors;
	group: editors;
	mint: editors;
	rule: editors;
	ruleParameter: editors;
	nft: editors;
	event: editors;
	eventNFT: editors;
}
