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
import BillBG from '@assets/images/COUCH-FOR-SPLASH.jpg';
import PVHome from '@assets/images/PVHome.png';
import SpaceELF from '@assets/images/SpaceELF.jpeg';
import { PVLogin } from '@components/Wallet/PVLogin';

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
    }, [currentUrl.hostname]);

    return (
        <LoginPage id={'login-page'}>
            <LoginLogoContainer>
                <LoginLogoImg src={heroBG} alt={'Bill Murray 1000 Splash'} />
            </LoginLogoContainer>
            <LoginContainer id={'login-container'}>
                <LoginTextContainer></LoginTextContainer>
                {/*<Web3ModalComponent />*/}
                <PVLogin />
            </LoginContainer>
        </LoginPage>
    );
};

export default Login;
