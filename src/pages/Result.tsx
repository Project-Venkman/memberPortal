import React, { useEffect, useState } from 'react';
import { Asset, WalletData, ResultProps, BurnAsset } from '@customtypes/index';
import { RootState } from '@state/store';
import { useDispatch, useSelector } from 'react-redux';
import { Api } from '@pages/scripts/API';
import {
    setWallet,
    setEmptyWallet,
    setWalletAssets,
    setBurnAssets,
    setWalletAddress,
    setLoading,
} from '@state/features';
import { useNavigate } from 'react-router-dom';
import PVResults from '@components/Result/PV/PVResults';
import BMResult from '@components/Result/BM/BMResults';
import ELFResult from '@components/Result/ELF/ELFResults';
import { LoadingState } from '@state/features/LoadingSlice';
import { useSetAssets } from '@components/Loading';

const Result: React.FC<ResultProps> = (props) => {
    const {} = props;
    const currentUrl = new URL(window.location.href);
    const navigate = useNavigate();
    const wallet: WalletData = useSelector((state: RootState) => state.wallet);
    const walletAddress: string = useSelector(
        (state: RootState) => state.walletAddress
    );
    const walletAssets: Array<Asset> = useSelector(
        (state: RootState) => state.walletAssets
    );

    const burns: Array<Asset> = useSelector(
        (state: RootState) => state.burnAssets as Array<Asset>
    );

    useEffect(() => {
        if (!walletAddress || walletAddress.length < 1) {
            (async () => {
                await Api.auth.whoamI().then(async (res) => {
                    dispatch(setWalletAddress(res));
                });
            })();
        }
    }, [walletAddress]);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('');
    const loading: LoadingState = useSelector(
        (state: RootState) => state.isLoading
    );
    const setAssets = useSetAssets(walletAddress);

    // console.log(walletAssets);
    useEffect(() => {
        if (!walletAddress || walletAddress.length < 1) return;
        if (walletAddress && walletAssets.length < 1)
            (async () => {
                await (
                    await setAssets
                )();
            })();
    }, [walletAddress]);

    return (
        <>
            {currentUrl.pathname.includes('pvlogin') ? (
                <PVResults />
            ) : currentUrl.pathname.includes('ELF') ? (
                <ELFResult />
            ) : (
                <BMResult />
            )}
        </>
    );
};

export default Result;
