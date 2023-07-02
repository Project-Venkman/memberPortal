import { UpgradeModal3DSelectedCardAddImage } from '@styles/Upgrade.styled';
import addImage from '@assets/images/addImage.png';
import React from 'react';

interface NoBillSelectedProps {
    selectedBill: string;
}

export const NoBillSelected: React.FC<NoBillSelectedProps> = (props) => {
    const { selectedBill } = props;
    return (
        <UpgradeModal3DSelectedCardAddImage className={'add-bill-image'}>
            <img src={selectedBill} alt="Sample Image" />
            <span className="click-text">
                Click here to add or update image
            </span>
        </UpgradeModal3DSelectedCardAddImage>
    );
};
