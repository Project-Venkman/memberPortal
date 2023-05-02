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
import axios from "axios";
import { SiweMessage } from "siwe";

export const Web3ModalComponent: React.FC<Web3ModalProps> = (props) => {
	let { } = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const connectWallet = async () => {
		const domain = window.location.host;
		const origin = window.location.origin;
		const statement = 'Please sign this message to authenticate';
		try {
			Web3ModalProvider.clearCachedProvider();
			console.log(Web3ModalProvider)
			const provider = await Web3ModalProvider.connect();
			//let ethProvider = new ethers.providers.Web3Provider(provider);
			let ethProvider = new ethers.providers.Web3Provider(provider)
			//dispatch(setProvider(provider));
			const accounts = await ethProvider.listAccounts();
			// const signer = ethProvider.getSigner();
			let message = ""
			// if (accounts) {
			// 	let res = await axios.get("http://10.200.8.85:3000/Auth/GenerateChallenge", {
			// 	})
			// 	let siweMessage = new SiweMessage({
			// 		domain: domain,
			// 		address: accounts[0],
			// 		statement: statement,
			// 		uri: origin,
			// 		version: '1',
			// 		chainId: 1,
			// 		nonce: res.data
			// 	});
			// 	message = siweMessage.prepareMessage();
			// 	let signedMessage = await signer.signMessage(message);
			// 	await axios.post("http://10.200.8.85:3000/Auth/IssueTokens", {
			// 		message: message,
			// 		signature: signedMessage
			// 	})
			// }
			console.log(accounts)
			dispatch(setWalletAddress(accounts[0]));
			const url = new URL(window.location.href);
			// if the url contains pvlogin, then navigate to ("PVResults")
			if (url.pathname.includes("pvlogin")) {
				navigate("/PVResult");
			} else if (url.pathname.includes("ELF")) {
				navigate("/ELFResult");
			} else {
				navigate("/Result")
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ConnectedButtonGrid id={"connected-button-grid"}>
			<ConnectedButtonContainer id={"connected-button-container"}>
				<ConnectedButton id={"connected-button"} type="button" className="btn btn-primary connectWallet" onClick={connectWallet}>
					<ConnectedButtonText><WalletIcon />Connect Wallet</ConnectedButtonText>
				</ConnectedButton>
			</ConnectedButtonContainer>
		</ConnectedButtonGrid>
	);
}

export default Web3ModalComponent;