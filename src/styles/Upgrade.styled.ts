import tw from 'twin.macro';
import styled from 'styled-components';

export const UpgradeModalOverlay = styled.div`
    ${tw`absolute inset-0 z-60 bg-black/75`}
`;

export const UpgradeModalContainer = styled.div`
    ${tw`relative bg-gold/75 border-2 border-gold border-solid h-[70%] w-[80%] rounded-lg z-70 flex flex-col`}
`;

export const UpgradeSpinnerContainer = styled.div`
    ${tw`flex items-center justify-center w-full h-full absolute top-0 left-0 right-0 bottom-0`}
`;

export const UpgradeModalHeader = styled.div`
    ${tw`p-4 font-bold text-white text-xl h-[10%] flex items-center justify-center`}
    > p {
    }
`;
export const UpgradeModalBody = styled.div`
    ${tw`flex h-[80%] z-90 border-y border-gold border-solid bg-white`}
`;

export const UpgradeModalBodyLeft = styled.div`
    ${tw`relative flex flex-col w-full z-90 p-4 cursor-pointer hover:bg-gray-200 border-r border-gold`}
`;
export const UpgradeModalBodyLeftImageContainer = styled.div`
    ${tw`flex flex-1 justify-center h-4/5`}
`;

export const UpgradeModal3DComponent = styled.div`
    ${tw`w-full`}
`;

export const UpgradeModal3DInitial = styled.div`
    ${tw`w-full h-full flex items-center justify-center`}
    > img {
        ${tw`w-full object-contain rounded-lg mx-auto`}
    }
`;

export const UpgradeModal3DSelectedContainer = styled.div`
    ${tw`flex w-full h-full`}
`;

export const UpgradeModal3DCard = styled.div`
    ${tw`w-1/2 flex items-center justify-center`}
`;

export const UpgradeModal3DSelectedCardContent = styled.div`
    ${tw`flex flex-col items-center justify-center p-4`}
`;

export const UpgradeModal3DSelectedCardAddImage = styled.div`
    ${tw`h-full p-4 rounded-lg`}
    > img {
        ${tw`mb-2 max-h-[52px] max-w-[52px] mx-auto`}
    }

    > span {
        ${tw``}
    }
`;

export const UpgradeModal3DSelectedPlus = styled.div`
    ${tw`items-center flex text-[64px]`}
`;

export const UpgradeModal3DSelected = styled.div`
    ${tw`relative`}
    > img {
        ${tw`h-full w-full max-h-[340px] max-w-[440px] object-contain rounded-lg border-2 border-solid border-gray-500`}
    }

    > div {
        ${tw`text-white bg-black/50 absolute bottom-0 w-full p-2 rounded-b-lg`}
        > p {
            ${tw``}
        }
    }
`;

export const UpgradeModalCurtainComponent = styled.img`
    ${tw`flex flex-col`}
`;

export const UpgradeModalBodyLeftTextContainer = styled.div`
    ${tw`h-1/5 mt-2`}
    > div {
        ${tw``}
        > h2 {
            ${tw`text-xl font-bold mb-2`}
        }

        > p {
            ${tw``}
        }
    }
`;

export const UpgradeModalFooter = styled.div`
    ${tw`h-[10%] flex items-center justify-end`}
`;

export const UpgradeSelectionContainer = styled.div`
    ${tw`absolute flex flex-col rounded-lg h-[70%] w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black shadow-md z-100 border-gold border-2 border-solid`}
`;

export const UpgradeSelectionHeader = styled.div`
    ${tw`px-8 py-4 bg-gold/50 text-white text-2xl font-bold`}
    h2 {
        ${tw`text-center`}
    }
`;

export const UpgradeSelectionBodyContainer = styled.div`
    ${tw`overflow-auto relative bg-gold/50`}
    > div {
        ${tw`grid grid-cols-4 gap-4 p-4`}
        > div {
            ${tw`relative hover:border-green-500`}
            > img {
                ${tw`max-w-full h-auto hover:opacity-50 cursor-pointer rounded-lg hover:border-4 border-solid`}
            }

            > div {
                ${tw`text-white bg-black/50 absolute bottom-0 w-full p-2 rounded-b-lg`}
            }
        }
    }
`;
