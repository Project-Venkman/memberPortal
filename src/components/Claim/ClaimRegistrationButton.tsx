import React, { useEffect, useState } from "react";
import { Claim, ClaimRegistrationButtonProps } from "@customtypes/index";
import { ClaimURLContainer } from "@styles/index";
import { Api } from "@pages/scripts/API";
import { useSelector } from "react-redux";
import { RootState } from "@state/index";

export const ClaimRegistrationButton: React.FC<ClaimRegistrationButtonProps> = (props) => {
	const { text, index } = props;
	const walletAddress: string = useSelector((state: RootState) => state.walletAddress);
	const record: Claim = useSelector((state: RootState) => state.claimAssets)[index];
	const [message, setMessage] = useState<string>("")

	const handleRegistrationClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		await Api.registration.signup(record, walletAddress)
			.then(res => {
				console.log(res);
			});
	}

	useEffect(() => {
		if (message.length > 0) {
			alert(message);
		}
	}, [message])

	return (
		<ClaimURLContainer>
			<button disabled={true} onClick={handleRegistrationClick}>{text}</button>
		</ClaimURLContainer>
	)
}
export default ClaimRegistrationButton

