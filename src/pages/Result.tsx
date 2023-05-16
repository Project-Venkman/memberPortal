import React, { useEffect, useState } from 'react';
import { Asset, WalletData, ResultProps, BurnAsset } from '@customtypes/index';
import {
    Asset,
    WalletData,
    ResultProps,
    Burn as BurnType,
} from '@customtypes/index';
import { RootState } from '@state/store';
import { useDispatch, useSelector } from 'react-redux';
import { Api } from '@pages/scripts/API';
import {
    setWallet,
    setEmptyWallet,
    setWalletAssets,
    setBurnAssets,
} from '@state/features';
import { useNavigate } from 'react-router-dom';
import PVResults from '@components/Result/PV/PVResults';
import BMResult from '@components/Result/BM/BMResults';
import ELFResult from '@components/Result/ELF/ELFResults';

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
    // const burns: Array<Asset> = useSelector(
    //     (state: RootState) => state.burnAssets as Array<Asset>
    // );
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!walletAddress || walletAddress.length < 1) return;
        (async () => {
            setLoading(true);
            const burnContracts = await Api.contract.GetAllBurnableContracts();
            // await Api.asset.getByWalletAddress(walletAddress)
            await Api.asset
                .getByWalletAddress(
                    '0x2611B286994571b4D5292ACFF5619da8074b5c54'
                )
                .then(async (res) => {
                    dispatch(setWallet(res));
                    let oa: Array<Asset> = [];
                    let ba: Array<BurnAsset> = [];
                    await res.forEach((r: Asset) => {
                        let billContracts = [
                            '40000001-0001-0001-0002-000000000001',
                            '40000001-0001-0001-0002-000000000002',
                        ];
                        if (billContracts.includes(r.contractId)) {
                            oa.push(r);
                        }
                        //     const burnContractIds = ["00000004-0000-0000-0000-000000000004", "00000004-0000-0000-0000-000000000005"];
                        //     // HERE IS WHERE WE NEED TO FILTER OUT THE BURNABLES
                        //     if (!burnContractIds.includes(r.ownedAssets![0].typeID))
                        //         oa.push(...r.ownedAssets!);
                        //     console.log(ba.findIndex((r2) => r.ownedAssets![0].burnBMAssets![0].assetNumber === r2.assetNumber))
                        //     //
                        //     // if (r.ownedAssets![0].burnBMAssets!.length) {
                        //     //     let tmp = [...r.ownedAssets![0].burnBMAssets!];
                        //     //     tmp.forEach(t => {
                        //     //         if (!ba.find(b => b.assetNumber === t.assetNumber)) {
                        //     //             ba.push(...r.ownedAssets![0].burnBMAssets!)
                        //     //         }
                        //     //     })
                        //     // }
                        if (
                            burnContracts.filter(
                                (b: BurnAsset) => b.id === r.contractId
                            ).length
                        ) {
                            let tmp = burnContracts.filter(
                                (b: BurnAsset) => b.id === r.contractId
                            )[0];
                            let tmpR: BurnAsset = {
                                ...r,
                                contractAddress: tmp.address,
                            };
                            tmpR.name = tmp.description;
                            ba.push(tmpR);
                            // ba.push(r[i]!);
                        }
                    });
                    dispatch(setWalletAssets(oa));
                    dispatch(setBurnAssets(ba));
                    // await dispatch(setBurnAssets(ba));
                    // await Api.asset.getBurnables(walletAddress)
                    //     .then((res) => {
                    //         console.log("getBurnables", res);
                    //     });
                    // getBurns();
                    // if (!oa.length && ba.length) navigate('/Burn');
                    if (!oa.length && ba.length) navigate('/Burn');
                    // if (ba.length) navigate('/Burn');
                    //setVerified(true);
                    setLoading(false);
                })
                .catch(async (error) => {
                    dispatch(setEmptyWallet(walletAddress));
                    setLoading(false);
                    if (error) console.error(await error);
                });
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
