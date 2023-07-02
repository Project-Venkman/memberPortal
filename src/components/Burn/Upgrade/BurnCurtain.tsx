import { UpgradeModalCurtainWrapper } from '@styles/Upgrade.styled';
import React from 'react';
import { BurnAsset } from '@customtypes/Asset';

interface BurnCurtainProps {
    selected: string;
    leftImage: string;
    burnAsset: BurnAsset;
}

export const BurnCurtain: React.FC<BurnCurtainProps> = (props) => {
    const { leftImage, selected, burnAsset } = props;
    return (
        <UpgradeModalCurtainWrapper className="image-curtain-container">
            <div>
                <img src={leftImage} alt="Bill Gold" className={selected} />
                <div className={'selected-curtain-details'}>
                    <p>
                        {burnAsset?.name} - {burnAsset?.tokenId}
                    </p>
                </div>
            </div>
        </UpgradeModalCurtainWrapper>
    );
};
