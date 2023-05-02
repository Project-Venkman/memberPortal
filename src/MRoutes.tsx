import React from "react";
import { Routes, Route } from "react-router";
import Login from "@pages/Login";
import Result from "@pages/Result";
import ResultTest from "@pages/ResultTest";
import { CoinInventory } from "@pages/CoinInventory";
import { Mint } from "@pages/Mint";
import Burn from "@pages/Burn";
import Accordion from "@pages/ChooseContract";
import PVLogin from "@components/Result/PV/PVLogin";
import PVResults from "@components/Result/PV/PVResults";
import { accordionData } from "@pages/ChooseContract"
import ProfilePage from "@pages/Profile";
const MRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<Login />} />
			<Route path={"/Login"} element={<Login />} />
			<Route path={"/PVLogin"} element={<PVLogin />} />
			<Route path={"/Result"} element={<Result />} />
			<Route path={"/ResultTest"} element={<ResultTest />} />
			<Route path={"/Burn"} element={<Burn />} />
			<Route path={"/CoinInventory"} element={<CoinInventory />} />
			<Route path={"/Mint"} element={<Mint />} />
			<Route path={"/PVResult"} element={<Result />} />
			<Route path={"/ELFResult"} element={<Result />} />
			<Route path={"/ELFLogin"} element={<Login />} />
			<Route path={"/ChooseContract"} element={<Accordion data={accordionData} />} />
			<Route path={"/ProfilePage"} element={<ProfilePage />} />
		</Routes>
	)
}

export default MRoutes;
