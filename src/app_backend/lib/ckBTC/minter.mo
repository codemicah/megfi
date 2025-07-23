// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
    public type Account = { owner : Principal; subaccount : ?Blob };
    public type BitcoinAddress = {
        #p2wsh_v0 : Blob;
        #p2tr_v1 : Blob;
        #p2sh : Blob;
        #p2wpkh_v0 : Blob;
        #p2pkh : Blob;
    };
    public type BtcNetwork = { #Mainnet; #Regtest; #Testnet };
    public type CanisterStatusResponse = {
        status : CanisterStatusType;
        memory_size : Nat;
        cycles : Nat;
        settings : DefiniteCanisterSettings;
        query_stats : QueryStats;
        idle_cycles_burned_per_day : Nat;
        module_hash : ?Blob;
        reserved_cycles : Nat;
    };
    public type CanisterStatusType = { #stopped; #stopping; #running };
    public type DefiniteCanisterSettings = {
        freezing_threshold : Nat;
        controllers : [Principal];
        reserved_cycles_limit : Nat;
        log_visibility : LogVisibility;
        wasm_memory_limit : Nat;
        memory_allocation : Nat;
        compute_allocation : Nat;
    };
    public type Event = {
        #received_utxos : {
            to_account : Account;
            mint_txid : ?Nat64;
            utxos : [Utxo];
        };
        #schedule_deposit_reimbursement : {
            burn_block_index : Nat64;
            account : Account;
            amount : Nat64;
            reason : ReimbursementReason;
        };
        #sent_transaction : {
            fee : ?Nat64;
            change_output : ?{ value : Nat64; vout : Nat32 };
            txid : Blob;
            utxos : [Utxo];
            requests : [Nat64];
            submitted_at : Nat64;
        };
        #distributed_kyt_fee : {
            block_index : Nat64;
            amount : Nat64;
            kyt_provider : Principal;
        };
        #init : InitArgs;
        #upgrade : UpgradeArgs;
        #retrieve_btc_kyt_failed : {
            block_index : Nat64;
            owner : Principal;
            uuid : Text;
            address : Text;
            amount : Nat64;
            kyt_provider : Principal;
        };
        #accepted_retrieve_btc_request : {
            received_at : Nat64;
            block_index : Nat64;
            address : BitcoinAddress;
            reimbursement_account : ?Account;
            amount : Nat64;
            kyt_provider : ?Principal;
        };
        #checked_utxo : {
            clean : Bool;
            utxo : Utxo;
            uuid : Text;
            kyt_provider : ?Principal;
        };
        #removed_retrieve_btc_request : { block_index : Nat64 };
        #confirmed_transaction : { txid : Blob };
        #replaced_transaction : {
            fee : Nat64;
            change_output : { value : Nat64; vout : Nat32 };
            old_txid : Blob;
            new_txid : Blob;
            submitted_at : Nat64;
        };
        #ignored_utxo : { utxo : Utxo };
        #reimbursed_failed_deposit : {
            burn_block_index : Nat64;
            mint_block_index : Nat64;
        };
    };
    public type InitArgs = {
        kyt_principal : ?Principal;
        ecdsa_key_name : Text;
        mode : Mode;
        retrieve_btc_min_amount : Nat64;
        ledger_id : Principal;
        max_time_in_queue_nanos : Nat64;
        btc_network : BtcNetwork;
        min_confirmations : ?Nat32;
        kyt_fee : ?Nat64;
    };
    public type LogVisibility = { #controllers; #public_ };
    public type MinterArg = { #Upgrade : ?UpgradeArgs; #Init : InitArgs };
    public type MinterInfo = {
        retrieve_btc_min_amount : Nat64;
        min_confirmations : Nat32;
        kyt_fee : Nat64;
    };
    public type Mode = {
        #RestrictedTo : [Principal];
        #DepositsRestrictedTo : [Principal];
        #ReadOnly;
        #GeneralAvailability;
    };
    public type PendingUtxo = {
        confirmations : Nat32;
        value : Nat64;
        outpoint : { txid : Blob; vout : Nat32 };
    };
    public type QueryStats = {
        response_payload_bytes_total : Nat;
        num_instructions_total : Nat;
        num_calls_total : Nat;
        request_payload_bytes_total : Nat;
    };
    public type ReimbursedDeposit = {
        account : Account;
        mint_block_index : Nat64;
        amount : Nat64;
        reason : ReimbursementReason;
    };
    public type ReimbursementReason = {
        #CallFailed;
        #TaintedDestination : { kyt_fee : Nat64; kyt_provider : Principal };
    };
    public type ReimbursementRequest = {
        account : Account;
        amount : Nat64;
        reason : ReimbursementReason;
    };
    public type RetrieveBtcArgs = { address : Text; amount : Nat64 };
    public type RetrieveBtcError = {
        #MalformedAddress : Text;
        #GenericError : { error_message : Text; error_code : Nat64 };
        #TemporarilyUnavailable : Text;
        #AlreadyProcessing;
        #AmountTooLow : Nat64;
        #InsufficientFunds : { balance : Nat64 };
    };
    public type RetrieveBtcOk = { block_index : Nat64 };
    public type RetrieveBtcStatus = {
        #Signing;
        #Confirmed : { txid : Blob };
        #Sending : { txid : Blob };
        #AmountTooLow;
        #Unknown;
        #Submitted : { txid : Blob };
        #Pending;
    };
    public type RetrieveBtcStatusV2 = {
        #Signing;
        #Confirmed : { txid : Blob };
        #Sending : { txid : Blob };
        #AmountTooLow;
        #WillReimburse : ReimbursementRequest;
        #Unknown;
        #Submitted : { txid : Blob };
        #Reimbursed : ReimbursedDeposit;
        #Pending;
    };
    public type RetrieveBtcWithApprovalArgs = {
        from_subaccount : ?Blob;
        address : Text;
        amount : Nat64;
    };
    public type RetrieveBtcWithApprovalError = {
        #MalformedAddress : Text;
        #GenericError : { error_message : Text; error_code : Nat64 };
        #TemporarilyUnavailable : Text;
        #InsufficientAllowance : { allowance : Nat64 };
        #AlreadyProcessing;
        #AmountTooLow : Nat64;
        #InsufficientFunds : { balance : Nat64 };
    };
    public type UpdateBalanceError = {
        #GenericError : { error_message : Text; error_code : Nat64 };
        #TemporarilyUnavailable : Text;
        #AlreadyProcessing;
        #NoNewUtxos : {
            required_confirmations : Nat32;
            pending_utxos : ?[PendingUtxo];
            current_confirmations : ?Nat32;
        };
    };
    public type UpgradeArgs = {
        kyt_principal : ?Principal;
        mode : ?Mode;
        retrieve_btc_min_amount : ?Nat64;
        max_time_in_queue_nanos : ?Nat64;
        min_confirmations : ?Nat32;
        kyt_fee : ?Nat64;
    };
    public type Utxo = {
        height : Nat32;
        value : Nat64;
        outpoint : { txid : Blob; vout : Nat32 };
    };
    public type UtxoStatus = {
        #ValueTooSmall : Utxo;
        #Tainted : Utxo;
        #Minted : { minted_amount : Nat64; block_index : Nat64; utxo : Utxo };
        #Checked : Utxo;
    };
    public type Self = MinterArg -> async actor {
        estimate_withdrawal_fee : shared query { amount : ?Nat64 } -> async {
            minter_fee : Nat64;
            bitcoin_fee : Nat64;
        };
        get_btc_address : shared {
            owner : ?Principal;
            subaccount : ?Blob;
        } -> async Text;
        get_canister_status : shared () -> async CanisterStatusResponse;
        get_deposit_fee : shared query () -> async Nat64;
        get_events : shared query { start : Nat64; length : Nat64 } -> async [
            Event
        ];
        get_known_utxos : shared query {
            owner : ?Principal;
            subaccount : ?Blob;
        } -> async [Utxo];
        get_minter_info : shared query () -> async MinterInfo;
        get_withdrawal_account : shared () -> async Account;
        retrieve_btc : shared RetrieveBtcArgs -> async {
            #Ok : RetrieveBtcOk;
            #Err : RetrieveBtcError;
        };
        retrieve_btc_status : shared query {
            block_index : Nat64;
        } -> async RetrieveBtcStatus;
        retrieve_btc_status_v2 : shared query {
            block_index : Nat64;
        } -> async RetrieveBtcStatusV2;
        retrieve_btc_status_v2_by_account : shared query ?Account -> async [{
            block_index : Nat64;
            status_v2 : ?RetrieveBtcStatusV2;
        }];
        retrieve_btc_with_approval : shared RetrieveBtcWithApprovalArgs -> async {
            #Ok : RetrieveBtcOk;
            #Err : RetrieveBtcWithApprovalError;
        };
        update_balance : shared {
            owner : ?Principal;
            subaccount : ?Blob;
        } -> async { #Ok : [UtxoStatus]; #Err : UpdateBalanceError };
    };
};
