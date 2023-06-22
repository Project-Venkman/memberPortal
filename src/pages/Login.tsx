import React, { useEffect, useState } from 'react';
import { LoginProps } from '@customtypes/index';
import {
    LoginContainer,
    LoginLogoContainer,
    LoginLogoImg,
    LoginPage,
    LoginText,
    LoginTextContainer,
    Maintenance,
} from '@styles/index';
import { Web3ModalComponent } from '@components/Wallet';
//import { LoginFormWallet } from "@components/index";
import splash from '@assets/images/COUCH-FOR-SPLASH.jpg';
import BillBG from '@assets/images/COUCH-FOR-SPLASH.jpg';
import PVHome from '@assets/images/PVHome.png';
import SpaceELF from '@assets/images/SpaceELF.jpeg';
const Login: React.FC<LoginProps> = () => {
    const currentUrl = new URL(window.location.href);
    const [heroBG, setHeroBG] = useState<string>('');
    useEffect(() => {
        const lowercaseHostname = currentUrl.hostname.toLowerCase(); // Convert to lowercase
        if (lowercaseHostname.includes('earthlight')) {
            setHeroBG(SpaceELF);
        } else if (lowercaseHostname.includes('billmurray1000')) {
            setHeroBG(BillBG);
        } else {
            setHeroBG(PVHome);
        }
    }, [currentUrl.pathname]);
    // window.localStorage.clear();

    return (
        <LoginPage id={'login-page'}>
            <LoginLogoContainer>
                <LoginLogoImg src={heroBG} alt={'Bill Murray 1000 Splash'} />
            </LoginLogoContainer>
            <LoginContainer id={'login-container'}>
                <LoginTextContainer></LoginTextContainer>
                <Web3ModalComponent />
            </LoginContainer>
        </LoginPage>
    );
};

export default Login;
