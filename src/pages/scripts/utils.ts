import { useEffect, useRef, useState } from 'react';
import { Api } from '@pages/scripts/API';
import {
    setBurnAssets,
    setEmptyWallet,
    setWallet,
    setWalletAssets,
    setLoading,
} from '@state/features';
import { Asset, BurnAsset } from '@customtypes/Asset';

export const truncateAddress = (address: string) => {
    if (!address) return 'No Account';
    const match = address.match(
        /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};

// export const toHex = (num) => {
//     const val = Number(num);
//     return '0x' + val.toString(16);
// };

// export const usePrevious = (value) => {
//     const ref = useRef();
//     useEffect(() => {
//         ref.current = value;
//     }, [value]);
//     return ref.current;
// };

// export const setAssets = async (walletAddress: string) => {
//     const dispatch = useDispatch();
//
//     try {
//         dispatch(setLoading(true));
//
//         const burnContracts = await Api.contract.GetAllBurnableContracts();
//         const res = await Api.asset.getByWalletAddress(walletAddress);
//
//         dispatch(setWallet(res));
//
//         let oa: Array<Asset> = [];
//         let ba: Array<BurnAsset> = [];
//
//         res.forEach((r: Asset) => {
//             if (burnContracts.some((b: BurnAsset) => b.id === r.contractId)) {
//                 const tmp = burnContracts.find(
//                     (b: BurnAsset) => b.id === r.contractId
//                 )!;
//                 const tmpR: BurnAsset = {
//                     ...r,
//                     contractAddress: tmp.address,
//                     name: tmp.description,
//                 };
//                 ba.push(tmpR);
//             } else {
//                 oa.push(r);
//             }
//         });
//
//         dispatch(setWalletAssets(oa));
//         dispatch(setBurnAssets(ba));
//     } catch (error) {
//         dispatch(setEmptyWallet(walletAddress));
//         console.error(error);
//     } finally {
//         dispatch(setLoading(false));
//     }
// };
