import React, { useEffect, useState } from "react";
import {
    Asset,
    WalletData,
    ResultProps,
    ProfileProps,
    Burn as BurnType
} from "@customtypes/index";
import { Invalid, ItemAssetImageELF, ItemAssetImage, ItemModal, ItemSelect, NavbarDesktop, NavbarMobile } from "@components/index";
import {
    FrameImg,
    ImageContainer,
    ResultCard,
    ResultCardContent,
    ResultPage
} from "@styles/index";
import frame from "@assets/bill/FRAME-NO-BILL2.png";
import { RootState } from "@state/store";
import { useDispatch, useSelector } from "react-redux";
import { Api } from "@scripts/API";
import {
    setWallet,
    setEmptyWallet,
    setWalletAssets,
    setBurnAssets
} from "@state/features";
import { truncateAddress } from "@scripts/utils";
import { LoadIndicator } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import telescope from "@assets/images/telescope.png"
import { NFTImg } from "@styles/index";
import PVResults from "@components/Result/PV/PVResults";
import BMResult from "@components/Result/BM/BMResults"
import ELFResult from "@components/Result/ELF/ELFResults"


const ProfilePage: React.FC<ProfileProps> = (props) => {
    const { } = props;
    const navigate = useNavigate();
    const wallet: WalletData = useSelector((state: RootState) => state.wallet);
    const walletAddress: string = useSelector((state: RootState) => state.walletAddress);
    const walletAssets: Array<Asset> = useSelector((state: RootState) => state.walletAssets);
    const burns: Array<BurnType> = useSelector((state: RootState) => state.burnAssets as Array<BurnType>);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const currentUrl = new URL(window.location.href);
    console.log(currentUrl)
    console.log(wallet)
    console.log(walletAddress)
    console.log(walletAssets)

    useEffect(() => {
    }, [])
    return (
        <div>{walletAddress}</div>
    )
}

export default ProfilePage;