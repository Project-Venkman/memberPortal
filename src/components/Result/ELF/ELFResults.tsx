import React, { useEffect, useState } from "react";
import {
    Asset,
    WalletData,
    ResultProps,
    Burn as BurnType
} from "@customtypes/index";
import { Invalid, ItemAssetImageELF, ItemAssetImage, ItemModal, ItemSelect, NavbarDesktop, NavbarMobile } from "@components/index";
import {
    FrameImg,
    ImageContainer,
    ImageContainerELF,
    ResultCard,
    ResultCardContent,
    ResultCardContentELF,
    ResultCardELF,
    ResultPage,
    ResultPageELF,
    TelescopeImg
} from "@styles/index";
import frame from "@assets/bill/FRAME-NO-BILL2.png";
import { RootState } from "@state/store";
import { useDispatch, useSelector } from "react-redux";
import { Api } from "@pages/scripts/API";
import {
    setWallet,
    setEmptyWallet,
    setWalletAssets,
    setBurnAssets
} from "@state/features";
import { truncateAddress } from "@pages/scripts/utils";
import { LoadIndicator } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import telescope from "@assets/images/telescope.png"
import { NFTImg } from "@styles/index";
import PVResults from "@components/Result/PV/PVResults";
import BMResult from "@components/Result/BM/BMResults"


const ELFResult: React.FC<ResultProps> = (props) => {

    const { } = props;
    const navigate = useNavigate();
    const wallet: WalletData = useSelector((state: RootState) => state.wallet);
    const walletAddress: string = useSelector((state: RootState) => state.walletAddress);
    const walletAssets: Array<Asset> = useSelector((state: RootState) => state.walletAssets);
    const burns: Array<BurnType> = useSelector((state: RootState) => state.burnAssets as Array<BurnType>);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const currentUrl = new URL(window.location.href);
    useEffect(() => {
        if (!walletAddress.length) return;
        (async () => {
            setLoading(true);
            await Api.asset.getByWalletAddress(walletAddress)

                // await Api.ownership.verify(walletAddress)
                .then(async (res) => {
                    await dispatch(setWallet(res));
                    let oa: Array<Asset> = [];
                    let ba: Array<BurnType> = [];
                    await res.forEach((r: WalletData) => {
                        const burnContractIds = ["00000004-0000-0000-0000-000000000004", "00000004-0000-0000-0000-000000000005"];
                        // HERE IS WHERE WE NEED TO FILTER OUT THE BURNABLES
                        if (!burnContractIds.includes(r.ownedAssets![0].typeID))
                            oa.push(...r.ownedAssets!);
                        //
                        if (r.ownedAssets![0].burnBMAssets!.length) {
                            let tmp = [...r.ownedAssets![0].burnBMAssets!];
                            tmp.forEach(t => {
                                if (!ba.find(b => b.assetNumber === t.assetNumber)) {
                                    ba.push(...r.ownedAssets![0].burnBMAssets!)
                                }
                            })
                        }
                    })

                    await dispatch(setWalletAssets(oa));
                    await dispatch(setBurnAssets(ba));
                    await Api.asset.getBurnables(walletAddress)
                        .then((res) => {
                            console.log("getBurnables", res);
                        });
                    //getBurns();
                    if (!oa.length && burns.length) navigate('/Burn');
                    //setVerified(true);
                    setLoading(false);
                })
                .catch(async (error) => {
                    dispatch(setEmptyWallet(walletAddress));
                    setLoading(false);
                    console.error(await error);
                });

        })();
    }, [walletAddress])

    return (
        <ResultPageELF>
            {
                walletAssets.length > 0 && !loading &&
                <ItemSelect />

            }
            {
                !loading && walletAssets.length && [
                    <NavbarDesktop key={0} modalOpen={modalOpen} setModalOpen={setModalOpen} setModalType={setModalType} />,
                    <NavbarMobile key={1} modalOpen={modalOpen} setModalOpen={setModalOpen} setModalType={setModalType} />
                ]
            }
            {
                loading && !walletAssets.length &&
                <ResultCardELF id={"result-card"}>
                    <ResultCardContentELF id={"result-card-content"}>
                        <TelescopeImg id={"frame"} src={telescope} />
                        <ImageContainerELF id={"image-container"}>
                            <div className={" text-white p-2 absolute top-1/2 left-1/2 w-[67%] h-[62%] z-100"} style={{ transform: "translate(-50%, -50%)" }}>
                                <p>{`Retrieving NFTs for ${truncateAddress(walletAddress)}`}</p>
                                <LoadIndicator visible={loading}></LoadIndicator>
                            </div>
                        </ImageContainerELF>
                    </ResultCardContentELF>
                </ResultCardELF>
            }
            {
                walletAssets.length > 0 &&
                <ResultCardELF id={"result-card"}>
                    <ResultCardContentELF id={"result-card-content"}>
                        <TelescopeImg className="z-30" id={"frame"} src={telescope} />
                        {/* <ImageContainer className="z-50" id={"image-container"}>
							{!loading && <ItemAssetImage key={1} />}
						</ImageContainer> */}
                        {walletAddress == "0x42017df7ce71AD2Fe80cCa4C3D9bFc0512fff5Cf" && (
                            <ImageContainerELF className="z-50" id={"image-container"}>
                                {!loading && <ItemAssetImageELF key={1} />}
                            </ImageContainerELF>
                        )}
                    </ResultCardContentELF>
                </ResultCardELF>
            }
            {
                !walletAssets.length && !loading &&
                <ResultCardELF id={"result-card"}>
                    <ResultCardContentELF id={"result-card-content"}>
                        <TelescopeImg id={"frame"} src={telescope} />
                        <ImageContainerELF id={"image-container"}>
                            <Invalid walletData={wallet} />
                        </ImageContainerELF>
                    </ResultCardContentELF>
                </ResultCardELF>
            }
            {
                modalOpen && (
                    <ItemModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalType={modalType} />
                )
            }
        </ResultPageELF >
    )
}

export default ELFResult;
