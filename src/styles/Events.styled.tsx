import tw from "twin.macro";
import styled from 'styled-components';

export const Event = styled.div`
	${tw`flex flex-col`}
`;
export const EventsContainer = styled.div`
	${tw`absolute w-full h-full top-0 left-0`}
`;
export const EventsContainerHeader = styled.div`
	${tw``}
`
export const EventsHeader = styled.h1`
	${tw`w-full relative p-4 border-b border-solid border-gold font-sans font-bold text-gold text-[24px] tracking-[.2px]`}
`;
export const EventName = styled.div`
	${tw`font-sans font-bold text-gold text-[24px] tracking-[.2px]`}
`;
export const EventInfoContainer = styled.div`
	${tw`
		h-1/4 portrait:p-4
		flex flex-row 
		border-b border-solid border-gold
	`}
`;
export const EventDataContainer = styled.div`
	${tw`
		flex flex-col flex-[0_0_90%] 
		text-gold py-4 pr-8 portrait:p-0
	`}
`;
export const EventMetaHeader = styled.div`

`;
export const EventDateFull = styled.div`
	${tw`font-sans font-bold text-gold text-[24px] tracking-[.2px]`}
`;
export const EventDescription = styled.div`
	${tw`font-sans font-bold text-white text-[16px] tracking-[.2px]`}
`;

export const EventDateShort = styled.div`
	${tw`
		flex flex-col justify-center items-center
		portrait:hidden
	`}
	flex: 0 0 10%;
`;
export const EventDateDay = styled.div`
	${tw`leading-none font-sans font-bold text-white text-[50px] tracking-[.2px]`}
`;
export const EventDateMonth = styled.div`
	${tw`font-sans font-normal text-white text-[22px] tracking-[.2px]`}
`;
