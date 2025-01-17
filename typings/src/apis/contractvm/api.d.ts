/**
 * @packageDocumentation
 * @module API-ContractVM
 */
import { Buffer } from 'buffer/';
import BN from 'bn.js';
import DijetsCore from '../../dijets';
import { JRPCAPI } from '../../common/jrpcapi';
import { KeyChain } from './keychain';
import { UnsignedTx, Tx } from './tx';
import { PayloadBase } from '../../utils/payload';
import { UTXOSet } from '../contractvm/utxos';
import { PersistanceOptions } from '../../utils/persistenceoptions';
/**
 * Class for interacting with a node's ContractVMAPI
 *
 * @category RPCAPIs
 *
 * @remarks This extends the [[JRPCAPI]] class. This class should not be directly called. Instead, use the [[Dijets.addAPI]] function to register this interface with Dijets.
 */
export declare class ContractVMAPI extends JRPCAPI {
    /**
     * @ignore
     */
    protected keychain: KeyChain;
    protected blockchainID: string;
    protected blockchainAlias: string;
    protected DJTXAssetID: Buffer;
    protected txFee: BN;
    protected creationTxFee: BN;
    /**
     * Gets the alias for the blockchainID if it exists, otherwise returns `undefined`.
     *
     * @returns The alias for the blockchainID
     */
    getBlockchainAlias: () => string;
    /**
     * Sets the alias for the blockchainID.
     *
     * @param alias The alias for the blockchainID.
     *
     */
    setBlockchainAlias: (alias: string) => string;
    /**
     * Gets the blockchainID and returns it.
     *
     * @returns The blockchainID
     */
    getBlockchainID: () => string;
    /**
     * Refresh blockchainID, and if a blockchainID is passed in, use that.
     *
     * @param Optional. BlockchainID to assign, if none, uses the default based on networkID.
     *
     * @returns The blockchainID
     */
    refreshBlockchainID: (blockchainID?: string) => boolean;
    /**
     * Takes an address string and returns its {@link https://github.com/feross/buffer|Buffer} representation if valid.
     *
     * @returns A {@link https://github.com/feross/buffer|Buffer} for the address if valid, undefined if not valid.
     */
    parseAddress: (addr: string) => Buffer;
    addressFromBuffer: (address: Buffer) => string;
    /**
     * Fetches the DJTX AssetID and returns it in a Promise.
     *
     * @param refresh This function caches the response. Refresh = true will bust the cache.
     *
     * @returns The the provided string representing the DJTX AssetID
     */
    getDJTXAssetID: (refresh?: boolean) => Promise<Buffer>;
    /**
     * Overrides the defaults and sets the cache to a specific DJTX AssetID
     *
     * @param djtxAssetID A cb58 string or Buffer representing the DJTX AssetID
     *
     * @returns The the provided string representing the DJTX AssetID
     */
    setDJTXAssetID: (djtxAssetID: string | Buffer) => void;
    /**
     * Gets the default tx fee for this chain.
     *
     * @returns The default tx fee as a {@link https://github.com/indutny/bn.js/|BN}
     */
    getDefaultTxFee: () => BN;
    /**
     * Gets the tx fee for this chain.
     *
     * @returns The tx fee as a {@link https://github.com/indutny/bn.js/|BN}
     */
    getTxFee: () => BN;
    /**
     * Sets the tx fee for this chain.
     *
     * @param fee The tx fee amount to set as {@link https://github.com/indutny/bn.js/|BN}
     */
    setTxFee: (fee: BN) => void;
    /**
     * Gets the default creation fee for this chain.
     *
     * @returns The default creation fee as a {@link https://github.com/indutny/bn.js/|BN}
     */
    getDefaultCreationTxFee: () => BN;
    /**
     * Gets the creation fee for this chain.
     *
     * @returns The creation fee as a {@link https://github.com/indutny/bn.js/|BN}
     */
    getCreationTxFee: () => BN;
    /**
     * Sets the creation fee for this chain.
     *
     * @param fee The creation fee amount to set as {@link https://github.com/indutny/bn.js/|BN}
     */
    setCreationTxFee: (fee: BN) => void;
    /**
     * Gets a reference to the keychain for this class.
     *
     * @returns The instance of [[]] for this class
     */
    keyChain: () => KeyChain;
    /**
     * @ignore
     */
    newKeyChain: () => KeyChain;
    /**
     * Helper function which determines if a tx is a goose egg transaction.
     *
     * @param utx An UnsignedTx
     *
     * @returns boolean true if passes goose egg test and false if fails.
     *
     * @remarks
     * A "Goose Egg Transaction" is when the fee far exceeds a reasonable amount
     */
    checkGooseEgg: (utx: UnsignedTx, outTotal?: BN) => Promise<boolean>;
    /**
     * Retrieves an assetID for a subnet's staking assset.
     *
     * @returns Returns a Promise<string> with cb58 encoded value of the assetID.
     */
    getStakingAssetID: () => Promise<string>;
    /**
     * Creates a new blockchain.
     *
     * @param username The username of the Keystore user that controls the new account
     * @param password The password of the Keystore user that controls the new account
     * @param subnetID Optional. Either a {@link https://github.com/feross/buffer|Buffer} or an cb58 serialized string for the SubnetID or its alias.
     * @param vmID The ID of the Virtual Machine the blockchain runs. Can also be an alias of the Virtual Machine.
     * @param FXIDs The ids of the FXs the VM is running.
     * @param name A human-readable name for the new blockchain
     * @param genesis The base 58 (with checksum) representation of the genesis state of the new blockchain. Virtual Machines should have a static API method named buildGenesis that can be used to generate genesisData.
     *
     * @returns Promise for the unsigned transaction to create this blockchain. Must be signed by a sufficient number of the Subnet’s control keys and by the account paying the transaction fee.
     */
    createBlockchain: (username: string, password: string, subnetID: Buffer | string, vmID: string, fxIDs: Array<number>, name: string, genesis: string) => Promise<string>;
    /**
     * Gets the status of a blockchain.
     *
     * @param blockchainID The blockchainID requesting a status update
     *
     * @returns Promise for a string of one of: "Validating", "Created", "Preferred", "Unknown".
     */
    getBlockchainStatus: (blockchainID: string) => Promise<string>;
    /**
     * Create an address in the node's keystore.
     *
     * @param username The username of the Keystore user that controls the new account
     * @param password The password of the Keystore user that controls the new account
     *
     * @returns Promise for a string of the newly created account address.
     */
    createAddress: (username: string, password: string) => Promise<string>;
    /**
     * Gets the balance of a particular asset.
     *
     * @param address The address to pull the asset balance from
     *
     * @returns Promise with the balance as a {@link https://github.com/indutny/bn.js/|BN} on the provided address.
     */
    getBalance: (address: string) => Promise<object>;
    /**
     * List the addresses controlled by the user.
     *
     * @param username The username of the Keystore user
     * @param password The password of the Keystore user
     *
     * @returns Promise for an array of addresses.
     */
    listAddresses: (username: string, password: string) => Promise<Array<string>>;
    /**
     * Send DJTX from an account on the P-Chain to an address on the X-Chain. This transaction
     * must be signed with the key of the account that the DJTX is sent from and which pays
     * the transaction fee. After issuing this transaction, you must call the X-Chain’s
     * importDJTX method to complete the transfer.
     *
     * @param username The Keystore user that controls the account specified in `to`
     * @param password The password of the Keystore user
     * @param to The ID of the account the DJTX is sent to. This must be the same as the to
     * argument in the corresponding call to the X-Chain’s exportDJTX
     * @param sourceChain The chainID where the funds are coming from.
     *
     * @returns Promise for a string for the transaction, which should be sent to the network
     * by calling issueTx.
     */
    importDJTX: (username: string, password: string, to: string, sourceChain: string) => Promise<string>;
    /**
     * Calls the node's issueTx method from the API and returns the resulting transaction ID as a string.
     *
     * @param tx A string, {@link https://github.com/feross/buffer|Buffer}, or [[Tx]] representing a transaction
     *
     * @returns A Promise<string> representing the transaction ID of the posted transaction.
     */
    issueTx: (tx: string | Buffer | Tx) => Promise<string>;
    /**
     * Returns an upper bound on the amount of tokens that exist. Not monotonically increasing because this number can go down if a staker's reward is denied.
     */
    getCurrentSupply: () => Promise<BN>;
    /**
     * Exports the private key for an address.
     *
     * @param username The name of the user with the private key
     * @param password The password used to decrypt the private key
     * @param address The address whose private key should be exported
     *
     * @returns Promise with the decrypted private key as store in the database
     */
    exportKey: (username: string, password: string, address: string) => Promise<string>;
    /**
     * Give a user control over an address by providing the private key that controls the address.
     *
     * @param username The name of the user to store the private key
     * @param password The password that unlocks the user
     * @param privateKey A string representing the private key in the vm's format
     *
     * @returns The address for the imported private key.
     */
    importKey: (username: string, password: string, privateKey: string) => Promise<string>;
    /**
     * Returns the treansaction data of a provided transaction ID by calling the node's `getTx` method.
     *
     * @param txid The string representation of the transaction ID
     *
     * @returns Returns a Promise<string> containing the bytes retrieved from the node
     */
    getTx: (txid: string) => Promise<string>;
    /**
     * Returns the status of a provided transaction ID by calling the node's `getTxStatus` method.
     *
     * @param txid The string representation of the transaction ID
     *
     * @returns Returns a Promise<string> containing the status retrieved from the node
     */
    getTxStatus: (txid: string) => Promise<string>;
    /**
     * Retrieves the UTXOs related to the addresses provided from the node's `getUTXOs` method.
     *
     * @param addresses An array of addresses as cb58 strings or addresses as {@link https://github.com/feross/buffer|Buffer}s
     * @param sourceChain A string for the chain to look for the UTXO's. Default is to use this chain, but if exported UTXOs exist from other chains, this can used to pull them instead.
     * @param limit Optional. Returns at most [limit] addresses. If [limit] == 0 or > [maxUTXOsToFetch], fetches up to [maxUTXOsToFetch].
     * @param startIndex Optional. [StartIndex] defines where to start fetching UTXOs (for pagination.)
     * UTXOs fetched are from addresses equal to or greater than [StartIndex.Address]
     * For address [StartIndex.Address], only UTXOs with IDs greater than [StartIndex.Utxo] will be returned.
     * @param persistOpts Options available to persist these UTXOs in local storage
     *
     * @remarks
     * persistOpts is optional and must be of type [[PersistanceOptions]]
     *
     */
    getUTXOs: (addresses: Array<string> | string, sourceChain?: string, limit?: number, startIndex?: {
        address: string;
        utxo: string;
    }, persistOpts?: PersistanceOptions) => Promise<{
        numFetched: number;
        utxos: UTXOSet;
        endIndex: {
            address: string;
            utxo: string;
        };
    }>;
    /**
     * Helper function which creates an unsigned Import Tx. For more granular control, you may create your own
     * [[UnsignedTx]] manually (with their corresponding [[TransferableInput]]s, [[TransferableOutput]]s, and [[TransferOperation]]s).
     *
     * @param utxoset A set of UTXOs that the transaction is built on
     * @param ownerAddresses The addresses being used to import
     * @param sourceChain The chainid for where the import is coming from.
     * @param toAddresses The addresses to send the funds
     * @param fromAddresses The addresses being used to send the funds from the UTXOs provided
     * @param changeAddresses The addresses that can spend the change remaining from the spent UTXOs
     * @param memo Optional contains arbitrary bytes, up to 256 bytes
     * @param asOf Optional. The timestamp to verify the transaction against as a {@link https://github.com/indutny/bn.js/|BN}
     * @param locktime Optional. The locktime field created in the resulting outputs
     * @param threshold Optional. The number of signatures required to spend the funds in the resultant UTXO
     *
     * @returns An unsigned transaction ([[UnsignedTx]]) which contains a [[ImportTx]].
     *
     * @remarks
     * This helper exists because the endpoint API should be the primary point of entry for most functionality.
     */
    buildImportTx: (utxoset: UTXOSet, ownerAddresses: Array<string>, sourceChain: Buffer | string, toAddresses: Array<string>, fromAddresses: Array<string>, changeAddresses?: Array<string>, memo?: PayloadBase | Buffer, asOf?: BN, locktime?: BN, threshold?: number) => Promise<UnsignedTx>;
    /**
     * Helper function which creates an unsigned Export Tx. For more granular control, you may create your own
     * [[UnsignedTx]] manually (with their corresponding [[TransferableInput]]s, [[TransferableOutput]]s, and [[TransferOperation]]s).
     *
     * @param utxoset A set of UTXOs that the transaction is built on
     * @param amount The amount being exported as a {@link https://github.com/indutny/bn.js/|BN}
     * @param destinationChain The chainid for where the assets will be sent.
     * @param toAddresses The addresses to send the funds
     * @param fromAddresses The addresses being used to send the funds from the UTXOs provided
     * @param changeAddresses The addresses that can spend the change remaining from the spent UTXOs
     * @param memo Optional contains arbitrary bytes, up to 256 bytes
     * @param asOf Optional. The timestamp to verify the transaction against as a {@link https://github.com/indutny/bn.js/|BN}
     * @param locktime Optional. The locktime field created in the resulting outputs
     * @param threshold Optional. The number of signatures required to spend the funds in the resultant UTXO
     *
     * @returns An unsigned transaction ([[UnsignedTx]]) which contains an [[ExportTx]].
     */
    buildExportTx: (utxoset: UTXOSet, amount: BN, destinationChain: Buffer | string, toAddresses: Array<string>, fromAddresses: Array<string>, changeAddresses?: Array<string>, memo?: PayloadBase | Buffer, asOf?: BN, locktime?: BN, threshold?: number) => Promise<UnsignedTx>;
    /**
     * @ignore
     */
    protected _cleanAddressArray(addresses: Array<string> | Array<Buffer>, caller: string): Array<string>;
    /**
     * This class should not be instantiated directly.
     * Instead use the [[Dijets.addAPI]] method.
     *
     * @param core A reference to the Dijets class
     * @param baseurl Defaults to the string "/ext/bc/C/djtx" as the path to blockchain's baseurl
     * @param blockchainID The Blockchain's ID. Defaults to an empty string: ''
     */
    constructor(core: DijetsCore, baseurl?: string, blockchainID?: string);
}
//# sourceMappingURL=api.d.ts.map