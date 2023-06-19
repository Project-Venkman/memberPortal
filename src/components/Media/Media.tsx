import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    MediaAssetContainer,
    MediaButtonContainer,
    MediaContainer,
    MediaDescriptionContainer,
    MediaDescriptionHeader,
    MediaDescriptionParagraph,
} from '@styles/index';
import {
    Asset,
    Media as MediaType,
    MediaContainerProps,
} from '@customtypes/index';
import { MediaButtonComponent, MediaPlayerComponent } from '@components/index';
import { RootState } from '@state/index';

export const Media: React.FC<MediaContainerProps> = (props) => {
    const [currentCategory, setCurrentCategory] = useState<string>('');
    const {} = props;
    const currentMediaAssets: Array<MediaType> = useSelector(
        (state: RootState) => state.mediaAssets
    );

    const currentAsset: Asset = useSelector(
        (state: RootState) => state.currentAsset
    );
    const [activeMedia, setActiveMedia] = useState<
        'description' | 'audio' | 'video' | 'image'
    >('description');
    const [imageCount, setImageCount] = useState<number>(0);
    const [videoCount, setVideoCount] = useState<number>(0);
    const [audioCount, setAudioCount] = useState<number>(0);
    const mediaTypes: Array<'description' | 'audio' | 'video' | 'image'> = [
        'description',
        'audio',
        'video',
        'image',
    ];

    useEffect(() => {
        setImageCount(
            currentMediaAssets.filter(
                (asset: MediaType) => asset.type === 'image'
            ).length
        );
        setVideoCount(
            currentMediaAssets.filter(
                (asset: MediaType) => asset.type === 'video'
            ).length
        );
        setAudioCount(
            currentMediaAssets.filter(
                (asset: MediaType) => asset.type === 'audio'
            ).length
        );
    }, [currentMediaAssets]);

    const handleButtonClick = (
        e: 'description' | 'audio' | 'video' | 'image'
    ) => {
        setActiveMedia(e);
    };

    useEffect(() => {
        const mediaContainer = document.getElementById('media-container');
        if (mediaContainer) {
            if (activeMedia === 'image') {
                mediaContainer.classList.add('overflow-auto');
            } else {
                mediaContainer.classList.remove('overflow-auto');
            }
        }

        return () => {
            if (mediaContainer) {
                mediaContainer.classList.remove('overflow-auto');
            }
        };
    }, []);
    return (
        <MediaContainer className={'overflow-auto'} id={'media-container'}>
            <MediaButtonContainer id={'media-buttons'}>
                {mediaTypes.map(
                    (
                        m: 'description' | 'audio' | 'video' | 'image',
                        i: number
                    ) => {
                        if (
                            (m === 'audio' && audioCount) ||
                            (m === 'video' && videoCount) ||
                            (m === 'image' && imageCount) ||
                            m === 'description'
                        )
                            return (
                                <MediaButtonComponent
                                    key={i}
                                    mediaType={m}
                                    isActive={activeMedia === m}
                                    onClick={() => handleButtonClick(m)}
                                />
                            );
                        return;
                    }
                )}
            </MediaButtonContainer>
            <MediaAssetContainer id={'media-asset-container'}>
                {activeMedia === 'description' && (
                    <MediaDescriptionContainer>
                        <MediaDescriptionHeader>
                            {currentAsset.name}
                        </MediaDescriptionHeader>
                        {currentAsset.description
                            .split('\n\n')
                            .map((p: string, i: number) => {
                                return (
                                    <MediaDescriptionParagraph key={i}>
                                        {p}
                                    </MediaDescriptionParagraph>
                                );
                            })}
                    </MediaDescriptionContainer>
                )}
                {(activeMedia === 'video' ||
                    activeMedia === 'image' ||
                    activeMedia === 'audio') && (
                    <MediaPlayerComponent mediaType={activeMedia} />
                )}
            </MediaAssetContainer>
        </MediaContainer>
    );
};

export default Media;
