import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";

actor MockBTCMinter {
    
    type Account = {
        owner: Principal;
        subaccount: ?Blob;
    };
    
    type UtxoStatus = {
        #ValueTooSmall: Utxo;
        #Tainted: Utxo;
        #Minted: {
            minted_amount: Nat64;
            block_index: Nat64;
            utxo: Utxo;
        };
        #Checked: Utxo;
    };
    
    type Utxo = {
        height: Nat32;
        value: Nat64;
        outpoint: { txid : Blob; vout : Nat32 };
    };
    
    type UpdateBalanceError = {
        #GenericError: { error_code: Nat64; error_message: Text };
        #TemporarilyUnavailable: Text;
        #AlreadyProcessing;
        #NoNewUtxos: {
            required_confirmations: Nat32;
            pending_utxos: ?[Utxo];
        };
    };
    
    type RetrieveBtcArgs = {
        address: Text;
        amount: Nat64;
    };
    
    type RetrieveBtcOk = {
        block_index: Nat64;
    };
    
    type RetrieveBtcError = {
        #MalformedAddress: Text;
        #GenericError: { error_code: Nat64; error_message: Text };
        #TemporarilyUnavailable: Text;
        #AlreadyProcessing;
        #AmountTooLow: Nat64;
        #InsufficientFunds: { balance: Nat64 };
    };
    
    type RetrieveBtcWithApprovalArgs = {
        address: Text;
        amount: Nat64;
        from_subaccount: ?Blob;
    };
    
    type RetrieveBtcWithApprovalError = {
        #MalformedAddress: Text;
        #GenericError: { error_code: Nat64; error_message: Text };
        #TemporarilyUnavailable: Text;
        #InsufficientFunds: { balance: Nat64 };
        #InsufficientAllowance: { allowance: Nat64 };
    };
    
    type RetrieveBtcStatus = {
        #Unknown;
        #Pending;
        #Signing;
        #Sending: { txid: Blob };
        #Submitted: { txid: Blob };
        #AmountTooLow;
        #Confirmed: { txid: Blob };
    };
    
    type RetrieveBtcStatusV2 = {
        #Unknown;
        #Pending;
        #Signing;
        #Sending: { txid: Blob };
        #Submitted: { txid: Blob };
        #AmountTooLow;
        #Confirmed: { txid: Blob };
    };
    
    type MinterInfo = {
        min_confirmations: Nat32;
        retrieve_btc_min_amount: Nat64;
        kyt_fee: Nat64;
    };

    // Mock Bitcoin addresses for different principals
    public shared func get_btc_address(args: { owner: ?Principal; subaccount: ?Blob }): async Text {
        let principal = switch (args.owner) {
            case (?p) p;
            case null Principal.fromActor(MockBTCMinter);
        };
        
        // Generate a mock Bitcoin address
        "bc1qmockbtcaddressfordevelopment"
    };
    
    public shared func update_balance(args: { owner: ?Principal; subaccount: ?Blob }): async { #Ok: [UtxoStatus]; #Err: UpdateBalanceError } {
        // Mock successful balance update
        #Ok([
            #Checked({
                height = 800000;
                value = 100000; // 0.001 BTC in satoshis
                outpoint = { 
                    txid = "\00\01\02\03\04\05\06\07\08\09\10\11\12\13\14\15\16\17\18\19\20\21\22\23\24\25\26\27\28\29\30\31"; 
                    vout = 0 
                };
            })
        ])
    };
    
    public shared func get_withdrawal_account(): async Account {
        {
            owner = Principal.fromActor(MockBTCMinter);
            subaccount = null;
        }
    };
    
    public shared func retrieve_btc(args: RetrieveBtcArgs): async { #Ok: RetrieveBtcOk; #Err: RetrieveBtcError } {
        if (args.amount < 1000) {
            #Err(#AmountTooLow(1000))
        } else {
            #Ok({ block_index = 1 })
        }
    };
    
    public shared func retrieve_btc_with_approval(args: RetrieveBtcWithApprovalArgs): async { #Ok: RetrieveBtcOk; #Err: RetrieveBtcWithApprovalError } {
        if (args.amount < 1000) {
            #Err(#InsufficientFunds({ balance = 0 }))
        } else {
            #Ok({ block_index = 1 })
        }
    };
    
    public shared query func retrieve_btc_status(args: { block_index: Nat64 }): async RetrieveBtcStatus {
        #Confirmed({ txid = "\00\01\02\03\04\05\06\07\08\09\10\11\12\13\14\15\16\17\18\19\20\21\22\23\24\25\26\27\28\29\30\31" })
    };
    
    public shared query func retrieve_btc_status_v2_by_account(account: ?Account): async [{ block_index: Nat64; status_v2: ?RetrieveBtcStatusV2 }] {
        [{
            block_index = 1;
            status_v2 = ?#Confirmed({ txid = "\00\01\02\03\04\05\06\07\08\09\10\11\12\13\14\15\16\17\18\19\20\21\22\23\24\25\26\27\28\29\30\31" });
        }]
    };
    
    public shared query func estimate_withdrawal_fee(args: { amount: ?Nat64 }): async { minter_fee: Nat64; bitcoin_fee: Nat64 } {
        { minter_fee = 2000; bitcoin_fee = 5000 }
    };
    
    public shared query func get_minter_info(): async MinterInfo {
        {
            min_confirmations = 1;
            retrieve_btc_min_amount = 1000;
            kyt_fee = 1000;
        }
    };
    
    public shared query func get_known_utxos(args: { owner: ?Principal; subaccount: ?Blob }): async [Utxo] {
        [{
            height = 800000;
            value = 100000; // 0.001 BTC
            outpoint = { 
                txid = "\00\01\02\03\04\05\06\07\08\09\10\11\12\13\14\15\16\17\18\19\20\21\22\23\24\25\26\27\28\29\30\31"; 
                vout = 0 
            };
        }]
    };
}