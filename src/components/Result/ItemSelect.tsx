import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Asset, ItemSelectProps } from "@customtypes/index";
import {
	SelectionContainer,
	SelectionHeader,
	SelectionOptionsContainer,
	SelectionOptionsList,
	SelectionOptionsListItem,
} from "@styles/index";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RootState, setCurrentAsset, setCurrentOwnedAsset } from "@state/index";
import { Metadata } from "@customtypes/HyperMint";

export const ItemSelect: React.FC<ItemSelectProps> = (props) => {
	const walletAssets: Array<Asset> = useSelector((state: RootState) => state.walletAssets);
	const ownedAssets: Array<Metadata> = useSelector((state: RootState) => state.ownedAssets);
	const dispatch = useDispatch();
	let currentAsset: Asset = useSelector((state: RootState) => state.currentAsset);
	let currentOwnedAsset: Metadata = useSelector((state: RootState) => state.currentOwnedAsset);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleOptions = () => setIsOpen(!isOpen);

	const handleSelectionClick = (value: number) => {
		setIsOpen(false);
		dispatch(setCurrentAsset(walletAssets[value]))
	}

	const handleSelectionClick2 = (value: number) => {
		setIsOpen(false);
		dispatch(setCurrentOwnedAsset(ownedAssets[value]))
	}

	useEffect(() => {
		if (walletAssets.length > 0) {
			dispatch(setCurrentAsset(walletAssets[0]));
		}
		else if (ownedAssets.length > 0) {
			console.log("111", ownedAssets[0].name);
			dispatch(setCurrentOwnedAsset(ownedAssets[0]));
		}
	}, [walletAssets])
	useEffect(() => {
		// console.log("current wallet set", currentAsset);
	}, [currentAsset]);
	return (
		<SelectionContainer>
			<SelectionHeader id={"selection-header"} onClick={(walletAssets.length > 1 || ownedAssets.length > 1) ? toggleOptions : () => { }}>
				<span>{currentAsset.name || currentOwnedAsset.name}</span>
				{(walletAssets.length > 1 || ownedAssets.length > 1) && (
					<div id={"chevron"} className={"animate-bounce"}>
						{isOpen ? <FaChevronUp /> : <FaChevronDown />}
					</div>
				)}
			</SelectionHeader>
			{isOpen && walletAssets.length > 0 && (
				<SelectionOptionsContainer id={"selection-option-container"}>
					<SelectionOptionsList>
						{walletAssets.map((asset: Asset, i: number) => {
							return (
								<SelectionOptionsListItem key={i} hidden={currentAsset.name === asset.name} onClick={() => handleSelectionClick(i)}>
									{asset.name}
								</SelectionOptionsListItem>
							)
						}
						)}
					</SelectionOptionsList>
				</SelectionOptionsContainer>)
			}
			{isOpen && ownedAssets.length > 0 && (
				<SelectionOptionsContainer id={"selection-option-container"}>
					<SelectionOptionsList>
						{ownedAssets.map((asset: Metadata, i: number) => {
							return (
								<SelectionOptionsListItem key={i} hidden={currentOwnedAsset.name === asset.name} onClick={() => handleSelectionClick2(i)}>
									{asset.name}
								</SelectionOptionsListItem>
							)
						}
						)}
					</SelectionOptionsList>
				</SelectionOptionsContainer>)
			}
		</SelectionContainer>
	)
}

export default ItemSelect;
