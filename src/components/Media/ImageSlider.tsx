import React, { useEffect, useState } from "react";
import { ImageSliderProps, Media } from "@customtypes/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import {
    SliderImage,
    SliderImageContainer,
    SliderTitle,
    SwiperContainer
} from "@styles/index";

export const ImageSlider: React.FC<ImageSliderProps> = (props) => {
    const { images } = props;
    const [testImages, setTestImages] = useState<Array<Media>>([])

    useEffect(() => {
        setTestImages([...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images])
    }, [images])

    const getScreenSize = () => {
        if(window.screen.height > window.screen.width){
            return 1
        }
        return 3
    }

    return (
        <SwiperContainer id={"swiper-container"}>
            {/*<Swiper
                id={"carousel"}
                effect={"coverflow"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: true
                }}
                centeredSlides={true}
                slidesPerView={getScreenSize()}
                navigation={true}
                modules={[EffectCoverflow, Navigation]}
                className={"min-w-full h-full"}
            >*/}
                { images.map((image: Media, i: number) => {
                    return (
                        /*<SwiperSlide key={i}>*/
                            <SliderImageContainer>
                                <SliderImage id={"slider-img-" + i} src={image.url}/>
                                <SliderTitle><span>{image.name}</span></SliderTitle>
                            </SliderImageContainer>
                        /*</SwiperSlide>*/
                    )
                })}
            {/*</Swiper>*/}
        </SwiperContainer>
    )
}
export default ImageSlider;