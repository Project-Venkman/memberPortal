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
    ImageContainerELF,
    ResultCard,
    ResultCardContent,
    ResultPage,
    TelescopeImg,
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
    LoadingState,
} from '@state/features';
import { truncateAddress } from '@pages/scripts/utils';
import { LoadIndicator } from 'devextreme-react';
import { useNavigate } from 'react-router-dom';
import telescope from '@assets/images/telescope.png';
import heroBG from '@assets/bill/COUCH-FOR-SPLASH-PAGE.png';
import space from '@assets/images/Space.jpg';

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
    const loading: boolean = useSelector(
        (state: RootState) => state.isLoading
    ).isLoading;
    let frameComponent = null;
    let imageContainer = null;
    let imageContainerLoading = null;
    let resultPageStyle = {}; // Empty style object

    let url = window.location.href;
    if (url.includes('elf')) {
        resultPageStyle = {
            backgroundImage: `url(${heroBG})`,
            // Add other CSS properties for background image if needed
        };
        frameComponent = <TelescopeImg id={'frame'} src={telescope} />;
        resultPageStyle = {};
        // } else if (url.includes('pv')) {
        imageContainer = (
            <ImageContainerELF className="z-50" id={'image-container'}>
                {!loading && <ItemAssetImage key={1} />}
            </ImageContainerELF>
        );
        imageContainerLoading = (
            <ImageContainerELF id={'image-container'}>
                <div
                    className={
                        ' text-white p-2 absolute top-1/2 left-1/2 w-[67%] h-[62%] z-100'
                    }
                    style={{ transform: 'translate(-50%, -50%)' }}
                >
                    <p>{`Retrieving NFTs for ${truncateAddress(
                        walletAddress
                    )}`}</p>
                    <LoadIndicator visible={loading}></LoadIndicator>
                </div>
            </ImageContainerELF>
        );
    } else {
        resultPageStyle = {
            backgroundImage: `url(${space})`,
            // Add other CSS properties for background image if needed
        };
        frameComponent = <FrameImg id={'frame'} src={frame} />;
        imageContainer = (
            <ImageContainer id={'image-container'}>
                {!loading && <ItemAssetImage key={1} />}
            </ImageContainer>
        );
        imageContainerLoading = (
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
                    <LoadIndicator visible={!loading}></LoadIndicator>
                </div>
            </ImageContainer>
        );
    }
    return (
        <ResultPage>
            {walletAssets.length > 0 && !loading && <ItemSelect />}
            {!loading &&
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
            {loading && !walletAssets.length && (
                <ResultCard id={'result-card'}>
                    <ResultCardContent id={'result-card-content'}>
                        {frameComponent}
                        {imageContainerLoading}
                    </ResultCardContent>
                </ResultCard>
            )}
            {walletAssets.length > 0 && (
                <ResultCard id={'result-card'}>
                    <ResultCardContent id={'result-card-content'}>
                        {frameComponent}
                        {imageContainer}
                    </ResultCardContent>
                </ResultCard>
            )}
            {!walletAssets.length && !loading && (
                <ResultCard id={'result-card'}>
                    <ResultCardContent id={'result-card-content'}>
                        {frameComponent}
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
