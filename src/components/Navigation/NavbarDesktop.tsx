import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBarProps } from "@customtypes/index";
import {
	ResultPageNav, ResultPageNavButton
} from "@styles/index";
import { useDispatch } from "react-redux";

export const NavbarDesktop: React.FC<NavBarProps> = (props) => {
	const { modalOpen, setModalOpen, setModalType } = props;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const navButtons: Array<string> = ["media", "claim", "events"];

	const handleDataModalClick = (e: string) => {
		setModalType(e)
		setModalOpen(true);
	}

	const handleClick = () => {
		window.localStorage.clear();
		dispatch({ type: "RESET" });
		navigate("/Login");
	}

	const handleBurnClick = () => {
		navigate("/Burn");
	}

	return (
		<ResultPageNav>
			{navButtons.map((btn: string) => {
				return (
					<ResultPageNavButton key={btn} value={btn} hidden={btn === "events"} onClick={() => {
						if (modalOpen) setModalOpen(!modalOpen);
						handleDataModalClick(btn)
					}}>
						{btn === "claim" && (
							<span>{btn}</span>
						)}
						{btn === "media" && (
							<span>{btn}</span>
						)}
						{/*{btn === "burn" && (
							<span>{btn}</span>
						)}*/}
					</ResultPageNavButton>
				)
			}
			)}
			<button className={"font-barlow uppercase tracking-[1.5px] text-[18px] leading-[28.8px] font-black antialiased hover:animate-pulse hover:text-gold"} onClick={handleBurnClick} >Burn</button>
			<button className={"absolute right-0 portrait:bottom-0 uppercase px-8 text-gray-700 hover:text-gray-500"} onClick={handleClick} >Logout</button>
		</ResultPageNav>

	)
}

export default NavbarDesktop;
