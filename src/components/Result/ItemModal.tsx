import React, { useEffect } from 'react';
import {
    Claim as ClaimType,
    Asset,
    ResultModalProps,
    Burn as BurnType,
    Media as MediaType,
} from '@customtypes/index';
import {
    ModalCloseButton,
    ResultDataModal,
    ResultDataModalContainer,
    ResultDataModalHeader,
    ResultDataModalOverlay,
} from '@styles/index';
import { FaTimes } from 'react-icons/fa';
import { Claim, Media, Events } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import {
    RootState,
    setMediaAssets,
    setClaimAssets,
    setBurnAssets,
} from '@state/index';
import { Api } from '@pages/scripts/API';

export const ItemModal: React.FC<ResultModalProps> = (props) => {
    const { modalOpen, setModalOpen, modalType } = props;
    const dispatch = useDispatch();
    // const asset: Asset = useSelector((state: RootState) => state.currentAsset)
    let currentAsset: Asset = useSelector(
        (state: RootState) => state.currentAsset
    );
    const walletAssets: Array<Asset> = useSelector(
        (state: RootState) => state.walletAssets
    );
    const id = {
        claimCoin: '40000001-0000-0000-0000-000000000001',
        image: '40000001-0000-0000-0000-000000000002',
        video: '40000001-0000-0000-0000-000000000003',
        audio: '40000001-0000-0000-0000-000000000004',
        burnBM: '00000004-0000-0000-0000-000000000004',
        burnTix: '00000004-0000-0000-0000-000000000005',
    };

    return (
        <ResultDataModalContainer>
            <ResultDataModalOverlay
                id={'modal-overlay'}
                onClick={() => setModalOpen(false)}
            />
            <ResultDataModal id={'modal-data'}>
                <ResultDataModalHeader id={'modal-header'}>
                    <ModalCloseButton onClick={() => setModalOpen(!modalOpen)}>
                        <FaTimes id={'fa-times'} />
                    </ModalCloseButton>
                </ResultDataModalHeader>
                {modalType === 'media' && <Media />}
                {modalType === 'events' && <Events />}
                {modalType === 'claim' && <Claim />}
            </ResultDataModal>
        </ResultDataModalContainer>
    );
};
