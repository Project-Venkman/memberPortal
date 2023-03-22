export interface HMCall {
	httpsMethod: string;
	endpoint: string;
	data?: any;
}
export interface ContractResponse {
	id: string;
	name: string;
	symbol: string;
	status: NFTContractStatus;
	allowBuyOnNetwork: boolean;
	network: {
		type: NetworkType;
		environment: NetworkEnvironment;
		chain?: NetworkChain;
		contractAddress?: string;
		contractType: NFTContractType;
		customerAddress: string;
		useManagedAccessList: boolean;
	};
	metadata: {
		type: NFTContractMetadataType;
		contractUrl?: string;
		tokenUrl?: string;
	};
	publicSaleAt?: Date;
	saleClosesAt?: Date;
	erc721Price?: number;
	erc721MaxPerTransaction?: number;
	enableOpenSeaOperatorFilterRegistry: boolean;
}

export interface Metadata {
	name?: string;
	description?: string;
	image?: string; // Can use a prehosted image url here if not use the upload token metadata media endpoint
	external_url?: string;
	background_color?: string;
	animation_url?: string;
	youtube_url?: string;
	attributes?: Array<MetadataAttribute>;
}

export interface MetadataAttribute {
	trait_type?: string;
	value?: string;
	display_type?: string;
}
export interface ContractResponse {
	id: string;
	name: string;
	symbol: string;
	status: NFTContractStatus;
	allowBuyOnNetwork: boolean;
	network: {
		type: NetworkType;
		environment: NetworkEnvironment;
		chain?: NetworkChain;
		contractAddress?: string;
		contractType: NFTContractType;
		customerAddress: string;
		useManagedAccessList: boolean;
	};
	metadata: {
		type: NFTContractMetadataType;
		contractUrl?: string;
		tokenUrl?: string;
	};
	publicSaleAt?: Date;
	saleClosesAt?: Date;
	erc721Price?: number;
	erc721MaxPerTransaction?: number;
	enableOpenSeaOperatorFilterRegistry: boolean;
}
export interface SetMetadataResponse {
	success: boolean;
}
export interface CreateNFTContractRequest {
	name: string;
	network: CreateNFTNetworkRequest;
	symbol: string;
	allowBuyOnNetwork: boolean;
	metadata: CreateNFTContractMetadataRequest;
	publicSaleAt?: Date; // Date Format is YYYY-MM-DDTHH:mm:ss.sssZ
	saleClosesAt?: Date; // Date Format is YYYY-MM-DDTHH:mm:ss.sssZ
	secondarySaleBasisPoints: number;
	erc721Price?: number; // Price in ETH
	erc721MaxPerTransaction?: number;
	allowBuyWithMoonPay?: boolean;
	enableOpenSeaOperatorFilterRegistry: boolean;
}

export interface CreateNFTNetworkRequest {
	type: NetworkType;
	environment: NetworkEnvironment;
	chain: NetworkChain;
	// Address used to reclaim control of the contract from HM if desired in the future
	recoveryAddress: string;
	// Used when providing custom access list behavior via an external API
	presaleAddress?: string;
	customerPrimaryRoyaltyAddress: string;
	// Address show as the owner on marketplaces
	collectionOwnerAddress: string;
	contractType: NFTContractType;
	useManagedAccessList: boolean;
	usePrimarySaleSplitter?: boolean;
	//primarySaleSplitterId will be required if usePrimarySaleSplitter is set to true
	primarySaleSplitterId?: string;
	secondaryRoyaltyAddress: string;
	useSecondarySaleSplitter?: boolean;
	//secondarySaleSplitterId will be required if useSecondarySaleSplitter is set to true
	secondarySaleSplitterId?: string;
}

export interface CreateNFTContractMetadataRequest {
	type: NFTContractMetadataType;
	contractUrl?: string;
	tokenUrl?: string;
	description?: string;
	externalLink?: string;
}

export interface CreateNFTContractResponse {
	id?: string;
}
export interface DeployContractResponse {
	interactions: Array<InteractionStatusResponse>;
}
export interface InteractionStatusResponse {
	id: string;
	type: NFTContractInteractionType;
	status: NetworkInteractionStatus;
	statusReason?: string;
	transactionHash?: string;
	sentAt?: Date;
	update: NFTContractUpdate;
}
export interface ContractTokensResponse {
	tokens: Array<ContractToken>;
}

export interface ContractToken {
	id: number;
	totalSupply: number;
	price: number;
	supply?: number;
	remaining?: number;
	maxPerTransaction: number;
}
export interface NFTContractTokenResponse {
	id: number;
	supply: number;
	remaining: number;
	totalSupply: number;
	price: number;
	maxPerTransaction: number;
	tokenAddress?: string;
	metadata: {
		name?: string;
		description?: string;
		image?: string;
		animationUrl?: string;
		attributes?: Array<MetadataAttribute>;
	}
}

export interface MetadataAttribute {
	trait_type?: string;
	value?: string;
	display_type?: string;
}
export interface MintResponse {
	id: string;
}
export interface MintStatusResponse {
	id: string;
	status: NetworkInteractionStatus;
	statusReason?: string;
	address: string;
	sentAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	transactionHash?: string;
	tokens: {
		id: number;
		amount: number;
	}[];
	result: {
		id: number;
		amount: number;
	}[];
	contract: {
		id: string;
	}
}
export interface TokenOwnershipResponse {
	tokens: Array<Token>;
}
export interface Token {
	tokenId: number;
	amount: number; // Always 1 for ERC721
	tokenAddress?: string; // Only populated for Solana
	tokenAccountAddress?: string; // Only populated for Solana
}
export interface TransferRequest {
	address: string;
	tokenId: number;
	amount?: number; // ERC1155 only
}
export interface TransferResponse {
	id: string;
}
export interface TransferStatusResponse {
	id: string;
	status: NetworkInteractionStatus;
	statusReason?: string;
	address: string;
	sentAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	transactionHash?: string;
	tokenId: number;
	amount?: number;
}
export interface UpdateNameAndSymbolRequest {
	name: string;
	symbol: string;
}
export interface ContractInteractionResponse {
	interactionId?: string;
}
export interface UpdateErc721DraftContractRequest {
	name: string;
	symbol: string;
	network?: CreateUpdateNFTDraftContractNetworkInput;
	secondarySaleBasisPoints?: number;
	erc721TotalSupply?: number;
	erc721MaxPerTransaction?: number;
	erc721Price?: number;
}

export interface CreateUpdateNFTDraftContractNetworkInput {
	type?: NetworkType;
	environment?: NetworkEnvironment;
	chain?: NetworkChain;
	recoveryAddress?: string;
	collectionOwnerAddress?: string;
	customerPrimaryRoyaltyAddress?: string;
}
export interface UpdateMetadataUrlRequest {
	contractMetadataUrl: string;
	tokenMetadataUrl: string;
}
export interface ContractInteractionResponse {
	interactionId?: string;
}
export interface ContractMetadata {
	name?: string;
	description?: string;
	image?: string;
	external_url?: string;
	seller_fee_basis_points?: number;
	fee_recipient?: string;
}
export interface MediaUploadResponse {
	success: boolean
}
export interface BurnResponse {
	transactionStatus:string //Pending/Complete/Failed
	burn:boolean //true if transaction is a completed burn transaction (sent to zero address)
	walletaddress: string //users wallet address
}
export enum NetworkInteractionStatus {
	Pending = 'Pending',
	Sent = 'Sent',
	Complete = 'Complete',
	Failed = 'Failed'
}
export enum NFTContractStatus {
	Draft = 'Draft',
	Deploying = 'Deploying',
	Deployed = 'Deployed'
}

export enum NetworkType {
	Ethereum = 'Ethereum',
	Polygon = 'Polygon',
	Solana = 'Solana'
}

export enum NetworkEnvironment {
	Emulator = 'Emulator',
	Testnet = 'Testnet',
	Mainnet = 'Mainnet'
}

export enum NetworkChain {
	EVMLocal = 'EVMLocal',
	Ethereum = 'Ethereum',
	Goerli = 'Goerli',
	Polygon = 'Polygon',
	Mumbai = 'Mumbai'
}
export enum NetworkChainID {
	EVMLocal = 0,
	Ethereum = 1,
	Ropsten = 3,
	Rinkeby = 4,
	Polygon = 137,
	Mumbai = 80001
}

export enum NFTContractType {
	ERC721 = 'ERC721',
	ERC1155 = 'ERC1155'
}

export enum NFTContractMetadataType {
	None = 'None',
	Hosted = 'Hosted',
	Url = 'Url'
}

export interface AuthPresaleResponse {
	totalPrice: number;
	maxPerAddress?: number;
	expires: number;
	signature: string;
}