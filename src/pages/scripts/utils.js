import { useEffect, useRef } from "react";

export const truncateAddress = (address) => {
	if (!address) return "No Account";
	const match = address.match(
		/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
	);
	if (!match) return address;
	return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

export const usePrevious = (value) => {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
};
