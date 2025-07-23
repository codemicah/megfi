// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
    public type Alert = {
        service : ?Text;
        level : { #Low; #High; #Medium; #Severe };
        category : ?Text;
        exposure_type : { #Indirect; #Direct };
    };
    public type DepositRequest = {
        txid : Blob;
        vout : Nat32;
        caller : Principal;
    };
    public type FetchUtxoAlertsError = { #TemporarilyUnavailable : Text };
    public type FetchWithdrawalAlertsError = { #TemporarilyUnavailable : Text };
    public type InitArg = {
        maintainers : [Principal];
        mode : Mode;
        minter_id : Principal;
    };
    public type LifecycleArg = { #UpgradeArg : UpgradeArg; #InitArg : InitArg };
    public type Mode = { #RejectAll; #Normal; #AcceptAll };
    public type Response = {
        provider : Principal;
        alerts : [Alert];
        external_id : Text;
    };
    public type SetApiKeyArg = { api_key : Text };
    public type UpgradeArg = {
        maintainers : ?[Principal];
        mode : ?Mode;
        minter_id : ?Principal;
    };
    public type WithdrawalAttempt = {
        id : Text;
        timestamp_nanos : Nat64;
        address : Text;
        caller : Principal;
        amount : Nat64;
    };
    public type Self = LifecycleArg -> async actor {
        fetch_utxo_alerts : shared DepositRequest -> async {
            #Ok : Response;
            #Err : FetchUtxoAlertsError;
        };
        fetch_withdrawal_alerts : shared WithdrawalAttempt -> async {
            #Ok : Response;
            #Err : FetchWithdrawalAlertsError;
        };
        set_api_key : shared SetApiKeyArg -> async ();
        txid_to_bytes : shared query Text -> async Blob;
    };
};
