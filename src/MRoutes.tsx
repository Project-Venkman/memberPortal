import React from "react";
import { Routes, Route } from "react-router";
import Login from "@pages/Login";
import Result from "@pages/Result";
import ResultTest from "@pages/ResultTest";
import {CoinInventory} from "@pages/CoinInventory";
import {Mint} from "@pages/Mint";
import Burn from "@pages/Burn";

const MRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<Login/>}/>
			<Route path={"/Login"} element={<Login/>}/>
			<Route path={"/Result"} element={<Result/>}/>
			<Route path={"/ResultTest"} element={<ResultTest/>}/>
			<Route path={"/Burn"} element={<Burn/>}/>
			<Route path={"/CoinInventory"} element={<CoinInventory/>}/>
			<Route path={"/Mint"} element={<Mint/>}/>
		</Routes>
	)
}

export default MRoutes;
