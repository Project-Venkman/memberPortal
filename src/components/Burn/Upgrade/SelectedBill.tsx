import { UpgradeModal3DSelected } from '@styles/Upgrade.styled';
import React from 'react';
import { Asset } from '@customtypes/Asset';

interface BillSelectedProps {
    bill: Asset;
}

export const SelectedBill: React.FC<BillSelectedProps> = (props) => {
    const { bill } = props;
    return (
        <UpgradeModal3DSelected className={'add-bill-image'}>
            <img className="select-bill-image" src={bill.image} alt="Image 1" />
            <div className={'selected-bill-details'}>
                <p>
                    {bill?.name} - {bill?.tokenId}
                </p>
            </div>
        </UpgradeModal3DSelected>
    );
};
