import React, { useEffect, useState } from 'react';
import {
    Asset,
    WalletData,
    ResultProps,
    ProfileProps,
    Burn as BurnType,
} from '@customtypes/index';
import {
    Invalid,
    ItemAssetImage,
    ItemModal,
    ItemSelect,
    NavbarDesktop,
    NavbarMobile,
} from '@components/index';
import {
    FrameImg,
    ImageContainer,
    ResultCard,
    ResultCardContent,
    ResultPage,
} from '@styles/index';
import frame from '@assets/bill/FRAME-NO-BILL2.png';
import { RootState } from '@state/store';
import { useDispatch, useSelector } from 'react-redux';
import { Api } from '@pages/scripts/API';
import {
    setWallet,
    setEmptyWallet,
    setWalletAssets,
    setBurnAssets,
} from '@state/features';
import { truncateAddress } from '@pages/scripts/utils';
import { LoadIndicator } from 'devextreme-react';
import { useNavigate } from 'react-router-dom';
import telescope from '@assets/images/telescope.png';
import { NFTImg } from '@styles/index';

import { CheckCircleIcon } from '@heroicons/react/20/solid';

const ProfilePage: React.FC<ProfileProps> = (props) => {
    const {} = props;
    const navigate = useNavigate();
    let currentAsset: Asset = useSelector(
        (state: RootState) => state.currentAsset
    );
    console.log(currentAsset);
    const walletAddress: string = useSelector(
        (state: RootState) => state.walletAddress
    );
    // use wallet address to get id
    useEffect(() => {}, []);

    const benefits = [
        'Competitive salaries',
        'Flexible work hours',
        '30 days of paid vacation',
        'Annual team retreats',
        'Benefits for you and your family',
        'A great work environment',
    ];

    return (
        <div className="flex justify-center bg-gray-900 py-24 sm:py-32 h-full w-full ">
            <div className="relative flex items-center isolate">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
                        <img
                            className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                            src={
                                currentAsset.imageSmall !== null
                                    ? currentAsset.imageSmall
                                    : currentAsset.image
                            }
                            alt=""
                        />
                        <div className="w-full flex-auto">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Join our team (Project Venkman)
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Lorem ipsum dolor sit amet consect adipisicing
                                elit. Possimus magnam voluptatum cupiditate
                                veritatis in accusamus quisquam.
                            </p>
                            <ul
                                role="list"
                                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2"
                            >
                                {benefits.map((benefit) => (
                                    <li key={benefit} className="flex gap-x-3">
                                        <CheckCircleIcon
                                            className="h-7 w-5 flex-none"
                                            aria-hidden="true"
                                        />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10 flex">
                                <a
                                    href="#"
                                    className="text-sm font-semibold leading-6 text-indigo-400"
                                >
                                    See our job postings{' '}
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
