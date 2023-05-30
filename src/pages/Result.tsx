import React, { useEffect, useState } from 'react';
import {
    Asset,
    WalletData,
    ResultProps,
    BurnAsset,
    Claim as ClaimType,
    Media as MediaType,
} from '@customtypes/index';
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
    setClaimAssets,
    setMediaAssets,
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

    useEffect(() => {
        if (!walletAddress || walletAddress.length < 1) {
            (async () => {
                await Api.auth.whoamI().then(async (res) => {
                    dispatch(setWalletAddress(res));
                });
            })();
        }
    }, [walletAddress]);

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
    const claims: Array<ClaimType> = useSelector(
        (state: RootState) => state.claimAssets as Array<ClaimType>
    );

    useEffect(() => {
        if (!walletAssets) return;
        if (walletAssets.length > 0) {
            let allMedia: Array<MediaType> = [];
            let assetIds: Array<string> = [];

            (async () => {
                await Promise.all(
                    walletAssets.map(async (walletAsset) => {
                        let assetId = walletAsset.id;
                        assetIds.push(assetId);
                    })
                );
                let allClaims = await Api.claim
                    .getAllByAssetIds(assetIds)
                    .then(async (res) => {
                        return res;
                    });
                // console.log(walletAssets);
                for (let i = 0; i < walletAssets.length; i++) {
                    let assetId = walletAssets[i].id;
                    if (
                        assetId !== 'a8cfad6d-0a38-4f8c-b50c-31d28124dc61' &&
                        assetId !== 'b634b38c-46c9-49e5-b3a7-9fee034cd339'
                    ) {
                        await Api.media
                            .getAllByAsset(assetId)
                            .then(async (res) => {
                                let newMedia = res.filter(
                                    (media: MediaType) =>
                                        !allMedia.some((m) => m.id === media.id)
                                );
                                allMedia = [...allMedia, ...newMedia];
                            });
                    }
                }

                dispatch(setClaimAssets(allClaims));
                dispatch(setMediaAssets(allMedia));
            })();
        }
    }, [walletAssets]);

    return (
        <>
            {currentUrl.pathname.includes('pvlogin') ? (
                <PVResults isloading={loading} />
            ) : currentUrl.pathname.includes('ELF') ? (
                <ELFResult isloading={loading} />
            ) : (
                <BMResult isloading={loading} />
            )}
        </>
    );
};

export default Result;
