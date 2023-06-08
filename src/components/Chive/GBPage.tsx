import React, { useState } from 'react';
import { ChiveProps } from '@customtypes/Result';
import { vBar, Crown } from '@components/Chive/index';
import { Api } from '@pages/scripts/API';

export const GoldBar: React.FC<ChiveProps> = (props) => {
    const [selectedTab, setSelectedTab] = useState(0); // Track the selected tab
    const [isModalOpen, setIsModalOpen] = useState(false); // Track the modal open/close state

    const changeTab = (tabIndex: number) => {
        setSelectedTab(tabIndex);
    };

    const handleDataClick = () => {
        setIsModalOpen(true);
    };

    const handleSaveClick = () => {
        Api.googleSheets.SyncDB().then((res) => {
            console.log(res);
        });
    };
    const tabComponents = [vBar, Crown];

    // Destructure props if needed
    const {} = props;

    return (
        <div className="container max-w-none h-screen mx-auto overflow-y-auto">
            <div className="flex justify-center h-[10%] items-center text-4xl">
                <h1 className="text-white">Chive</h1>
            </div>
            <div className="h-[20%] flex justify-center items-center">
                <button
                    onClick={handleDataClick}
                    className="sm:w-[60%] md:w-[30%] p-5 border-2 border-white text-white w-[60%] text-center text-2xl hover:bg-white hover:text-black transition-colors duration-300"
                >
                    Enter Data
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-[90%] bg-white rounded-lg p-4">
                        <div className="flex flex-col items-center">
                            <div className={'w-full flex justify-end'}>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="relative top-0 right-0 text-gray-500 hover:text-gray-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <iframe
                                src="https://docs.google.com/spreadsheets/d/1qCvb6r50PxTbnHbv4FFnfctGezR5pHnlQZqU9R9Wdcs/edit#gid=0?usp=sharing?&amp;rm=minimal&amp;single=true&amp;"
                                width={'90%'}
                                height="600"
                            ></iframe>
                            <button
                                onClick={handleSaveClick}
                                className="mt-4 min-w-[100px] p-2 text-white text-xl bg-indigo-500 rounded hover:bg-indigo-600 transition-colors duration-300"
                            >
                                Finish
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center h-full">
                <div className="flex flex-col h-full w-full bg-gray-900">
                    <div className="space-x-4 border-solid border-b-4 border-white">
                        <button
                            className={`text-sm text-white border-b-2 border-transparent hover:border-indigo-500 focus:border-indigo-500 focus:outline-none py-2 px-4 ${
                                selectedTab === 0
                                    ? 'bg-indigo-500 text-white'
                                    : ''
                            }`}
                            onClick={() => changeTab(0)}
                        >
                            VBar
                        </button>
                        <button
                            className={`text-sm text-white border-b-2 border-transparent hover:border-indigo-500 focus:border-indigo-500 focus:outline-none py-2 px-4 ${
                                selectedTab === 1
                                    ? 'bg-indigo-500 text-white'
                                    : ''
                            }`}
                            onClick={() => changeTab(1)}
                        >
                            Crown
                        </button>
                    </div>

                    <div className="mt-4 overflow-y-auto" id="tabContent">
                        {tabComponents[selectedTab]()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoldBar;
