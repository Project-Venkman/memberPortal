import * as ApiFx from './ApiFunctions';
import { Claim, KahlilApi } from '@customtypes/index';

const mario: KahlilApi = {
    //host: environments[process.env.REACT_APP_DEV as keyof typeof environments].ProtonPack,
    host: 'https://apiv2.projectvenkman.com/',
    // host: 'http://localhost:3001/',
    //version: "", // add a / to end of string if version is included
    //key: "",
    //secret: "",
    url: '',
};

mario.url = mario.host!;
export const Api = {
    auth: {
        generateChallenge: async () => {
            return await ApiFx.GETKahlilAuthenticated(
                'Auth/GenerateChallenge',
                mario,
                ''
            ).then(async (res) => {
                return res.data;
            });
        },
        issueTokens: async (message: string, signature: string) => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Auth/IssueTokens',
                mario,
                { message, signature }
            ).then(async (res) => {
                return res.data;
            });
        },
        whoamI: async () => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Auth/WhoAmI',
                mario,
                ''
            ).then(async (res) => {
                return res.data;
            });
        },
        invalidateTokens: async () => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Auth/InvalidateTokens',
                mario,
                ''
            ).then(async (res) => {
                return res.data;
            });
        },
    },
    login: {
        verify: async (WalletAddress: string) => {
            const data = { WalletAddress: WalletAddress };
            return await ApiFx.POSTKahlilAuthenticated(
                'Blockchain/Verify',
                mario,
                data
            ).then(async (res) => {
                return res.data;
            });
        },
    },
    ownership: {
        verify: async (WalletAddress: string) => {
            const contracts = [
                '40000001-0001-0001-0002-000000000001',
                '40000001-0001-0001-0002-000000000002',
                '00000004-0000-0000-0000-000000000004',
                '00000004-0000-0000-0000-000000000005',
            ];
            const data = { WalletAddress: WalletAddress, Contracts: contracts };
            return await ApiFx.POSTKahlilAuthenticated(
                'Blockchain/VerifyOwnership',
                mario,
                data
            ).then(async (res) => {
                return await res.data;
            });
        },
    },
    contract: {
        getAll: async () => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Blockchain/GetContractTypes',
                mario,
                ''
            ).then(async (res) => {
                return await res.data;
            });
        },
        GetAllBurnableContracts: async () => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Contract/GetAllBurnable',
                mario,
                ''
            ).then(async (res) => {
                return await res.data;
            });
        },
    },
    asset: {
        getByWalletAddress: async (WalletAddress: string) => {
            const data = { walletAddress: WalletAddress };
            return await ApiFx.POSTKahlilAuthenticated(
                'Asset/GetByWalletAddress',
                mario,
                data
            ).then(async (res) => {
                return await res.data;
            });
        },
        getAllByContractId: async (contractTypeId: string) => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Asset/GetAllByContractType',
                mario,
                contractTypeId
            ).then(async (res) => {
                return await res.data;
            });
        },
        getBurnables: async (WalletAddress: string) => {
            const googleURL: KahlilApi = {
                url: 'https://protonpackapiserver-dooxr4hhta-uc.a.run.app/',
                // url: "http://localhost:3000/"
            };
            return await ApiFx.POSTKahlilAuthenticated(
                'Assets/GetBurnables',
                googleURL,
                WalletAddress
            ).then(async (res) => {
                return await res.data;
            });
        },
        updateSale: async (assetId: string, status: string) => {
            const googleURL: KahlilApi = {
                url: 'https://protonpackapiserver-dooxr4hhta-uc.a.run.app/',
                // url: "http://localhost:3000/"
            };
            let data = { data: { AssetID: assetId, Status: status } };

            return await ApiFx.POSTKahlilAuthenticated(
                'Assets/UpdateSale',
                googleURL,
                data
            );
        },
        updateOwner: async (
            assetTypeId: string,
            assetNumber: string,
            ownerId: string
        ) => {
            const googleURL: KahlilApi = {
                //url: "https://protonpackapiserver-dooxr4hhta-uc.a.run.app/"
                url: 'http://localhost:3000/',
            };
            let data = {
                data: {
                    AssetTypeID: assetTypeId,
                    AssetNumber: assetNumber,
                    AssetOwnerID: ownerId,
                },
            };

            return await ApiFx.POSTKahlilAuthenticated(
                'Assets/UpdateBurnOwner',
                googleURL,
                data
            );
        },
        UpgradeBill3DFrame: async (assetId: string) => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Asset/UpgradeBill3DFrame',
                mario,
                assetId
            ).then(async (res) => {
                return await res.data;
            }
            );
        },
    },
    claim: {
        getByTypeId: async (claimTypeId: string) => {
            let data = { ClaimTypeId: claimTypeId };
            return await ApiFx.POSTKahlilAuthenticated(
                'Claim/GetAllByTypeId',
                mario,
                data
            ).then(async (res) => {
                return await res.data;
            });
        },
        update: async (data: Claim) => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Claim/Update',
                mario,
                data
            ).then(async (res) => { });
        },
        getByParentAssetId: async (parentAssetId: string) => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Burn/Get',
                mario,
                parentAssetId
            ).then(async (res) => {
                return await res.data;
            });
        },
        getAllByAsset: async (assetId: string) => {
            let data = { assetId: assetId };

            return await ApiFx.POSTKahlilAuthenticated(
                'Claim/GetAllByAsset',
                mario,
                data
            ).then(async (res) => {
                return await res.data;
            });
        },
        getAllByAssetIds: async (assetIds: string[]) => {
            let data = { assetIds: assetIds };
            return await ApiFx.POSTKahlilAuthenticated(
                'Claim/GetAllByAssetIds',
                mario,
                data
            ).then(async (res) => {
                return await res.data;
            });
        },
    },
    media: {
        getAll: async (data: any) => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Something/Media',
                mario,
                data
            ).then(async (res) => {
                return await res.data;
            });
        },
        getAllByAsset: async (assetId: string) => {
            let data = { assetId: assetId };
            return await ApiFx.POSTKahlilAuthenticated(
                'Media/GetAllByAsset',
                mario,
                data
            ).then(async (res) => {
                return await res.data;
            });
        },
    },
    events: {
        getAll: async (data: any) => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Something/Media',
                mario,
                data
            ).then(async (res) => {
                return await res.data;
            });
        },
    },
    registration: {
        signup: async (dbrecord: Claim, WalletAddress: string) => {
            const data = WalletAddress;
            return await ApiFx.POSTKahlilAuthenticated(
                dbrecord.url as string,
                mario,
                data
            ).then(async (res: any) => {
                return await res.data;
            });
        },
    },
    googleSheets: {
        SyncDB: async () => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Sheets/SyncDB',
                mario,
                ''
            ).then(async (res) => {
                return await res.data;
            });
        },
    },
    chive: {
        coins: async () => {
            return await ApiFx.POSTKahlilAuthenticated(
                'Chive/GoldBars',
                mario,
                ''
            ).then(async (res) => {
                return await res.data;
            });
        },
    },
};
