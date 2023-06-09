import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Asset, PeachProps, WalletData} from "@customtypes/index";
import Coupon from "@components/Result/Coupon";
import { ClaimURL } from "@components/index";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@state/store";
import {truncateAddress} from "@scripts/utils";
import {removeWallet} from "@state/features";

export const Invalid: React.FC<PeachProps> = (props) => {
	const { walletData } = props;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const wallet: WalletData = useSelector((state: RootState) => state.wallet);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		window.localStorage.clear();
		dispatch({type: "RESET"});
		navigate("/Login");
	}

	return (
		<React.Fragment>
			<div className={"bg-black text-white p-2 absolute top-1/2 left-1/2 w-[67%] h-[71%] z-100"} style={{transform: "translate(-50%, -50%)"}}>
				<p>{truncateAddress(wallet.walletAddress) +  " does not contain a valid NFT."}</p>
				<br/>
				<button className={"z-100 cursor-pointer"} onClick={handleClick}>Click here to return to Login</button>
			</div>
		</React.Fragment>
	)
}

export default Invalid;
