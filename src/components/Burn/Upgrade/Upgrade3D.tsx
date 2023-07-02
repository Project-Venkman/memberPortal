import {
    UpgradeModal3DCard,
    UpgradeModal3DInitial,
    UpgradeModal3DSelectedCardContent,
    UpgradeModal3DSelectedContainer,
    UpgradeModal3DSelectedPlus,
    UpgradeModal3DWrapper,
} from '@styles/Upgrade.styled';
import { NoBillSelected } from '@components/Burn/Upgrade/NoBillSelected';
import addImage from '@assets/images/addImage.png';
import { SelectedBill } from '@components/Burn/Upgrade/SelectedBill';
import { FaPlus } from 'react-icons/fa';
import { Selected3D } from '@components/Burn/Upgrade/Selected3D';
import React from 'react';
import { Asset, BurnAsset } from '@customtypes/Asset';

interface Upgrade3DProps {
    selected: string | null;
    leftImage: string;
    addImageClick: () => void;
    billBurn: Asset | null;
    burnAsset: BurnAsset;
}

export const Upgrade3D: React.FC<Upgrade3DProps> = (props) => {
    const { selected, leftImage, addImageClick, billBurn, burnAsset } = props;
    return (
        <UpgradeModal3DWrapper className="image-3d-container">
            {selected !== 'left' ? (
                <UpgradeModal3DInitial className={'image-3d-initial-container'}>
                    <img
                        src={leftImage}
                        alt="Bill Gold"
                        className="image-3d-initial"
                    />
                </UpgradeModal3DInitial>
            ) : (
                <UpgradeModal3DSelectedContainer className="card-container">
                    <UpgradeModal3DCard className="card-bill">
                        <UpgradeModal3DSelectedCardContent
                            onClick={addImageClick}
                            className="card-content"
                        >
                            {!billBurn ? (
                                <NoBillSelected selectedBill={addImage} />
                            ) : (
                                <SelectedBill bill={billBurn} />
                            )}
                        </UpgradeModal3DSelectedCardContent>
                    </UpgradeModal3DCard>
                    <UpgradeModal3DSelectedPlus className="plus-sign">
                        <FaPlus />
                    </UpgradeModal3DSelectedPlus>
                    <UpgradeModal3DCard className="card-3dglasses">
                        <Selected3D glasses={burnAsset} />
                    </UpgradeModal3DCard>
                </UpgradeModal3DSelectedContainer>
            )}
        </UpgradeModal3DWrapper>
    );
};