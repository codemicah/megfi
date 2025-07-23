// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
    public type AddErc20Arg = {
        contract : Erc20Contract;
        ledger_init_arg : LedgerInitArg;
    };
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
    public type CyclesManagement = {
        cycles_top_up_increment : Nat;
        cycles_for_ledger_creation : Nat;
        cycles_for_archive_creation : Nat;
        cycles_for_index_creation : Nat;
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
    public type Erc20Contract = { chain_id : Nat; address : Text };
    public type InitArg = {
        cycles_management : ?CyclesManagement;
        more_controller_ids : [Principal];
        minter_id : ?Principal;
    };
    public type InstalledCanister = {
        canister_id : Principal;
        installed_wasm_hash : Text;
    };
    public type InstalledLedgerSuite = {
        token_symbol : Text;
        ledger : InstalledCanister;
        index : InstalledCanister;
        archives : ?[Principal];
    };
    public type LedgerInitArg = {
        decimals : Nat8;
        token_symbol : Text;
        transfer_fee : Nat;
        token_logo : Text;
        token_name : Text;
    };
    public type LedgerSuiteVersion = {
        archive_compressed_wasm_hash : Text;
        ledger_compressed_wasm_hash : Text;
        index_compressed_wasm_hash : Text;
    };
    public type LogVisibility = { #controllers; #public_ };
    public type ManagedCanisterIds = {
        ledger : ?Principal;
        index : ?Principal;
        archives : [Principal];
    };
    public type ManagedCanisterStatus = {
        #Created : { canister_id : Principal };
        #Installed : { canister_id : Principal; installed_wasm_hash : Text };
    };
    public type ManagedCanisters = {
        erc20_contract : Erc20Contract;
        ledger : ?ManagedCanisterStatus;
        index : ?ManagedCanisterStatus;
        archives : [Principal];
        ckerc20_token_symbol : Text;
    };
    public type ManagedLedgerSuite = {
        token_symbol : Text;
        ledger : ?ManagedCanisterStatus;
        index : ?ManagedCanisterStatus;
        archives : [Principal];
    };
    public type OrchestratorArg = {
        #UpgradeArg : UpgradeArg;
        #InitArg : InitArg;
        #AddErc20Arg : AddErc20Arg;
    };
    public type OrchestratorInfo = {
        cycles_management : CyclesManagement;
        managed_canisters : [ManagedCanisters];
        managed_pre_existing_ledger_suites : ?[ManagedLedgerSuite];
        more_controller_ids : [Principal];
        ledger_suite_version : ?LedgerSuiteVersion;
        minter_id : ?Principal;
    };
    public type QueryStats = {
        response_payload_bytes_total : Nat;
        num_instructions_total : Nat;
        num_calls_total : Nat;
        request_payload_bytes_total : Nat;
    };
    public type UpdateCyclesManagement = {
        cycles_top_up_increment : ?Nat;
        cycles_for_ledger_creation : ?Nat;
        cycles_for_archive_creation : ?Nat;
        cycles_for_index_creation : ?Nat;
    };
    public type UpgradeArg = {
        manage_ledger_suites : ?[InstalledLedgerSuite];
        cycles_management : ?UpdateCyclesManagement;
        archive_compressed_wasm_hash : ?Text;
        git_commit_hash : ?Text;
        ledger_compressed_wasm_hash : ?Text;
        index_compressed_wasm_hash : ?Text;
    };
    public type Self = OrchestratorArg -> async actor {
        canister_ids : shared query Erc20Contract -> async ?ManagedCanisterIds;
        get_canister_status : shared () -> async CanisterStatusResponse;
        get_orchestrator_info : shared query () -> async OrchestratorInfo;
    };
};
