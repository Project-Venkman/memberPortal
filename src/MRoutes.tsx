import React from 'react';
import { Routes, Route } from 'react-router';
import Login from '@pages/Login';
import Result from '@pages/Result';
import { CoinInventory } from '@pages/CoinInventory';
import Burn from '@pages/Burn';
import Accordion from '@pages/ChooseContract';
import { accordionData } from '@pages/ChooseContract';
import ProfilePage from '@pages/Profile';
import TransferPage from '@pages/Transfer';
import GoldBar from '@pages/Chive';
const MRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Login />} />
            <Route path={'/Login'} element={<Login />} />
            <Route path={'/Transfer'} element={<TransferPage />} />
            <Route path={'/Results'} element={<Result />} />
            <Route path={'/Burn'} element={<Burn />} />
            <Route path={'/CoinInventory'} element={<CoinInventory />} />
            <Route
                path={'/ChooseContract'}
                element={<Accordion data={accordionData} />}
            />
            {/*<Route path={'/ProfilePage'} element={<ProfilePage />} />*/}
            <Route path={'/Chive/GoldBar'} element={<GoldBar />} />
        </Routes>
    );
};

export default MRoutes;
