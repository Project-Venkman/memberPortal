import React from "react";
import { MediaButtonProps } from "@customtypes/index";
import { MediaButton } from "@styles/index";
import { FiBookOpen } from "react-icons/fi";
import { GiSoundWaves } from "react-icons/gi";
import { MdVideoLibrary } from "react-icons/md";
import { ImImages } from "react-icons/im";

export const MediaButtonComponent: React.FC<MediaButtonProps & React.HTMLProps<HTMLButtonElement>> = (props) => {
    const { mediaType, isActive, onClick } = props;

    const getButtonIcon = () => {
        if(mediaType === "description")
            return <FiBookOpen/>
        if(mediaType === "audio")
            return <GiSoundWaves/>
        if(mediaType === "video")
            return <MdVideoLibrary/>
        if(mediaType === "image")
            return <ImImages/>
    }

    return (
        <MediaButton className={isActive ? " active " : ""} onClick={onClick}>{getButtonIcon()}</MediaButton>
    )

}
export default MediaButtonComponent;