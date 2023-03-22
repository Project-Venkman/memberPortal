import tw from "twin.macro";
import styled from 'styled-components';
import { FaWallet } from "react-icons/fa";

export const LoginPage = styled.div`
	${tw`
		w-full max-w-[1380px] h-screen 
		flex justify-center items-center
		mx-auto
		bg-black bg-origin-padding bg-center bg-cover md:bg-contain bg-no-repeat
	`};
`
export const LoginContainer = styled.div`
	${tw`
		flex flex-col items-end 
		bg-center bg-cover bg-no-repeat 
		h-full w-full 
		md:px-0
		relative
	`};
`
export const LoginFormWalletContainer = styled.div`
	${tw`w-3/4 md:w-1/2 flex justify-center flex-col items-center`}
`;
export const LoginWallet = styled.div`
	${tw`flex flex-col md:flex-row gap-4 p-4 justify-center items-center rounded-md bg-transparent`}
`;
export const LoginLogoContainer = styled.div`
	${tw`
		absolute
		flex flex-col justify-center items-center 
		w-[780px] md:h-auto md:w-full max-w-[1380px]
		my-16 portrait:m-8
	`};
`
export const LoginLogoImg = styled.img`
	${tw`h-full`};
`
export const LoginTextContainer = styled.div`
	${tw`flex flex-col mx-8 mb-4`};
`
export const LoginText = styled.span`
	${tw`text-white pb-1 text-center`}
`
export const ConnectedCard = styled.div`
	${tw`bg-transparent w-full h-5/6 landscape:lg:h-3/4 landscape:short:h-2/3 shadow-none p-0 flex justify-center items-center`};
`
export const ConnectedCardActions = styled.div`
	${tw`bg-transparent flex w-full landscape:short:sm:w-5/6 items-center justify-center m-0 p-0`};
`
export const ConnectedButtonGrid = styled.div`
	${tw`
		absolute right-0 top-0
		flex flex-col portrait:md:flex-col landscape:short:sm:flex-row md:flex-row justify-end items-end
		w-full md:w-64
		m-0 p-0
	`};
`
export const ConnectedButtonContainer = styled.div`
	${tw`
		flex items-center justify-center 
		px-4 landscape:short:sm:px-2 py-1 portrait:md:py-3 md:py-0
		w-full
	`};
`
export const ConnectedButton = styled.button`
	${tw`
		w-7/12 md:w-full landscape:short:sm:w-full
		h-14 md:h-20 portrait:md:h-24 landscape:short:h-14 
		border-0 p-2 rounded-md border-white/50 border-solid 
		text-white/75 
		bg-transparent 
		md:mx-1 my-1 md:my-0 first:mt-0 last:mb-0`};
`
export const ConnectedButtonText = styled.span`
	${tw`portrait:md:text-2xl flex flex-row gap-4 justify-center items-center`};
`
export const WalletIcon = styled(FaWallet)`
	${tw`text-white`};
`
