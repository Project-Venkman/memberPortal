import tw from "twin.macro";
import styled from "styled-components";
import {BaseStyleProps} from "@customtypes/Base";

export const ConnectorButtonComponent = styled.button.attrs((props: BaseStyleProps) => props.style)`
	background-color: ${props => props.style?.backgroundColor};
	border-width: ${props => props.style?.borderWidth};
	border-style: ${props => props.style?.borderStyle};
	border-color: ${props => props.style?.borderColor};
	border-radius: ${props => props.style?.borderRadius};
	&:hover {
		background-color: "blue";
	}
	${tw`
		h-16
		w-full 
		p-4 
		hover:bg-gray-300
		text-black 
		flex 
		flex-row 
		justify-center 
		items-center
	`}
	&.activating {
		${tw`
			bg-gray-700
		`}
	}
	&.active {
		${tw`
			bg-green-300
		`}
	}
	&.error {
		${tw`
			bg-red-700
			font-bold
			text-xl
		`}
	}
	&.switch {
		${tw`
			bg-yellow-200
			font-bold
			text-xl
		`}
	}
	img {
		${tw`
			max-h-full
			max-w-full
		`}
	}
	span {
		${tw`
			font-bold
			text-xl
			font-sans
		`}
	}
`

export const ConnectorsButtonGroup = styled.div.attrs((props: BaseStyleProps) => props.style)`
	background-color: ${props => props.style?.backgroundColor};
	border-width: ${props => props.style?.borderWidth};
	border-style: ${props => props.style?.borderStyle};
	border-color: ${props => props.style?.borderColor};
	border-radius: ${props => props.style?.borderRadius};
	${tw`
		flex
		flex-row
		justify-center
		p-4
	`}
`
