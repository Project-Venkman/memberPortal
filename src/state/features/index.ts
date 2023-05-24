import { combineReducers } from 'redux';
import walletReducer from '@state/features/WalletSlice';
import walletAddressReducer from '@state/features/WalletAddressSlice';
import { providerSlice, signerSlice } from '@state/features/WalletAddressSlice';
import walletAssetsReducer from '@state/features/WalletAssetsSlice';
import ownedAssetsReducer from '@state/features/OwnedAssetsSlice';
import assetAppReducers, {
    currentAssetSlice,
    currentBurnAssetSlice,
} from '@state/features/CurrentAssetSlice';
import currentOwnedAssetReducer from '@state/features/CurrentOwnedAssetSlice';
import eventAssetsReducer from '@state/features/EventAssetsSlice';
import mediaAssetsReducer from '@state/features/MediaAssetsSlice';
import claimAssetsReducer from '@state/features/ClaimAssetsSlice';
import { AllContractSlice, ContractSlice } from '@state/features/ContractSlice';
import burnAssetsReducer from '@state/features/BurnAssetsSlice';
import winnerReducer from '@state/features/WinnerSlice';
import userCredentialsReducer from '@state/features/UserCredentialsSlice';
import companyUserReducer from '@state/features/CompanyUserSlice';
import ownedAssetsSlice from '@state/features/OwnedAssetsSlice';
import loadingSliceReducer from '@state/features/LoadingSlice';

export * from './WalletSlice';
export * from './WalletAddressSlice';
export * from './WalletAssetsSlice';
export * from './OwnedAssetsSlice';
export * from './CurrentAssetSlice';
export * from './CurrentOwnedAssetSlice';
export * from './EventAssetsSlice';
export * from './MediaAssetsSlice';
export * from './ClaimAssetsSlice';
export * from './ContractSlice';
export * from './BurnAssetsSlice';
export * from './WinnerSlice';
export * from './UserCredentialsSlice';
export * from './CompanyUserSlice';
export * from './LoadingSlice';

const appReducers = combineReducers({
    wallet: walletReducer,
    walletAddress: walletAddressReducer,
    provider: providerSlice.reducer,
    signer: signerSlice.reducer,
    walletAssets: walletAssetsReducer,
    ownedAssets: ownedAssetsReducer,
    currentAsset: currentAssetSlice.reducer,
    currentOwnedAsset: currentOwnedAssetReducer,
    currentBurnAsset: currentBurnAssetSlice.reducer,
    eventAssets: eventAssetsReducer,
    mediaAssets: mediaAssetsReducer,
    claimAssets: claimAssetsReducer,
    allContracts: AllContractSlice.reducer,
    contract: ContractSlice.reducer,
    burnAssets: burnAssetsReducer,
    winner: winnerReducer,
    userCredentials: userCredentialsReducer,
    companyUserReducer: companyUserReducer,
    isLoading: loadingSliceReducer,
});

export const reducers = (state: any, action: any) => {
    if (action.type === 'RESET') state = undefined;
    return appReducers(state, action);
};

export default reducers;
