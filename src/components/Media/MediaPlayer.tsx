import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Asset, Media, MediaPlayerProps } from '@customtypes/index';
import {
    MediaPlayer,
    MediaPlayerContainer,
    MediaPlayerItemButton,
    MediaPlayerItems,
    MediaPlayerItemsContainer,
    MediaPlayerItemThumbnail,
    VideoPlayer,
} from '@styles/index';
import { RootState } from '@state/index';
import { ImageSlider } from '@components/index';

export const MediaPlayerComponent: React.FC<MediaPlayerProps> = (props) => {
    const { mediaType } = props;
    const media: Array<Media> = useSelector(
        (state: RootState) => state.mediaAssets
    );
    const [activeAssets, setActiveAssets] = useState<Array<Media>>([]);
    const [currentMedia, setCurrentMedia] = useState<string>('');
    const [currentName, setCurrentName] = useState<string>('');

    const id = {
        image: '40000001-0000-0000-0000-000000000002',
        video: '40000001-0000-0000-0000-000000000003',
        audio: '40000001-0000-0000-0000-000000000004',
    };
    const handleMediaClick = (e: Media) => {
        if (e) {
            setCurrentMedia(e.url!);
            setCurrentName(e.name!);
        }
    };

    useEffect(() => {
        // console.log(media)
        let mediaAssets: Array<Media> = media.filter((m: Media) => {
            if (mediaType === 'video') return m.type === 'video';
            if (mediaType === 'image') return m.type === 'image';
            if (mediaType === 'audio') return m.type === 'audio';
        });
        if (mediaAssets.length) {
            setCurrentMedia(mediaAssets[0]!.url!);
            setCurrentName(mediaAssets[0]!.name!);
        }
        setActiveAssets(mediaAssets);
    }, [mediaType]);

    const handleClick = (e: Media) => {};
    // console.log()
    useEffect(() => {
        if (
            activeAssets.length &&
            activeAssets[0].url &&
            !currentMedia.length
        ) {
            setCurrentMedia(activeAssets[0].url);
            setCurrentName(activeAssets[0]!.name!);
        }
    }, [activeAssets]);

    return (
        <MediaPlayerContainer id={'media-player-container'}>
            {activeAssets.length &&
                mediaType === 'image' && [
                    /*<ImageSlider images={activeAssets}/>*/ <img
                        key={1}
                        style={{ maxHeight: '100%', width: 'fit-content' }}
                        src={currentMedia}
                    />,
                    <MediaPlayerItemsContainer
                        key={2}
                        id={'media-items-container'}
                    >
                        <MediaPlayerItems id={'media-items'}>
                            {activeAssets.map((m: Media, i: number) => {
                                return (
                                    <MediaPlayerItemButton
                                        key={i}
                                        onClick={() => handleMediaClick(m)}
                                    >
                                        <MediaPlayerItemThumbnail
                                            src={m.url}
                                            alt={m.name}
                                        />
                                    </MediaPlayerItemButton>
                                );
                            })}
                        </MediaPlayerItems>
                    </MediaPlayerItemsContainer>,
                ]}
            {(mediaType === 'video' || mediaType === 'audio') && [
                <MediaPlayer key={0} id={'media-player'}>
                    {currentMedia && mediaType === 'video' && (
                        <VideoPlayer
                            autoPlay={true}
                            controls={true}
                            src={currentMedia}
                        />
                    )}
                    {/* TODO Add <audio> when available */}
                    {currentMedia && mediaType === 'audio' && (
                        <VideoPlayer
                            autoPlay={true}
                            controls={true}
                            src={currentMedia}
                        />
                    )}
                    <div key={1} className={'text-center text-gold font-bold'}>
                        <span>{currentName}</span>
                    </div>
                </MediaPlayer>,
                <MediaPlayerItemsContainer key={2} id={'media-items-container'}>
                    <MediaPlayerItems id={'media-items'}>
                        {activeAssets.map((m: Media, i: number) => {
                            return (
                                <MediaPlayerItemButton
                                    key={i}
                                    onClick={() => handleMediaClick(m)}
                                >
                                    <MediaPlayerItemThumbnail
                                        title={m.name}
                                        src={
                                            mediaType === 'video' ||
                                            mediaType === 'audio'
                                                ? 'https://storage.googleapis.com/bm1000media/Misc/videoPlaceholder.png'
                                                : m.url
                                        }
                                        alt={m.name}
                                    />
                                </MediaPlayerItemButton>
                            );
                        })}
                    </MediaPlayerItems>
                </MediaPlayerItemsContainer>,
            ]}
        </MediaPlayerContainer>
    );
};
export default MediaPlayerComponent;
