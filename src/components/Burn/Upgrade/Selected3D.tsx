import { UpgradeModal3DSelected } from '@styles/Upgrade.styled';
import React from 'react';
import { Asset } from '@customtypes/Asset';

interface Selected3DProps {
    glasses: Asset;
}

export const Selected3D: React.FC<Selected3DProps> = (props) => {
    const { glasses } = props;
    return (
        <UpgradeModal3DSelected className={'add-bill-image'}>
            <img
                className="select-3dglasses-image"
                src={glasses.image}
                alt="3D Glasses"
            />
            <div className={'selected-3dglasses-details'}>
                <p>
                    {glasses?.name} - {glasses?.tokenId}
                </p>
            </div>
        </UpgradeModal3DSelected>
    );
};
