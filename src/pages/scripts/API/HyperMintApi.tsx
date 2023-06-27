import axios from "axios";
import * as process from "process";
//import fs from 'fs';
import {
	AuthPresaleResponse,
	BurnResponse,
	ContractInteractionResponse,
	ContractMetadata,
	ContractResponse,
	ContractTokensResponse,
	CreateNFTContractRequest,
	CreateNFTContractResponse,
	CreateUpdateNFTDraftContractNetworkInput,
	DeployContractResponse,
	HMCall,
	MediaUploadResponse,
	Metadata,
	MintResponse,
	MintStatusResponse,
	NFTContractTokenResponse,
	SetMetadataResponse,
	TokenOwnershipResponse,
	TransferRequest,
	TransferResponse,
	TransferStatusResponse,
	UpdateErc721DraftContractRequest,
	UpdateNameAndSymbolRequest
} from "@customtypes/HyperMint";
import { KahlilApi } from "@customtypes/Base";
import * as ApiFx from "@pages/scripts/API/ApiFunctions";

const url = 'https://protonpackapiserver-dooxr4hhta-uc.a.run.app/';

export const HMApi = {
	utilities: {
		/*		readJSONFile: async (fileURL: string) => {
					let rawdata = fs.readFileSync(fileURL).toString();
					return JSON.parse(rawdata)
				},*/
		getHMContractId: async (venkmanContractId: string) => {

		}
	},
	all: {
		getAllByContract: async (contractTypeId: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractTypeId }

			let contractData = await ApiFx.POSTKahlilAuthenticated("HyperMint/GetTokens", googleURL, data)
				.then(async res => { return await res.data; });
			let contractType = await contractData.network.contractType;
			if (contractType === "ERC721") {

			} else if (contractType === "ERC1155") {

			}
		},
		getContractInfo: async (contractId: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/GetContractInfo", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				})
		},
		createDraftContract: async (data: CreateNFTContractRequest) => {
			const googleURL: KahlilApi = { url: url }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/DeployContract", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				})
		},
		deployContract: async (contractId: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/DeployContract", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				})
		},
		getTokens: async (contractId: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/GetTokens", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data.tokens;
				})
		},
		getTokenInformation: async (contractId: string, tokenId: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "tokenId": tokenId }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/GetTokenInformation", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				})
		},
		mint: async (contractId: string, walletAddress: string, tokens: Array<string>) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "data": { "address": walletAddress, "tokens": tokens } }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/Mint", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				})
		},
		getMintStatus: async (contractId: string, mintId: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "mintId": mintId }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/MintStatus", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				})
		},
		getOwnedTokens: async (contractId: string, walletAddress: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "walletAddress": walletAddress }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/GetOwnedTokens", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				})
		},
		transferToken: async (contractId: string, transferRequest: TransferRequest) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "transferRequest": transferRequest }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/TransferToken", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				});
		},
		getTransferStatus: async (contractId: string, transferId: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "transferId": transferId }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/GetTransferStatus", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				});
		},
		updateContractNameAndSymbol: async (contractId: string, updateNameAndSymbolRequest: UpdateNameAndSymbolRequest) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "updateNameAndSymbolRequest": updateNameAndSymbolRequest }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/UpdateContractNameAndSymbol", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				});
		},
		getContractHostedMetadata: async (contractId: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/GetContractHostedMetadata", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				});
		},
		getTokenHostedMetadata: async (contractId: string, tokenId: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "tokenId": tokenId }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/GetTokenHostedMetadata", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data as Metadata;
				});
		},
		setTokenHostedMetadata: async (contractId: string, tokenId: string, metadata: Metadata) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "tokenId": tokenId, "metadata": metadata }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/SetTokenHostedMetadata", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				});
		},
		uploadContractMetadataMedia: async (contractId: string, media: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "media": media }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/UploadContractMetadataMedia", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				});
		},
		uploadTokenMetadataImage: async (contractId: string, tokenId: string, media: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "tokenId": tokenId, "media": media }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/UploadTokenMetadataImage", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				});
		},
		uploadTokenMetadataAnimation: async (contractId: string, tokenId: string, media: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "tokenId": tokenId, "media": media }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/UploadTokenMetadataAnimation", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				});
		},
		verifyTokenBurn: async (contractId: string, txHash: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "txHash": txHash }

			return await ApiFx.POSTKahlilAuthenticated("HyperMint/VerifyTokenBurn", googleURL, data)
				.then(async res => {
					// console.log(res);
					return res.data;
				});
		},
		authoriseBuy: async (contractId: string, tokenId: string, walletAddress: string, amount: string) => {
			const googleURL: KahlilApi = { url: url }
			let data = { "contractId": contractId, "tokenId": tokenId, "walletAddress": walletAddress, "amount": amount };

			return await ApiFx.POSTKahlilAuthenticated("Hypermint/AuthoriseBuy", googleURL, data)
				.then(async res => {
					return res.data as AuthPresaleResponse;
				})
		}
	}
}
