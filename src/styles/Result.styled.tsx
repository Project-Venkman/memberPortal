import tw from "twin.macro";
import styled from 'styled-components';
import heroBG from "@assets/bill/COUCH-FOR-SPLASH-PAGE.png";
import space from "@assets/images/Space.jpg";
export const Maintenance = styled.div`
	${tw`w-full h-8 bg-yellow-300 font-bold text-xl italic flex text-center justify-center items-center absolute top-0`}
`

export const ResultPage = styled.div`
	background-image: url(${heroBG});
	${tw`flex flex-col items-center justify-center h-full relative bg-cover bg-center bg-no-repeat`}
`
export const ResultPageNav = styled.div`
	${tw`hidden md:flex z-80 h-[105px] w-full py-2 bg-transparent text-white flex flex-row gap-8 justify-center items-center absolute top-0`};
`
export const ResultPageNavMobile = styled.div`
	${tw`flex md:hidden justify-end z-80 h-16 w-full bg-transparent text-white absolute top-0 right-0`};
`
export const ResultPageNavButton = styled.button`
	span {
		${tw`flex font-barlow uppercase tracking-[1.5px] text-[18px] leading-[28.8px] font-black antialiased hover:animate-pulse hover:text-gold`};
	}
`
export const ResultPageNavListItem = styled.li`
	${tw`p-4 bg-black`}
	&:not(:last-child) {
		${tw`border-b border-solid border-gray-300/25`}
	}
	span {
		${tw`font-barlow uppercase tracking-[1.5px] text-[18px] leading-[28.8px] font-black antialiased hover:animate-pulse hover:text-gold`};
	}
`

export const ResultCard = styled.div`
	${tw`
		relative
		w-3/5 md:portrait:w-1/2 md:w-auto xl:w-1/3
		top-14 md:-top-16 xl:-top-4 sm:-top-20 xxxs:-top-6 lg:-top-10
		xs:tall:portrait:-top-8 short:portrait:-top-2 md:tall:portrait:-top-6 md:portrait:-top-20 
	`};
`

export const ResultCardContent = styled.div` 
	${tw`relative w-full h-full flex flex-col justify-center items-center`};
	transform: rotate(-4deg);
`

export const ImageContainer = styled.div`
	${tw`absolute w-8/12 xxxs:w-full xxs:w-full xs:w-full md:w-9/12 lg:w-8/12 xl:w-7/12 h-full flex flex-col items-center justify-center`};
`
export const FrameImg = styled.img`
	${tw`z-30 w-8/12 xxxs:w-full xxs:w-full xs:w-full md:w-9/12 lg:w-8/12 xl:w-7/12`}; 
`
export const NFTImg = styled.img`
	${tw`w-[69%] opacity-0`};
  	transition: opacity 1s linear;
  	&.loaded {
	  	${tw`opacity-100`}
    }
`
export const CouponStyled = styled.div`
	${tw`w-full text-white mb-4`}
`
export const ResultDataModalContainer = styled.div`
	${tw``}
`
export const ResultDataModalOverlay = styled.div`
	${tw`absolute bg-black/50 w-full h-full top-0 left-0 z-[50]`}
`
export const ResultDataModal = styled.div`
	transform: translate(-50%, -50%);
	${tw`
		w-3/4 h-3/4 portrait:h-[calc(100% - 64px)] portrait:w-full
		flex z-[60] bg-black/50
		fixed top-1/2 left-1/2 portrait:top-16 portrait:left-0
		portrait:transform-none
	`}
`
export const ResultDataModalHeader = styled.div`
	${tw`text-white absolute right-0 top-0 h-8 flex justify-end rounded z-100`}
`
export const ModalCloseButton = styled.button`
	${tw`text-white p-4`};
`
export const SelectionContainer = styled.div`
	${tw`
		cursor-pointer absolute md:top-10 md:left-20 md:h-1/4 max-h-16 md:w-1/5 bg-transparent z-90 top-14 text-2xl w-3/4
		text-center text-white font-black font-barlow tracking-wider uppercase
		text-xs md:text-lg
		bottom-[-3.8rem] portrait:bottom-[-2.8rem] portrait:md:bottom-[-3.8rem]
	 `};
`
export const SelectionHeader = styled.div`
	${tw`w-full flex flex-col justify-center items-center m-0 relative hover:text-yellow-500 text-xl`};
`
export const DescriptionButtonContainer = styled.div`
	${tw`
		w-full h-full absolute 
	`};
`
export const DescriptionButton = styled.div`
	${tw`
		cursor-pointer bg-white rounded-full h-3 w-3 z-1 absolute
		animate-ping hover:animate-none
		top-[3%] left-[19%]
	`};
`
export const SelectionOptionsContainer = styled.div`
	${tw`
		w-full
	`}
`
export const SelectionOptionsList = styled.ul`
	${tw`
		absolute top-[120px] w-full left-0 bg-black/75 ease-in-out duration-300 md:text-sm  xxxs:top-[75px] xs:top-[50px] sm:top-[60px] md:top-[75px] lg:top-[80px] xl:top-[80px]
	`}
`
export const SelectionOptionsListItem = styled.li`
	${tw`
		hover:text-green-700 p-1 hover:bg-white/25
	`}
`


export const TelescopeImg = styled.img`
	${tw`z-30 w-8/12 xxxs:w-full xxs:w-full xs:w-full md:w-full lg:w-full xl:w-full`}; 
`

export const ResultCardELF = styled.div`
	background-image: url(${space});

	${tw`
		relative
		rounded-full
		w-4/5 md:portrait:w-4/5 md:w-4/5 xl:w-2/3
		top-14 md:-top-16 xl:-top-4 sm:-top-20 xxxs:-top-6 lg:-top-10
		xs:tall:portrait:-top-8 short:portrait:-top-2 md:tall:portrait:-top-6 md:portrait:-top-20 
	`};
`

export const ResultCardContentELF = styled.div` 
	${tw`relative w-full h-full flex flex-col justify-center items-center`};
	// transform: rotate(-4deg);
`
export const ImageContainerELF = styled.div`
	${tw`absolute w-8/12 xxxs:w-7/12 xxs:w-7/12 xs:w-7/12 md:w-7/12 lg:w-7/12 xl:w-7/12 h-full flex flex-col items-center justify-center`};
`
export const ResultPageELF = styled.div`
	${tw`flex flex-col items-center justify-center h-full relative bg-cover bg-center bg-no-repeat`}
`