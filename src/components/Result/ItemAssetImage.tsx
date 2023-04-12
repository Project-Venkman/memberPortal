import React, { useEffect, useRef, useState } from "react";
import { Asset, ItemProps } from "@customtypes/index";
import { NFTImg } from "@styles/index";
import { useSelector } from "react-redux";
import { RootState } from "@state/index";
import loadingGif from "@assets/images/loading2.gif";
import { Metadata } from "@customtypes/HyperMint";

export const ItemAssetImage: React.FC<ItemProps> = (props) => {
	const { } = props;
	const asset: Asset = useSelector((state: RootState) => state.currentAsset);
	const oAsset: Metadata = useSelector((state: RootState) => state.currentOwnedAsset);
	const [loaded, setLoaded] = useState<boolean>(false);
	const counter = useRef(0);
	const onLoad = () => {
		setLoaded(true);
	}

	useEffect(() => {
		//console.log("asset", asset);
	}, [])

	return (
		<React.Fragment>
			<NFTImg className={loaded ? "loaded" : ""} src={asset.url || oAsset.image} onLoad={onLoad} />
			{/*{!loaded && <NFTImg src={loadingGif}/>}*/}
		</React.Fragment>
	)
}

export default ItemAssetImage;
