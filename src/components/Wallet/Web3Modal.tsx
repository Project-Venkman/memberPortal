import { ethers } from 'ethers';
import { Web3ModalProps } from '@customtypes/Result';
import { useDispatch } from 'react-redux';
import { setWalletAddress } from '@state/features';
import React from 'react';
import {
    ConnectedButton,
    ConnectedButtonContainer,
    ConnectedButtonGrid,
    ConnectedButtonText,
    WalletIcon,
} from '@styles/Login.styled';
import { useNavigate } from 'react-router-dom';
import { Web3ModalProvider } from '@components/Wallet';
import axios from 'axios';
import { SiweMessage } from 'siwe';
import { Api } from '@pages/scripts/API';
import { setProvider } from '@state/features/ProviderSlice';
export const Web3ModalComponent: React.FC<Web3ModalProps> = (props) => {
    axios.defaults.withCredentials = true;
    let {} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function clearAllCookies() {
        let cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf('=');
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie =
                name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    }
    const connectWallet = async () => {
        clearAllCookies();
        await Api.auth
            .invalidateTokens()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        const domain = window.location.host;
        const origin = window.location.origin;
        const statement = 'Please sign this message to authenticate';
        try {
            const provider = await Web3ModalProvider.connect();
            let ethProvider = new ethers.providers.Web3Provider(provider);
            // dispatch(setProvider(ethProvider.provider.path))

            const accounts = await ethProvider.listAccounts();
            const signer = ethProvider.getSigner();
            let message = '';
            if (accounts) {
                // if local storage has a varible called IssuedToken and the value is true then dont run
                // await Api.auth.renewTokens();
                let nonce = await Api.auth.generateChallenge();
                // let nonce = (await axios.get("http://10.200.8.85:3000/Auth/GenerateChallenge")).data
                // let nonce = (await axios.get("https://apiv2.projectvenkman.com/Auth/GenerateChallenge")).data

                let siweMessage = new SiweMessage({
                    domain: domain,
                    address: accounts[0],
                    statement: statement,
                    uri: origin,
                    version: '1',
                    chainId: 1,
                    nonce: nonce,
                });
                message = siweMessage.prepareMessage();
                let signedMessage = await signer.signMessage(message);
                // await axios.post("http://10.200.8.85:3000/Auth/IssueTokens", {
                // 	message: message,
                // 	signature: signedMessage
                // })

                try {
                    await Api.auth.issueTokens(message, signedMessage);
                } catch (error: any) {
                    if (error.response && error.response.status === 403) {
                        console.log('error here ');
                    }
                }

                // set local storage with key IssuedToken and value true
                localStorage.setItem('IssuedToken', 'true');
                // await axios.post("http://10.200.8.85:3000/Auth/IssueTokens", {
                // 	message: message,
                // 	signature: signedMessage
                // }, {
                // 	withCredentials: true
                // });
                dispatch(setWalletAddress(accounts[0]));
            }
            const url = new URL(window.location.href);
            // if the url contains pvlogin, then navigate to ("PVResults")

            navigate('/Results');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ConnectedButtonGrid id={'connected-button-grid'}>
            <ConnectedButtonContainer id={'connected-button-container'}>
                <ConnectedButton
                    id={'connected-button'}
                    type="button"
                    className="btn btn-primary connectWallet"
                    onClick={connectWallet}
                >
                    <ConnectedButtonText>
                        <WalletIcon />
                        Connect Wallet
                    </ConnectedButtonText>
                </ConnectedButton>
            </ConnectedButtonContainer>
        </ConnectedButtonGrid>
    );
};

export default Web3ModalComponent;
