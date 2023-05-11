import React, { useEffect, useState } from "react";
import {
	ClaimDataContainer,
	ClaimDescription,
	ClaimInfoContainer,
	ClaimDataHeader,
	ClaimName,
	ClaimButtonContainer,
	ClaimCardContainer,
	ClaimImage,
	ClaimImageContainer
} from "@styles/index";
import { Claim, ClaimCardProps } from "@customtypes/index";
import { ClaimURL } from "@components/index";
import { useSelector } from "react-redux";
import { RootState } from "@state/index";
import coinspin from "../../assets/images/CoinSpin.gif";

export const ClaimCard: React.FC<ClaimCardProps> = (props) => {
	const { index, children } = props;
	const claims: Array<Claim> = useSelector((state: RootState) => state.claimAssets as Array<Claim>);
	const [claim, setClaim] = useState<Claim>({
		archived: false,
		assetId: "",
		claimed: false,
		code: "",
		createBy: "",
		createDate: "",
		description: "",
		id: "",
		name: "",
		orderId: "",
		tokenId: "",
		updateBy: "",
		updateDate: "",
		url: "",
	});
	const [image, setImage] = useState<string>("");

	useEffect(() => {
		if (!claims) return;
		setClaim(claims[index])
	}, [claims, index])

	useEffect(() => {
		if (!claim) return;
		setImage(coinspin);
	}, [claim])

	return (

		<ClaimCardContainer id={"claim-" + index}>
			<ClaimInfoContainer id={"Claim-info-container"}>
				<ClaimDataContainer id={"Claim-data-container"}>
					<ClaimDataHeader id={"Claim-header-info"}>
						<ClaimName id={"Claim-name"}>{claim.name + " " + claim.tokenId}</ClaimName>
					</ClaimDataHeader>
					<ClaimImageContainer>
						<ClaimImage src={image} />
						<ClaimDescription id={"Claim-description"}>
							{"Coupon Code: " + claim.code}
						</ClaimDescription>
					</ClaimImageContainer>
					<ClaimButtonContainer>
						<ClaimURL claimed={claim.claimed} url={claim.url as string} text={"Click Here To Claim"} />
					</ClaimButtonContainer>
				</ClaimDataContainer>
			</ClaimInfoContainer>
		</ClaimCardContainer>
	)

}
export default ClaimCard
