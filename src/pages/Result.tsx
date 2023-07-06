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
    setWalletAssets,
    setBurnAssets,
    setWalletAddress,
    setClaimAssets,
    setMediaAssets,
} from '@state/features';
import { useNavigate } from 'react-router-dom';
import ProjectVenkman from '@components/Result/PV/ProjectVenkman';
import BillMurray1000 from '@components/Result/BM/BillMurray1000';
import EarthLight from '@components/Result/ELF/EarthLight';
import { LoadingState } from '@state/features/LoadingSlice';

const Result: React.FC<ResultProps> = (props) => {
    const {} = props;
    const currentUrl = new URL(window.location.href);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wallet: WalletData = useSelector((state: RootState) => state.wallet);
    const walletAddress: string = useSelector(
        (state: RootState) => state.walletAddress
    );
    const burnAssets: Array<BurnAsset> = useSelector(
        (state: RootState) => state.burnAssets
    );
    const walletAssets: Array<Asset> = useSelector(
        (state: RootState) => state.walletAssets
    );
    const loading: LoadingState = useSelector(
        (state: RootState) => state.isLoading
    );
    const claims: Array<ClaimType> = useSelector(
        (state: RootState) => state.claimAssets as Array<ClaimType>
    );
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('');
    const [assetIds, setAssetIds] = useState<Array<string>>([]);
    /*setAssets = useSetAssets(walletAddress);*/

    useEffect(() => {
        if (walletAddress) return;
        (async () => {
            await Api.auth.whoamI().then(async (res) => {
                dispatch(setWalletAddress(res));
            });
        })();
        /*else {
			let allMedia: Array<MediaType> = [];

			(async () => {
				let burnAssets: Array<BurnAsset> =
					await Api.asset.getAllBurnablesByWalletAddress(
						walletAddress
					);
				let walletAssets: Array<Asset> =
					await Api.asset.getAlByWalletAddressNoBurnables(
						walletAddress
					);
				dispatch(setWalletAssets(walletAssets));
				dispatch(setBurnAssets(burnAssets));
				if (!walletAssets.length && burnAssets.length)
					navigate('/Burn');
				let allClaims = await Api.claim
					.getAllByAssetIds(assetIds)
					.then(async (res) => {
						return res;
					});
				if (allClaims.length > 0) {
					dispatch(setClaimAssets(allClaims));
				}

				// console.log(walletAssets);
				for (let i = 0; i < walletAssets.length; i++) {
					let assetId = walletAssets[i].id;
					// NOTE: This will always be true, since assetId cannot be both of these values
					if (
						assetId !== 'a8cfad6d-0a38-4f8c-b50c-31d28124dc61' &&
						assetId !== 'b634b38c-46c9-49e5-b3a7-9fee034cd339'
					) {
						await Api.media
							.getAllByAsset(assetId)
							.then(async (res) => {
								// console.log(res);
								let newMedia = res.filter(
									(media: MediaType) =>
										!allMedia.some((m) => m.id === media.id)
								);
								allMedia = [...allMedia, ...newMedia];
							});
					}
				}
				dispatch(setMediaAssets(allMedia));
			})();
		}*/
    }, [walletAddress]);

    useEffect(() => {
        let allMedia: Array<MediaType> = [];

        (async () => {
            let burnAssets: Array<BurnAsset> =
                await Api.asset.getAllBurnablesByWalletAddress(walletAddress);
            let walletAssets: Array<Asset> =
                await Api.asset.getAlByWalletAddressNoBurnables(walletAddress);
            dispatch(setWalletAssets(walletAssets));
            dispatch(setBurnAssets(burnAssets));
            if (!walletAssets.length && burnAssets.length) navigate('/Burn');
            let allClaims = await Api.claim
                .getAllByAssetIds(assetIds)
                .then(async (res) => {
                    return res;
                });
            if (allClaims.length > 0) {
                dispatch(setClaimAssets(allClaims));
            }

            // console.log(walletAssets);
            for (let i = 0; i < walletAssets.length; i++) {
                let assetId = walletAssets[i].id;
                // NOTE: This will always be true, since assetId cannot be both of these values
                if (
                    assetId !== 'a8cfad6d-0a38-4f8c-b50c-31d28124dc61' &&
                    assetId !== 'b634b38c-46c9-49e5-b3a7-9fee034cd339'
                ) {
                    await Api.media.getAllByAsset(assetId).then(async (res) => {
                        // console.log(res);
                        let newMedia = res.filter(
                            (media: MediaType) =>
                                !allMedia.some((m) => m.id === media.id)
                        );
                        allMedia = [...allMedia, ...newMedia];
                    });
                }
            }
            dispatch(setMediaAssets(allMedia));
        })();
    }, [assetIds]);

    useEffect(() => {
        if (!walletAssets) return;
        setAssetIds(walletAssets.map((walletAsset) => walletAsset.id));
    }, [walletAssets]);

    useEffect(() => {
        if (!walletAssets && burnAssets) navigate('/Burn');
    }, [burnAssets, walletAssets]);

    switch (true) {
        case currentUrl.hostname.includes('billmurray'):
            return <BillMurray1000 isLoading={loading} />;
        case currentUrl.hostname.includes('earthlight'):
            return <EarthLight isLoading={loading} />;
        default:
            return <ProjectVenkman isLoading={loading} />;
    }
};
export default Result;
