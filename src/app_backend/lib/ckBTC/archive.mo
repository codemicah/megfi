// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
    public type Account = { owner : Principal; subaccount : ?Blob };
    public type Approve = {
        fee : ?Nat;
        from : Account;
        memo : ?Blob;
        created_at_time : ?Nat64;
        amount : Nat;
        expected_allowance : ?Nat;
        expires_at : ?Nat64;
        spender : Account;
    };
    public type Block = Value;
    public type BlockIndex = Nat;
    public type Burn = {
        from : Account;
        memo : ?Blob;
        created_at_time : ?Nat64;
        amount : Nat;
        spender : ?Account;
    };
    public type DataCertificate = { certificate : Blob; hash_tree : Blob };
    public type GetArchivesArgs = { from : ?Principal };
    public type GetArchivesResult = [{
        end : Nat;
        canister_id : Principal;
        start : Nat;
    }];
    public type GetBlocksArgs = [{ start : Nat; length : Nat }];
    public type GetBlocksResult = {
        log_length : Nat;
        blocks : [{ id : Nat; block : ICRC3Value }];
        archived_blocks : [{
            args : GetBlocksArgs;
            callback : shared query GetBlocksArgs -> async GetBlocksResult;
        }];
    };
    public type ICRC3Value = {
        #Int : Int;
        #Map : [(Text, ICRC3Value)];
        #Nat : Nat;
        #Blob : Blob;
        #Text : Text;
        #Array : [ICRC3Value];
    };
    public type Map = [(Text, Value)];
    public type Mint = {
        to : Account;
        memo : ?Blob;
        created_at_time : ?Nat64;
        amount : Nat;
    };
    public type Transaction = {
        burn : ?Burn;
        kind : Text;
        mint : ?Mint;
        approve : ?Approve;
        timestamp : Nat64;
        transfer : ?Transfer;
    };
    public type Transfer = {
        to : Account;
        fee : ?Nat;
        from : Account;
        memo : ?Blob;
        created_at_time : ?Nat64;
        amount : Nat;
        spender : ?Account;
    };
    public type Value = {
        #Int : Int;
        #Map : Map;
        #Nat : Nat;
        #Nat64 : Nat64;
        #Blob : Blob;
        #Text : Text;
        #Array : [Value];
    };
    public type Self = (Principal, Nat64, ?Nat64, ?Nat64) -> async actor {
        append_blocks : shared [Blob] -> async ();
        get_blocks : shared query { start : Nat; length : Nat } -> async {
            blocks : [Block];
        };
        get_transaction : shared query Nat64 -> async ?Transaction;
        get_transactions : shared query { start : Nat; length : Nat } -> async {
            transactions : [Transaction];
        };
        icrc3_get_archives : shared query GetArchivesArgs -> async GetArchivesResult;
        icrc3_get_blocks : shared query GetBlocksArgs -> async GetBlocksResult;
        icrc3_get_tip_certificate : shared query () -> async ?DataCertificate;
        icrc3_supported_block_types : shared query () -> async [{
            url : Text;
            block_type : Text;
        }];
        remaining_capacity : shared query () -> async Nat64;
    };
};
