import tw from "twin.macro";
import styled from 'styled-components';
import { SwiperSlide } from "swiper/react";

export const MediaContainer = styled.div`
	${tw`
		h-[calc(100% - 64px)]
		flex portrait:flex-col
		w-full
	`};
`
export const MediaCard = styled.div`
	${tw``};
`
export const MediaCardContent = styled.div`
	${tw`w-[50%] portrait:md:w-[34%] landscape:w-[17%] h-[36%] flex flex-col items-center m-0 p-0 absolute left-1/2 top-[37%]`};
	transform: translate(-50%, -50%) rotate(-4deg) !important;
`;
export const MediaButtonContainer = styled.div`
	${tw`
		w-24 h-full portrait:w-full portrait:h-auto
		pt-4 portrait:p-4
		flex flex-col portrait:flex-row justify-start items-center gap-8 portrait:gap-4
		bg-transparent border-r border-solid border-gray-300/25
	`}
`
export const MediaButton = styled.button`
	${tw`
		text-white text-3xl cursor-pointer z-50
	`}
	&.active {
		${tw`text-gold`}
	}
`
export const MediaAssetContainer = styled.div`
	${tw`h-full w-full md:w-[calc(100% - 6rem)] flex flex-col gap-2 flex-1 z-90`}
`
export const MediaDescriptionContainer = styled.div`
	${tw`p-8 portrait:p-4 portrait:overflow-y-auto`}
`
export const MediaDescriptionHeader = styled.h1`
	${tw`text-white font-bold text-2xl text-gold mb-4`}
`
export const MediaDescriptionParagraph = styled.p`
	${tw`text-white pb-4 text-xl`}
`
export const MediaPlayerContainer = styled.div`
	${tw`w-full max-h-full flex flex-col items-center`}
`
export const MediaPlayer = styled.div`
	${tw`
		h-[80%] w-full
		flex flex-col justify-center items-center 
	`}
`
export const MediaPlayerItemsContainer = styled.div`
	${tw`
		w-full portrait:h-auto
		relative flex flex-row justify-center
		portrait:overflow-x-hidden 
		portrait:overflow-y-auto	
	`}
`
export const MediaPlayerItems = styled.div`
	${tw`
		w-full h-full p-4 portrait:h-[min-content] portrait:p-0 portrait:py-4
		bg-gray-500/25 
		flex gap-4 portrait:flex-wrap portrait:justify-center
		overflow-x-auto
		overflow-y-hidden
	`}
`
export const MediaPlayerItemButton = styled.button`
	${tw`
		h-full
		flex flex-col portrait:flex-row justify-center items-center
	`}
	flex: 0 0 40%;
	@media (orientation: portrait) {
		flex: 0 0 40%;
	}
	
`
export const MediaPlayerItemThumbnail = styled.img`
	${tw`border-2 border-black border-solid hover:border-green-500 w-full`}
`
export const VideoPlayer = styled.video`
	${tw`max-h-9/10`}
`
export const ImageViewer = styled.img`
	${tw`h-full`}
`
export const ImageViewerContainer = styled.div`
	${tw`h-full flex justify-center`}
`
export const SwiperContainer = styled.div`
	.swiper .swiper-slide {
		${tw`sm:w-3/4! md:w-1/4`}
	}
`
export const SliderImageContainer = styled.div`
	${tw`flex flex-col justify-center w-1/2`}
`
export const SliderImage = styled.img`
	${tw`h-full portrait:md:h-3/4`}
`
export const SliderTitle = styled.div`
	${tw`text-center text-gold font-bold py-2 w-full text-center bg-black/50`}
`


