import React from "react";
import { CouponType } from "@customtypes/index";
import { CouponStyled } from "@styles/index";

export const Coupon: React.FC<CouponType> = (props) => {
	return (
		<CouponStyled>
			<p>{props.code !== undefined ? props.code : "Return Empty"}</p>
		</CouponStyled>
	)
}

export default Coupon;