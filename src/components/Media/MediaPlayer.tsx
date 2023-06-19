import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Asset,
    Media as MediaType,
    Media,
    MediaPlayerProps,
} from '@customtypes/index';
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
    const [assetsByCategory, setAssetsByCategory] = useState<{
        [category: string]: MediaType[];
    }>({});
    const [currentCategory, setCurrentCategory] = useState<string>('');

    const handleMediaClick = (e: Media) => {
        if (e) {
            setCurrentMedia(e.url!);
            setCurrentName(e.name!);
        }
    };

    useEffect(() => {
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

    useEffect(() => {
        const assetsByCategory: { [category: string]: MediaType[] } =
            activeAssets.reduce((acc, asset) => {
                if (acc.hasOwnProperty(asset.category)) {
                    acc[asset.category].push(asset);
                } else {
                    acc[asset.category] = [asset];
                }
                return acc;
            }, {} as { [category: string]: MediaType[] });
        setAssetsByCategory(assetsByCategory);
        const categories = Object.keys(assetsByCategory);
        if (categories.length > 0) {
            setCurrentCategory(categories[0]);
        }
    }, [activeAssets]);

    const handleCategoryClick = (category: string) => {
        const assets = assetsByCategory[category];
        if (assets && assets.length) {
            setCurrentMedia(assets[0].url!);
            setCurrentName(assets[0].name!);
        }
        setCurrentCategory(category);
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <MediaPlayerContainer id="media-player-container">
            <div className="flex flex-col mb-4">
                {Object.keys(assetsByCategory).map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`bg-gray-100 px-4 py-2 mb-2 text-base text-black cursor-pointer ${
                            currentCategory === category ? 'bg-gray-300' : ''
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            {currentCategory && mediaType === 'image' && (
                <div className="flex flex-wrap justify-center overflow-auto max-h-full">
                    {assetsByCategory[currentCategory]?.map((asset, index) => (
                        <div
                            key={index}
                            className="w-1/4 p-4"
                            onClick={() => handleMediaClick(asset)}
                        >
                            <img
                                src={asset.url}
                                alt={asset.name}
                                className="cursor-pointer"
                                style={{
                                    maxHeight: '100%',
                                    width: 'fit-content',
                                }}
                                onClick={openPopup}
                            />
                        </div>
                    ))}
                </div>
            )}
            {(mediaType === 'video' || mediaType === 'audio') &&
                currentCategory !== undefined && (
                    <div>
                        <MediaPlayer key={0} id="media-player">
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
                            <div className="text-center text-gold font-bold">
                                <span>{currentName}</span>
                            </div>
                        </MediaPlayer>
                        <MediaPlayerItemsContainer
                            key={currentCategory}
                            id="media-items-container"
                        >
                            {currentCategory && (
                                <MediaPlayerItems id="media-items">
                                    {assetsByCategory[currentCategory]?.map(
                                        (m: Media, i: number) => (
                                            <MediaPlayerItemButton
                                                key={i}
                                                onClick={() =>
                                                    handleMediaClick(m)
                                                }
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
                                        )
                                    )}
                                </MediaPlayerItems>
                            )}
                        </MediaPlayerItemsContainer>
                    </div>
                )}
            // ...
            {isPopupOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative">
                        <img
                            src={currentMedia}
                            alt={currentName}
                            className="max-h-full max-w-full"
                        />
                        <button
                            className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 focus:outline-none z-100"
                            onClick={closePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </MediaPlayerContainer>
    );
};

export default MediaPlayerComponent;
