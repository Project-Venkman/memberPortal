import React from "react";
import { Routes, Route } from "react-router";
import Login from "@pages/Login";
import Result from "@pages/Result";
import ResultTest from "@pages/ResultTest";
import { CoinInventory } from "@pages/CoinInventory";
import { Mint } from "@pages/Mint";
import Burn from "@pages/Burn";
import Accordion from "@pages/ChooseContract";
import Bill from "@assets/bill/Bill-Murray-Applied-at-P.F.-Changs-scaled.jpg";
// import Earth from "@assets/earth/earth.jpg";
import ELF from "@assets/images/rkt164.jpg"
const accordionData = [
	{
		title: 'Bill Murray',
		description: 'This is the description for the first accordion item.',
		image: Bill
	},
	{
		title: 'EarthLight Foundation',
		description: 'This is the description for the second accordion item.',
		image: ELF,
	},
]
const MRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<Login />} />
			<Route path={"/Login"} element={<Login />} />
			<Route path={"/Result"} element={<Result />} />
			<Route path={"/ResultTest"} element={<ResultTest />} />
			<Route path={"/Burn"} element={<Burn />} />
			<Route path={"/CoinInventory"} element={<CoinInventory />} />
			<Route path={"/Mint"} element={<Mint />} />
			<Route path={"/ChooseContract"} element={<Accordion data={accordionData} />} />
		</Routes>
	)
}

export default MRoutes;
