import React, {useEffect, useState} from "react";
import { LoginProps } from "@customtypes/index";
import {
	LoginContainer,
	LoginLogoContainer,
	LoginLogoImg,
	LoginPage, LoginText,
	LoginTextContainer, Maintenance
} from "@styles/index";
import { Web3ModalComponent } from "@components/Wallet";
//import { LoginFormWallet } from "@components/index";
import splash from "@assets/images/COUCH-FOR-SPLASH.jpg";

const Login: React.FC<LoginProps> = () => {
	window.localStorage.clear();

	return (
		<LoginPage id={"login-page"}>
			<LoginLogoContainer>
				<LoginLogoImg src={splash} alt={"Bill Murray 1000 Splash"}/>
			</LoginLogoContainer>
			<LoginContainer id={"login-container"}>
				<LoginTextContainer>
					{/*<LoginText >Hello! Welcome to the Official Bill Murray 1000 redemption site.</LoginText>
					<LoginText>Please click your wallet type below for NFT verification and to claim your reward!</LoginText>
					<LoginText>Need help? Reach out to our Discord admin!</LoginText>
					<LoginText>Not sure what this is? Please feel free to visit <a style={{color: "blue", fontWeight: "bold"}} href={"https://theSHACK.theCHIVE.com"} target={"_blank"}>theSHACK.theCHIVE.com</a> or visit our <a style={{color: "blue", fontWeight: "bold"}} href={"https://discord.com/invite/HnXFs2Deqv"} target={"_blank"}>Discord!</a></LoginText>*/}
				</LoginTextContainer>
				<Web3ModalComponent/>
			</LoginContainer>
		</LoginPage>
	)
}

export default Login;
