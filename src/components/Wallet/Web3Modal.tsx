import { ethers } from "ethers"
import { Web3ModalProps } from "@customtypes/Result";
import { useDispatch } from "react-redux";
import { setWalletAddress } from "@state/features";
import React from "react";
import {
	ConnectedButton,
	ConnectedButtonContainer,
	ConnectedButtonGrid,
	ConnectedButtonText, WalletIcon
} from "@styles/Login.styled";
import { useNavigate } from "react-router-dom";
import { Web3ModalProvider } from "@components/Wallet";

export const Web3ModalComponent: React.FC<Web3ModalProps> = (props) => {
	let {} = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const connectWallet = async () => {
		Web3ModalProvider.clearCachedProvider();
		const provider = await Web3ModalProvider.connect();
		//let ethProvider = new ethers.providers.Web3Provider(provider);
		let ethProvider = new ethers.BrowserProvider(provider)
		//dispatch(setProvider(provider));
		const accounts = await ethProvider.listAccounts();
		dispatch(setWalletAddress(accounts[0].address))
		navigate("/result");
	};

	return (
		<ConnectedButtonGrid id={"connected-button-grid"}>
			<ConnectedButtonContainer id={"connected-button-container"}>
				<ConnectedButton id={"connected-button"} type="button" className="btn btn-primary connectWallet" onClick={connectWallet}>
					<ConnectedButtonText><WalletIcon/>Connect Wallet</ConnectedButtonText>
				</ConnectedButton>
			</ConnectedButtonContainer>
		</ConnectedButtonGrid>
	);
}

export default Web3ModalComponent;