import React, {Dispatch, SetStateAction} from "react";
import {Asset} from "@customtypes/Login";
import {Guid} from "guid-typescript";

export type MediaContainerProps<
	P = { },
	> = P;
export type MediaButtonProps<
	P = {
		mediaType: "description"|"audio"|"video"|"image";
		isActive: boolean;
		onClick: () => void;
	},
	> = P;
export type MediaCardProps<
	P = {
		media: Media
	},
	> = P;
export type MediaPlayerProps<
	P = {
		mediaType: "description"|"audio"|"video"|"image";
	},
	> = P;
export type ImageViewerProps<
	P = {
		images: Array<Media>;
	},
	> = P;
export type ImageSliderProps<
	P = {
		images: Array<Media>;
	}
	> = P;

export interface Media {
	mediaTypeID?: string;
	contractTypeID?: string;
	name?: string;
	url?: string;
	description?: string;
}

export interface Slide {
	title: string;
	subtitle: string;
	description: string;
	image: string;
}

