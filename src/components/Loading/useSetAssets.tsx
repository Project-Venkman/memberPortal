import { useDispatch, useSelector } from 'react-redux';
import {
    setBurnAssets,
    setClaimAssets,
    setEmptyWallet,
    setLoading,
    setMediaAssets,
    setWallet,
    setWalletAssets,
} from '@state/features';
import { Api } from '@pages/scripts';
import { Asset, BurnAsset } from '@customtypes/Asset';
import { useEffect, useState } from 'react';
import { Claim as ClaimType } from '@customtypes/Claim';
import { Media as MediaType } from '@customtypes/Media';
import { RootState } from '@state/store';
import { useNavigate } from 'react-router-dom';
export const useSetAssets = async (walletAddress: string) => {
    const navigate = useNavigate();
    const burns: Array<Asset> = useSelector(
        (state: RootState) => state.burnAssets as Array<Asset>
    );
    const dispatch = useDispatch();

    const setAssets = async () => {
        try {
            dispatch(setLoading(true));

            const burnContracts = await Api.contract.GetAllBurnableContracts();
            // console.log(burnContracts);
            const res = await Api.asset.getByWalletAddress(walletAddress);

            dispatch(setWallet(res));

            let oa: Array<Asset> = [];
            let ba: Array<BurnAsset> = [];

            res.forEach((r: Asset) => {
                if (
                    burnContracts.some((b: BurnAsset) => b.id === r.contractId)
                ) {
                    const tmp = burnContracts.find(
                        (b: BurnAsset) => b.id === r.contractId
                    )!;
                    const tmpR: BurnAsset = {
                        ...r,
                        contractAddress: tmp.address,
                        name: tmp.description,
                    };
                    ba.push(tmpR);
                } else {
                    oa.push(r);
                }
            });
            // console.log(ba);
            dispatch(setWalletAssets(oa));
            dispatch(setBurnAssets(ba));
            if (!oa.length && ba.length) navigate('/Burn');
        } catch (error) {
            dispatch(setEmptyWallet(walletAddress));
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
    return setAssets; // Return the setAssets function
};
