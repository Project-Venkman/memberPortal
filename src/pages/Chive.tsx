import React, { useState } from 'react';
import { GoldBar } from '@components/Chive';

import { HomeIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'ChiveGoldBars', href: '#', icon: HomeIcon, current: true },
    // { name: 'ChiveCrown', href: '#', icon: UsersIcon, current: false },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const ChiveHome = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedNavigation, setSelectedNavigation] = useState(
        navigation[0].name
    );

    const handleNavigationClick = (name: string) => {
        setSelectedNavigation(name);
    };

    const renderSelectedComponent = () => {
        if (selectedNavigation === 'ChiveCrown') {
            return <div>hello</div>; // Render the desired component for 'ChiveCrown'
        } else {
            return <GoldBar />; // Render the GoldBar component for other navigation items
        }
    };

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div className="flex flex-col w-24 bg-gray-900">
                    <div className="flex flex-col items-center mt-4">
                        {navigation.map((item) => (
                            <button
                                key={item.name}
                                className={classNames(
                                    'w-full py-4 flex flex-col items-center justify-center text-gray-400 hover:text-white',
                                    item.current && 'text-white'
                                )}
                                onClick={() => handleNavigationClick(item.name)}
                            >
                                <item.icon
                                    className="w-6 h-6"
                                    aria-hidden="false"
                                />
                                <span className="text-xs mt-1">
                                    {item.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                    {/* Mobile Navbar */}
                    <div className="lg:hidden">{/* ... */}</div>

                    {/* Desktop Navbar */}
                    <div className="hidden lg:flex lg:items-center lg:justify-between bg-black px-4 py-4">
                        {/* ... */}
                    </div>

                    {/* Main Content */}
                    <main className="">
                        <div className="px-4 sm:px-6 lg:px-8">
                            {renderSelectedComponent()}{' '}
                            {/* Render the selected component */}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ChiveHome;
