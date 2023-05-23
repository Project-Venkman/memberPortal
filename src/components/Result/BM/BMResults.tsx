import React, { useEffect, useState } from 'react';
import { BurnAsset, Asset, WalletData, ResultProps } from '@customtypes/index';
import {
    Invalid,
    ItemAssetImage,
    ItemModal,
    ItemSelect,
    NavbarDesktop,
    NavbarMobile,
} from '@components/index';
import {
    FrameImg,
    ImageContainer,
    ResultCard,
    ResultCardContent,
    ResultPage,
} from '@styles/index';
import frame from '@assets/bill/FRAME-NO-BILL2.png';
import { RootState } from '@state/store';
import { useDispatch, useSelector } from 'react-redux';
import { Api } from '@pages/scripts/API';
import {
    setWallet,
    setEmptyWallet,
    setWalletAssets,
    setBurnAssets,
} from '@state/features';
import { truncateAddress } from '@pages/scripts/utils';
import { LoadIndicator } from 'devextreme-react';
import { useNavigate } from 'react-router-dom';

const BMResult: React.FC<ResultProps> = (props) => {
    const {} = props;
    const wallet: WalletData = useSelector((state: RootState) => state.wallet);
    const walletAddress: string = useSelector(
        (state: RootState) => state.walletAddress
    );
    const walletAssets: Array<Asset> = useSelector(
        (state: RootState) => state.walletAssets
    );
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <ResultPage>
            {walletAssets.length > 0 && !loading && <ItemSelect />}
            {!props.isloading &&
                walletAssets.length && [
                    <NavbarDesktop
                        key={0}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        setModalType={setModalType}
                    />,
                    <NavbarMobile
                        key={1}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        setModalType={setModalType}
                    />,
                ]}
            {props.isloading && !walletAssets.length && (
                <ResultCard id={'result-card'}>
                    <ResultCardContent id={'result-card-content'}>
                        <FrameImg id={'frame'} src={frame} />
                        <ImageContainer id={'image-container'}>
                            <div
                                className={
                                    'bg-black text-white p-2 absolute top-1/2 left-1/2 w-[67%] h-[71%] z-100'
                                }
                                style={{ transform: 'translate(-50%, -50%)' }}
                            >
                                <p>{`Retrieving NFTs for ${truncateAddress(
                                    walletAddress
                                )}`}</p>
                                <LoadIndicator
                                    visible={loading}
                                ></LoadIndicator>
                            </div>
                        </ImageContainer>
                    </ResultCardContent>
                </ResultCard>
            )}
            {walletAssets.length > 0 && (
                <ResultCard id={'result-card'}>
                    <ResultCardContent id={'result-card-content'}>
                        <FrameImg id={'frame'} src={frame} />
                        <ImageContainer id={'image-container'}>
                            {!loading && <ItemAssetImage key={1} />}
                        </ImageContainer>
                    </ResultCardContent>
                </ResultCard>
            )}
            {!walletAssets.length && !props.isloading && (
                <ResultCard id={'result-card'}>
                    <ResultCardContent id={'result-card-content'}>
                        <FrameImg id={'frame'} src={frame} />
                        <ImageContainer id={'image-container'}>
                            <Invalid walletData={wallet} />
                        </ImageContainer>
                    </ResultCardContent>
                </ResultCard>
            )}
            {modalOpen && (
                <ItemModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    modalType={modalType}
                />
            )}
        </ResultPage>
    );
};

export default BMResult;
