import React, { useEffect, useRef, useState } from "react";
import { Asset, ItemProps } from "@customtypes/index";
import { NFTImg } from "@styles/index";
import { useSelector } from "react-redux";
import { RootState } from "@state/index";
import loadingGif from "@assets/images/loading2.gif";
import { Metadata } from "@customtypes/HyperMint";
import rocket164 from "@assets/images/rkt164.jpg";
export const ItemAssetImageELF: React.FC<ItemProps> = (props) => {
    const { } = props;
    const asset: Asset = useSelector((state: RootState) => state.currentAsset);
    const oAsset: Metadata = useSelector((state: RootState) => state.currentOwnedAsset);
    const [loaded, setLoaded] = useState<boolean>(false);
    const counter = useRef(0);
    const onLoad = () => {
        setLoaded(true);
    }

    useEffect(() => {
        console.log("asset", asset);
    }, [])

    return (
        <React.Fragment>

            <NFTImg className={loaded ? "loaded" : ""} src={rocket164} onLoad={onLoad} />
            {/*{!loaded && <NFTImg src={loadingGif}/>}*/}
        </React.Fragment>
    )
}

export default ItemAssetImageELF;
