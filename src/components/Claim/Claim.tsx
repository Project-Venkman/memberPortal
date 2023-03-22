import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Claim as ClaimType, Asset, ClaimProps } from "@customtypes/index";
import {
	ClaimContainer,
	ClaimContainerHeader,
	ClaimHeader,
	ClaimItems
} from "@styles/index";
import { RootState } from "@state/index";
import { ClaimCard } from "@components/index";

export const Claim: React.FC<ClaimProps> = (props) => {
	const { } = props;
	const claims: Array<ClaimType> = useSelector((state: RootState) => state.claimAssets as Array<ClaimType>);

	useEffect(() => {
		//console.log("all claims", claims)
	}, [claims])

	return (
		<ClaimContainer id={"Burn-container"}>
			<ClaimContainerHeader id={"Burn-header"}>
				<ClaimHeader>Claimable</ClaimHeader>
			</ClaimContainerHeader>
			<ClaimItems id={"claim-items"}>
			{ claims.map((claim: ClaimType, i: number) => {
				return (
					<ClaimCard key={i} index={i}/>
				)
			})}
			</ClaimItems>
		</ClaimContainer>
	)
}

export default Claim