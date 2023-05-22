import tw from 'twin.macro';
import styled from 'styled-components';

export const ClaimContainer = styled.div`
    ${tw`absolute w-full h-full top-0 left-0`}
`;
export const ClaimItems = styled.div`
    ${tw`
		w-full h-full p-4 
		flex flex-row gap-4 portrait:flex-row
		overflow-y-auto flex-wrap`}
`;
export const ClaimCardContainer = styled.div`
    ${tw`
		h-[fit-content] w-[fit-content] md:max-w-[20%]
		w-1/2 md:w-[32%] portrait:w-full iphonex:portrait:w-full iphonex:w-1/2
		relative flex flex-col 
		border-2 border-solid border-[#CD9F29] rounded`}
`;
export const ClaimContainerHeader = styled.div`
    ${tw``}
`;
export const ClaimHeader = styled.h1`
    ${tw`w-full relative p-4 font-sans font-bold text-gold text-[24px] tracking-[.2px]`}
`;
export const ClaimName = styled.div`
    ${tw`font-sans font-bold text-white text-[20px] tracking-[.2px]`}
`;
export const ClaimInfoContainer = styled.div`
    ${tw`flex flex-row h-full w-full`}
`;
export const ClaimDataContainer = styled.div`
    ${tw`flex flex-col items-center text-gold`}
`;
export const ClaimDataHeader = styled.div`
    ${tw`bg-gold/50 p-2 text-white w-full`}
`;
export const ClaimImageContainer = styled.div`
    ${tw`flex flex-col justify-center items-center`}
`;
export const ClaimImage = styled.img`
    ${tw``}
`;
export const ClaimDescription = styled.div`
    ${tw`w-full text-center font-sans font-bold text-white text-[16px] tracking-[.2px] py-2 bg-gold/25`}
`;
export const ClaimButtonContainer = styled.div`
    ${tw`w-full p-2 text-base font-bold bg-gold/50 hover:bg-gold/25 flex text-center`}
`;
export const ClaimURLContainer = styled.div`
    ${tw`w-full text-white cursor-pointer`}
`;
