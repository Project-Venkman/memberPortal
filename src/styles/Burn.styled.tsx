import tw from 'twin.macro';
import styled from 'styled-components';
import heroBG from '@assets/bill/COUCH-FOR-SPLASH-PAGE.png';

export const BurnPage = styled.div`
    background-image: url(${heroBG});
    ${tw`flex flex-col items-center justify-center h-full relative bg-cover bg-center bg-no-repeat`}
`;
export const BurnContainer = styled.div`
    ${tw`w-full h-full`}
`;
// items-center xxs:h-[80%] xxs:-mt-12 2xl:h-[103%] xxxs:h-[60%] xs:h-[100%] xl:h-[95%]
export const BurnBlocker = styled.div`
    ${tw`
		bg-black/50 absolute w-full h-full text-white flex justify-center items-center text-3xl z-1
	`}
`;
export const BurnItems = styled.div`
    ${tw`
		items-center
		w-full mt-8
		flex flex-row gap-4  
		overflow-y-auto flex-wrap 2xl:max-h-[632px]
		relative`}
`;
export const BurnCardContainer = styled.div`
    ${tw`
		mx-2 h-full
		relative flex flex-col 
		border-2 border-solid border-[#CD9F29] rounded`}
`;
export const BurnContainerHeader = styled.div`
    ${tw` flex `}
`;
export const BurnHeader = styled.h1`
    ${tw`w-full relative p-2 font-sans font-bold text-gold text-[24px] tracking-[.2px] h-[50px] 	`}
`;
export const BurnName = styled.div`
    ${tw`font-sans font-bold text-white text-[16px] tracking-[.2px] h-[100%] 2xl:max-h-[632px]`}
`;
export const BurnInfoContainer = styled.div`
    ${tw`flex flex-col h-full w-full justify-center`}
`;
export const BurnDataContainer = styled.div`
    ${tw`flex flex-col items-center text-gold h-[100%]`}
`;
export const BurnDataHeader = styled.div`
    ${tw`bg-gold/50 pl-2 pr-2 pt-2 text-white w-full h-[64px]`}
`;
export const BurnImageContainer = styled.div`
    ${tw`flex flex-col justify-center items-center h-[197px] bg-black`}
`;
export const BurnImage = styled.img`
    ${tw`h-full`}
`;
export const BurnDescription = styled.div`
    ${tw`w-full text-center font-sans font-bold text-white text-[16px] tracking-[.2px] py-2 bg-gold/25`}
`;
export const BurnButtonContainer = styled.div`
    ${tw`w-full h-[14%] text-base font-bold bg-gold/50 hover:bg-gold/25 flex text-center`}
`;
export const BurnURLContainer = styled.div`
    ${tw`w-full text-white cursor-pointer h-[35px] items-center flex flex-col justify-center`}
`;
