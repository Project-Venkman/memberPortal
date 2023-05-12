import React, { useEffect } from 'react';
import { BurnURLProps } from '@customtypes/Burn';
import { BurnURLContainer } from '@styles/index';
import { Api } from '@pages/scripts/API';

export const BurnURL: React.FC<BurnURLProps> = (props) => {
    const {} = props;

    const handleBurnClick = async () => {
        /*await Api.asset.updateOwner(options.assetTypeID, options.tokenId, "00000000-0000-0000-0000-000000000000").then(
			(res) => {
				//location.href = `https://opensea.io/assets/ethereum/${options.contractAddress}/${options.tokenId}/transfer`;
			}
		)*/
        // await Api.asset
        //     .updateOwner(
        //         '00000004-0000-0000-0000-000000000004',
        //         '913',
        //         '00000000-0000-0000-0000-000000000000'
        //     )
        //     .then((res) => {
        //         //location.href = `https://opensea.io/assets/ethereum/${options.contractAddress}/${options.tokenId}/transfer`;
        //     });
    };

    // useEffect(() => {}, [options]);

    return (
        <BurnURLContainer>
            {/*<a target={"_self"} href={`https://opensea.io/assets/ethereum/${options.contractAddress}/${options.tokenId}/transfer`}>{"Click here to burn"}</a>*/}
            <button>{'Click here to burn'}</button>
        </BurnURLContainer>
    );
};
