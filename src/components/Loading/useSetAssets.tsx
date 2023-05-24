import { useDispatch } from 'react-redux';
import {
    setBurnAssets,
    setEmptyWallet,
    setLoading,
    setWallet,
    setWalletAssets,
} from '@state/features';
import { Api } from '@pages/scripts';
import { Asset, BurnAsset } from '@customtypes/Asset';

export const useSetAssets = async (walletAddress: string) => {
    const dispatch = useDispatch();

    const setAssets = async () => {
        try {
            dispatch(setLoading(true));

            const burnContracts = await Api.contract.GetAllBurnableContracts();
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

            dispatch(setWalletAssets(oa));
            dispatch(setBurnAssets(ba));
        } catch (error) {
            dispatch(setEmptyWallet(walletAddress));
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return setAssets; // Return the setAssets function
};
