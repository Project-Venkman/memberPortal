import { useDispatch, useSelector } from 'react-redux';
import {
    setBurnAssets,
    setEmptyWallet,
    setLoading,
    setWallet,
    setWalletAssets,
} from '@state/features';
import { Api } from '@pages/scripts';
import { Asset, BurnAsset } from '@customtypes/Asset';
import { RootState } from '@state/store';
import { useNavigate } from 'react-router-dom';

export const useSetAssets = async (walletAddress: string) => {
    const navigate = useNavigate();
    const burns: Array<Asset> = useSelector(
        (state: RootState) => state.burnAssets as Array<Asset>
    );
    const dispatch = useDispatch();

    return async () => {
        try {
            dispatch(setLoading(true));

            //const burnContracts = await Api.contract.GetAllBurnableContracts();
            // console.log(burnContracts);
            //const res = await Api.asset.getByWalletAddress(walletAddress);

            // Don't need, old API from Azure
            //dispatch(setWallet(res));

            //let oa: Array<Asset> = [];
            //let ba: Array<BurnAsset> = [];
            let ba: Array<BurnAsset> =
                await Api.asset.getAllBurnablesByWalletAddress(walletAddress);
            let oa: Array<Asset> =
                await Api.asset.getAlByWalletAddressNoBurnables(walletAddress);

            /*res.forEach((r: Asset) => {
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
						burnNow: tmp.burnNow,
					};
					ba.push(tmpR);
				} else {
					oa.push(r);
				}
			});*/
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
    }; // Return the setAssets function
};
