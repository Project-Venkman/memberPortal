import React, { useEffect, useState } from "react";
import { ImageViewerProps, Media } from "@customtypes/index";
import { ImageViewerContainer } from "@styles/index";
import { FaChevronLeft, FaChevronRight} from "react-icons/fa";

export const ImageViewer: React.FC<ImageViewerProps> = (props) => {
    const { images } = props;
    const [currentImage, setCurrentImage] = useState<number>(0)
    const [previousImage, setPreviousImage] = useState<number|undefined>(undefined);
    const [nextImage, setNextImage] = useState<number|undefined>(undefined);
    const [imageCount, setImageCount] = useState<number>(0);
    const [testImages, setTestImages] = useState<Array<Media>>([])

    useEffect(() => {
        console.log(testImages);
        setImageCount(testImages.length);
    }, [testImages])

    useEffect(() => {
        console.log(imageCount, "imageCount")
        if(imageCount > 1){
            if(currentImage === 0) {
                console.log("currentImage === 0")
                setPreviousImage(undefined);
                setNextImage(currentImage + 1);
            }
            else setPreviousImage(currentImage - 1 );

            if(currentImage === imageCount - 1) {
                console.log("currentImage === length")
                setNextImage(undefined);
                setPreviousImage(currentImage - 1);
            }
            else setNextImage(currentImage + 1);
        }
    }, [currentImage])

    useEffect(() => {
        if(previousImage)
            console.log(previousImage, "previousImage");
    }, [previousImage])

    useEffect(() => {
        if(nextImage)
            console.log(nextImage, "nextImage");
    }, [nextImage])

    useEffect(() => {
        setTestImages([...images, ...images, ...images, ...images, ...images, ...images]);
    }, [])

    return (
        <ImageViewerContainer id={"media-image-viewer"}>
            <div className={"h-full"}>
                { previousImage && <div className={"w-1/8 h-full flex items-center absolute left-0"} onClick={() => setCurrentImage(previousImage)}><FaChevronLeft/></div>}
                <div className={"h-full p-8"}>
                    <img loading={"lazy"} className={"h-full portrait:md:h-3/4"} src={testImages[currentImage].url}/>
                    <div className={"text-center text-gold font-bold py-2"}><span>{testImages[currentImage].name}</span></div>
                </div>
                {nextImage && <div className={"w-1/8 h-full flex items-center absolute right-0"} onClick={() => setCurrentImage(nextImage)}><FaChevronRight/></div>}
            </div>
        </ImageViewerContainer>
    )
}

export default ImageViewer;