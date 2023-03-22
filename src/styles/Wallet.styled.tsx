import tw from "twin.macro";
import styled from "styled-components";

export const WalletButtonGrid = styled.div`
	${tw`flex items-center justify-center px-4 landscape:px-2 w-full landscape:w-1/3 py-1 portrait:md:py-3 md:py-0`}
`
export const WalletButton = styled.button`
	${tw`flex justify-center items-center w-full h-16 border-2 border-gray-500! border-solid! bg-gray-800 hover:bg-gray-300 rounded-lg! p-4`}
`
export const WalletButtonImg = styled.img`
	${tw`h-auto portrait:h-full`}
`
export const WalletButtonText = styled.span`
	${tw`h-8 mr-2`}
`
