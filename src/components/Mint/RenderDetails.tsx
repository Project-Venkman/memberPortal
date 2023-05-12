import React from "react";
import {DetailProps} from "@customtypes/Asset";

export const RenderDetails: React.FC<DetailProps> = (props) => {
	const { IpfsItems, AssetOwner } = props.data
	return (
		<div className="asset-data5">
			{IpfsItems?.length &&
				[
					<p key={0}>{IpfsItems![0].ItemName}</p>,
					<img key={1} className={"h-48"} src={IpfsItems![0].ItemImage}/>
				]
			}
			{AssetOwner && <p>{AssetOwner.WalletAddress}</p>}
		</div>
	);
}

export default RenderDetails;
