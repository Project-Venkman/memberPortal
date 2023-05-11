import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	MediaAssetContainer,
	MediaButtonContainer,
	MediaContainer,
	MediaDescriptionContainer,
	MediaDescriptionHeader,
	MediaDescriptionParagraph,
} from "@styles/index";
import { Asset, Media as MediaType, MediaContainerProps } from "@customtypes/index";
import { MediaButtonComponent, MediaPlayerComponent } from "@components/index";
import { RootState } from "@state/index";

export const Media: React.FC<MediaContainerProps> = (props) => {
	const { } = props;
	const currentMediaAssets: Array<MediaType> = useSelector((state: RootState) => state.mediaAssets);
	const currentAsset: Asset = useSelector((state: RootState) => state.currentAsset)
	const [activeMedia, setActiveMedia] = useState<"description" | "audio" | "video" | "image">("description");
	const [imageCount, setImageCount] = useState<number>(0);
	const [videoCount, setVideoCount] = useState<number>(0);
	const [audioCount, setAudioCount] = useState<number>(0);
	const mediaTypes: Array<"description" | "audio" | "video" | "image"> = ["description", "audio", "video", "image"]
	const id = {
		image: "40000001-0000-0000-0000-000000000002",
		video: "40000001-0000-0000-0000-000000000003",
		audio: "40000001-0000-0000-0000-000000000004",
	}
	console.log({ currentAsset })
	console.log({ currentMediaAssets })
	useEffect(() => {
		setImageCount(currentMediaAssets.filter((asset: MediaType) => asset.mediaTypeID === id.image).length)
		setVideoCount(currentMediaAssets.filter((asset: MediaType) => asset.mediaTypeID === id.video).length)
		setAudioCount(currentMediaAssets.filter((asset: MediaType) => asset.mediaTypeID === id.audio).length)
	}, [currentMediaAssets])

	const handleButtonClick = (e: "description" | "audio" | "video" | "image") => {
		setActiveMedia(e);
	}

	return (
		<MediaContainer>
			<MediaButtonContainer id={"media-buttons"}>
				{mediaTypes.map((m: "description" | "audio" | "video" | "image", i: number) => {
					if ((m === "audio" && audioCount) || (m === "video" && videoCount) || (m === "image" && imageCount) || m === "description")
						return <MediaButtonComponent key={i} mediaType={m} isActive={activeMedia === m} onClick={() => handleButtonClick(m)} />
					return;
				})}
			</MediaButtonContainer>
			<MediaAssetContainer id={"media-asset-container"}>
				{activeMedia === "description" &&
					<MediaDescriptionContainer>
						<MediaDescriptionHeader>{currentAsset.name}</MediaDescriptionHeader>
						{currentAsset.description.split('\n\n').map((p: string, i: number) => {
							return (
								<MediaDescriptionParagraph key={i}>{p}</MediaDescriptionParagraph>
							)
						})}
					</MediaDescriptionContainer>
				}
				{(activeMedia === "video" || activeMedia === "image" || activeMedia === "audio") && (
					<MediaPlayerComponent mediaType={activeMedia} />
				)}
			</MediaAssetContainer>
		</MediaContainer>
	)
}

export default Media;
