import React, { useEffect, useState } from "react";
import { ResultProps } from "@customtypes/index";
import {
	LandingPage
} from "@styles/index";

const Result: React.FC<ResultProps> = (props) => {

	useEffect(() => {
		window.localStorage.clear()
	}, [])

	return (
		<LandingPage>

		</LandingPage>
	)
}

export default Result;
