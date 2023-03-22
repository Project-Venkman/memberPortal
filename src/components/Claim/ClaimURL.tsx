import React from "react";
import { ClaimURLProps } from "@customtypes/index";
import { ClaimURLContainer } from "@styles/index";

export const ClaimURL: React.FC<ClaimURLProps> = (props) => {
	const { claimed, url, text } = props;
	return (
		<ClaimURLContainer>
			{ claimed ? <div>{"Claimed"}</div> : <a href={url} target={"_blank"}>{text}</a> }
		</ClaimURLContainer>
	)
}
export default ClaimURL
