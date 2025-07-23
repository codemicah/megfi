// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
    public type Account = { owner : Principal; subaccount : ?Blob };
    public type AddCkErc20Token = {
        ckerc20_ledger_id : Principal;
        chain_id : Nat;
        address : Text;
        ckerc20_token_symbol : Text;
    };
    public type BlockTag = { #Safe; #Finalized; #Latest };
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
    public type CkErc20Token = {
        erc20_contract_address : Text;
        ledger_canister_id : Principal;
        ckerc20_token_symbol : Text;
    };
    public type DefiniteCanisterSettings = {
        freezing_threshold : Nat;
        controllers : [Principal];
        reserved_cycles_limit : Nat;
        log_visibility : LogVisibility;
        wasm_memory_limit : Nat;
        memory_allocation : Nat;
        compute_allocation : Nat;
    };
    public type Eip1559TransactionPrice = {
        max_priority_fee_per_gas : Nat;
        max_fee_per_gas : Nat;
        max_transaction_fee : Nat;
        timestamp : ?Nat64;
        gas_limit : Nat;
    };
    public type Eip1559TransactionPriceArg = { ckerc20_ledger_id : Principal };
    public type EthTransaction = { transaction_hash : Text };
    public type EthereumNetwork = { #Mainnet; #Sepolia };
    public type Event = {
        timestamp : Nat64;
        payload : {
            #SkippedBlock : { block_number : Nat; contract_address : ?Text };
            #AcceptedErc20Deposit : {
                principal : Principal;
                transaction_hash : Text;
                value : Nat;
                log_index : Nat;
                block_number : Nat;
                erc20_contract_address : Text;
                from_address : Text;
            };
            #SignedTransaction : { raw_transaction : Text; withdrawal_id : Nat };
            #Upgrade : UpgradeArg;
            #Init : InitArg;
            #AddedCkErc20Token : {
                ckerc20_ledger_id : Principal;
                chain_id : Nat;
                address : Text;
                ckerc20_token_symbol : Text;
            };
            #QuarantinedDeposit : { event_source : EventSource };
            #SyncedToBlock : { block_number : Nat };
            #AcceptedDeposit : {
                principal : Principal;
                transaction_hash : Text;
                value : Nat;
                log_index : Nat;
                block_number : Nat;
                from_address : Text;
            };
            #ReplacedTransaction : {
                withdrawal_id : Nat;
                transaction : UnsignedTransaction;
            };
            #QuarantinedReimbursement : { index : ReimbursementIndex };
            #MintedCkEth : {
                event_source : EventSource;
                mint_block_index : Nat;
            };
            #ReimbursedEthWithdrawal : {
                transaction_hash : ?Text;
                withdrawal_id : Nat;
                reimbursed_amount : Nat;
                reimbursed_in_block : Nat;
            };
            #FailedErc20WithdrawalRequest : {
                to : Principal;
                withdrawal_id : Nat;
                reimbursed_amount : Nat;
                to_subaccount : ?Blob;
            };
            #ReimbursedErc20Withdrawal : {
                burn_in_block : Nat;
                transaction_hash : ?Text;
                withdrawal_id : Nat;
                reimbursed_amount : Nat;
                ledger_id : Principal;
                reimbursed_in_block : Nat;
            };
            #MintedCkErc20 : {
                event_source : EventSource;
                erc20_contract_address : Text;
                mint_block_index : Nat;
                ckerc20_token_symbol : Text;
            };
            #CreatedTransaction : {
                withdrawal_id : Nat;
                transaction : UnsignedTransaction;
            };
            #InvalidDeposit : { event_source : EventSource; reason : Text };
            #SyncedErc20ToBlock : { block_number : Nat };
            #AcceptedErc20WithdrawalRequest : {
                cketh_ledger_burn_index : Nat;
                destination : Text;
                ckerc20_ledger_id : Principal;
                withdrawal_amount : Nat;
                from : Principal;
                created_at : Nat64;
                from_subaccount : ?Blob;
                erc20_contract_address : Text;
                ckerc20_ledger_burn_index : Nat;
                max_transaction_fee : Nat;
            };
            #AcceptedEthWithdrawalRequest : {
                ledger_burn_index : Nat;
                destination : Text;
                withdrawal_amount : Nat;
                from : Principal;
                created_at : ?Nat64;
                from_subaccount : ?Blob;
            };
            #FinalizedTransaction : {
                withdrawal_id : Nat;
                transaction_receipt : TransactionReceipt;
            };
        };
    };
    public type EventSource = { transaction_hash : Text; log_index : Nat };
    public type GasFeeEstimate = {
        max_priority_fee_per_gas : Nat;
        max_fee_per_gas : Nat;
        timestamp : Nat64;
    };
    public type InitArg = {
        ethereum_network : EthereumNetwork;
        last_scraped_block_number : Nat;
        ecdsa_key_name : Text;
        next_transaction_nonce : Nat;
        ledger_id : Principal;
        ethereum_contract_address : ?Text;
        minimum_withdrawal_amount : Nat;
        ethereum_block_height : BlockTag;
    };
    public type LedgerError = {
        #TemporarilyUnavailable : Text;
        #InsufficientAllowance : {
            token_symbol : Text;
            ledger_id : Principal;
            allowance : Nat;
            failed_burn_amount : Nat;
        };
        #AmountTooLow : {
            minimum_burn_amount : Nat;
            token_symbol : Text;
            ledger_id : Principal;
            failed_burn_amount : Nat;
        };
        #InsufficientFunds : {
            balance : Nat;
            token_symbol : Text;
            ledger_id : Principal;
            failed_burn_amount : Nat;
        };
    };
    public type LogVisibility = { #controllers; #public_ };
    public type MinterArg = { #UpgradeArg : UpgradeArg; #InitArg : InitArg };
    public type MinterInfo = {
        eth_balance : ?Nat;
        eth_helper_contract_address : ?Text;
        last_observed_block_number : ?Nat;
        evm_rpc_id : ?Principal;
        erc20_helper_contract_address : ?Text;
        last_erc20_scraped_block_number : ?Nat;
        supported_ckerc20_tokens : ?[CkErc20Token];
        last_gas_fee_estimate : ?GasFeeEstimate;
        cketh_ledger_id : ?Principal;
        smart_contract_address : ?Text;
        last_eth_scraped_block_number : ?Nat;
        minimum_withdrawal_amount : ?Nat;
        erc20_balances : ?[{ balance : Nat; erc20_contract_address : Text }];
        minter_address : ?Text;
        ethereum_block_height : ?BlockTag;
    };
    public type QueryStats = {
        response_payload_bytes_total : Nat;
        num_instructions_total : Nat;
        num_calls_total : Nat;
        request_payload_bytes_total : Nat;
    };
    public type ReimbursementIndex = {
        #CkErc20 : {
            cketh_ledger_burn_index : Nat;
            ledger_id : Principal;
            ckerc20_ledger_burn_index : Nat;
        };
        #CkEth : { ledger_burn_index : Nat };
    };
    public type RetrieveErc20Request = {
        ckerc20_block_index : Nat;
        cketh_block_index : Nat;
    };
    public type RetrieveEthRequest = { block_index : Nat };
    public type RetrieveEthStatus = {
        #NotFound;
        #TxFinalized : TxFinalizedStatus;
        #TxSent : EthTransaction;
        #TxCreated;
        #Pending;
    };
    public type TransactionReceipt = {
        effective_gas_price : Nat;
        status : { #Success; #Failure };
        transaction_hash : Text;
        block_hash : Text;
        block_number : Nat;
        gas_used : Nat;
    };
    public type TxFinalizedStatus = {
        #Success : { transaction_hash : Text; effective_transaction_fee : ?Nat };
        #Reimbursed : {
            transaction_hash : Text;
            reimbursed_amount : Nat;
            reimbursed_in_block : Nat;
        };
        #PendingReimbursement : EthTransaction;
    };
    public type UnsignedTransaction = {
        destination : Text;
        value : Nat;
        max_priority_fee_per_gas : Nat;
        data : Blob;
        max_fee_per_gas : Nat;
        chain_id : Nat;
        nonce : Nat;
        gas_limit : Nat;
        access_list : [{ storage_keys : [Blob]; address : Text }];
    };
    public type UpgradeArg = {
        next_transaction_nonce : ?Nat;
        evm_rpc_id : ?Principal;
        ledger_suite_orchestrator_id : ?Principal;
        erc20_helper_contract_address : ?Text;
        last_erc20_scraped_block_number : ?Nat;
        ethereum_contract_address : ?Text;
        minimum_withdrawal_amount : ?Nat;
        ethereum_block_height : ?BlockTag;
    };
    public type WithdrawErc20Arg = {
        ckerc20_ledger_id : Principal;
        recipient : Text;
        amount : Nat;
    };
    public type WithdrawErc20Error = {
        #TokenNotSupported : { supported_tokens : [CkErc20Token] };
        #TemporarilyUnavailable : Text;
        #CkErc20LedgerError : { error : LedgerError; cketh_block_index : Nat };
        #CkEthLedgerError : { error : LedgerError };
        #RecipientAddressBlocked : { address : Text };
    };
    public type WithdrawalArg = { recipient : Text; amount : Nat };
    public type WithdrawalDetail = {
        status : WithdrawalStatus;
        token_symbol : Text;
        withdrawal_amount : Nat;
        withdrawal_id : Nat64;
        from : Principal;
        from_subaccount : ?Blob;
        max_transaction_fee : ?Nat;
        recipient_address : Text;
    };
    public type WithdrawalError = {
        #TemporarilyUnavailable : Text;
        #InsufficientAllowance : { allowance : Nat };
        #AmountTooLow : { min_withdrawal_amount : Nat };
        #RecipientAddressBlocked : { address : Text };
        #InsufficientFunds : { balance : Nat };
    };
    public type WithdrawalSearchParameter = {
        #ByRecipient : Text;
        #BySenderAccount : Account;
        #ByWithdrawalId : Nat64;
    };
    public type WithdrawalStatus = {
        #TxFinalized : TxFinalizedStatus;
        #TxSent : EthTransaction;
        #TxCreated;
        #Pending;
    };
    public type Self = MinterArg -> async actor {
        add_ckerc20_token : shared AddCkErc20Token -> async ();
        eip_1559_transaction_price : shared query ?Eip1559TransactionPriceArg -> async Eip1559TransactionPrice;
        get_canister_status : shared () -> async CanisterStatusResponse;
        get_events : shared query { start : Nat64; length : Nat64 } -> async {
            total_event_count : Nat64;
            events : [Event];
        };
        get_minter_info : shared query () -> async MinterInfo;
        is_address_blocked : shared query Text -> async Bool;
        minter_address : shared () -> async Text;
        retrieve_eth_status : shared Nat64 -> async RetrieveEthStatus;
        smart_contract_address : shared query () -> async Text;
        withdraw_erc20 : shared WithdrawErc20Arg -> async {
            #Ok : RetrieveErc20Request;
            #Err : WithdrawErc20Error;
        };
        withdraw_eth : shared WithdrawalArg -> async {
            #Ok : RetrieveEthRequest;
            #Err : WithdrawalError;
        };
        withdrawal_status : shared query WithdrawalSearchParameter -> async [
            WithdrawalDetail
        ];
    };
};
