import React, { Dispatch, SetStateAction } from 'react';
import { Asset } from '@customtypes/Login';
import { Guid } from 'guid-typescript';

export type MediaContainerProps<P = {}> = P;
export type MediaButtonProps<
    P = {
        mediaType: 'description' | 'audio' | 'video' | 'image';
        isActive: boolean;
        onClick: () => void;
    }
> = P;
export type MediaCardProps<
    P = {
        media: Media;
    }
> = P;
export type MediaPlayerProps<
    P = {
        mediaType: 'description' | 'audio' | 'video' | 'image';
    }
> = P;
export type ImageViewerProps<
    P = {
        images: Array<Media>;
    }
> = P;
export type ImageSliderProps<
    P = {
        images: Array<Media>;
    }
> = P;

export interface Media {
    archived: boolean;
    createBy: string;
    createDate: string;
    description: string;
    id: string;
    map: MediaMap;
    name: string;
    type: string;
    updateBy: string;
    updateDate: string;
    url: string;
    category: string;
}

export interface Slide {
    title: string;
    subtitle: string;
    description: string;
    image: string;
}
