import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Claim as ClaimType, ClaimProps } from "@customtypes/index";
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
	}, [claims]);

	return (
		<ClaimContainer id={"Burn-container"}>
			<ClaimContainerHeader id={"Burn-header"}>
				<ClaimHeader>Claimable</ClaimHeader>
			</ClaimContainerHeader>
			<ClaimItems id={"claim-items"}>
				{claims.length > 0 && // Check if claims array is not empty
					claims.map((claim: ClaimType, i: number) => (
						<ClaimCard key={i} index={i} />
					))}
			</ClaimItems>
		</ClaimContainer>
	);
};

export default Claim;
