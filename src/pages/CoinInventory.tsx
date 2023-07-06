import React, { useEffect, useState } from "react";
import { Coin, CoinInventoryProps } from "@customtypes/CoinInventory";
import { Api } from "@pages/scripts/API";
import { DataGrid } from "devextreme-react";
import { Column, Editing, FilterRow, Pager, Scrolling, SearchPanel } from "devextreme-react/data-grid";
import EventInfo from "devextreme/ui/data_grid";
import 'devextreme/dist/css/dx.dark.css';
import { Claim } from "@customtypes/Claim";

export const CoinInventory: React.FC<CoinInventoryProps> = (props) => {
	const { } = props;
	const [coins, setCoins] = useState<Array<Claim>>([]);
	const [change, setChange] = useState<Claim | null>(null);

	const pageSizes = [10, 25, 50, 100];

	useEffect(() => {
		if (coins.length) return;
		(async () => {
			await Api.claim.getAllByTypeInventory("coin")
				.then((res) => {
					console.log(res);
					setCoins(res/*.sort((a: Claim, b: Claim) => a.tokenID.localeCompare(b.tokenID))*/);
				})
		})();
	}, [coins])

	useEffect(() => {
		console.log(change);
		if (change === null) return;
		console.log("updating");
		(async () => {
			await Api.claim.updateInventory(change)
				.then(res => setChange(null));
		})();
	}, [change])

	const handleSave = (e: EventInfo<any> & any) => {
		//console.log("bool", e.changes[0].key);
		setChange(e.changes[0].key);
	}

	return (
		<DataGrid
			className={"w-3/4 h-full mx-auto"}
			dataSource={coins}
			showBorders={true}
			columnAutoWidth={true}
			allowColumnReordering={true}
			rowAlternationEnabled={true}
			showRowLines={true}
			onSaving={handleSave}
		>
			<Column dataField={"name"} allowFiltering={true}></Column>
			<Column dataField={"tokenId"} allowFiltering={true} allowEditing={false} sortOrder={"asc"}></Column>
			<Column dataField={"claimed"} allowFiltering={true}><input type={"checkbox"} checked={!this} /></Column>
			<Column dataField={"code"} allowFiltering={true} allowEditing={false}></Column>
			<Column dataField={"orderId"} allowFiltering={true}></Column>
			<Column dataField={"url"} allowFiltering={false} allowEditing={false}></Column>
			<Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
			<Editing mode={"cell"} allowUpdating={true} allowDeleting={false} allowAdding={false} />
			<FilterRow visible={true} />
			<SearchPanel visible={true} />
			<Scrolling mode="virtual" />
		</DataGrid>
	)
}