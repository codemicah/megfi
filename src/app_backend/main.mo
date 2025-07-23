import BTCMinter "./lib/ckBTC/minter";
import Nat64 "mo:base/Nat64";
// import Nat32 "mo:base/Nat32";
import ETHMinter "./lib/ckETH/minter";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Error "mo:base/Error";
import CKBTCCKUSDC "./lib/ICPSwap/ckbtcckusdc";
import CKUSDCLedger "./lib/ICPSwap/ckusdcledger";
import CKBTCLedger "./lib/ckBTC/ledger";
import Debug "mo:base/Debug";

actor {
  let btcMinter = actor ("v27v7-7x777-77774-qaaha-cai") : actor {
    get_btc_address : shared { owner : ?Principal; subaccount : ?Blob } -> async Text;
    update_balance : shared { owner : ?Principal; subaccount : ?Blob } -> async {
      #Ok : [BTCMinter.UtxoStatus];
      #Err : BTCMinter.UpdateBalanceError;
    };
    get_withdrawal_account : shared () -> async BTCMinter.Account;
    retrieve_btc : shared BTCMinter.RetrieveBtcArgs -> async {
      #Ok : BTCMinter.RetrieveBtcOk;
      #Err : BTCMinter.RetrieveBtcError;
    };
    retrieve_btc_with_approval : shared BTCMinter.RetrieveBtcWithApprovalArgs -> async {
      #Ok : BTCMinter.RetrieveBtcOk;
      #Err : BTCMinter.RetrieveBtcWithApprovalError;
    };
    retrieve_btc_status : shared query { block_index : Nat64 } -> async BTCMinter.RetrieveBtcStatus;
    retrieve_btc_status_v2_by_account : shared query ?BTCMinter.Account -> async [{
      block_index : Nat64;
      status_v2 : ?BTCMinter.RetrieveBtcStatusV2;
    }];
    estimate_withdrawal_fee : shared query { amount : ?Nat64 } -> async {
      minter_fee : Nat64;
      bitcoin_fee : Nat64;
    };
    get_minter_info : shared query () -> async BTCMinter.MinterInfo;
    get_known_utxos : shared query { owner : ?Principal; subaccount : ?Blob } -> async [BTCMinter.Utxo];
  };

  let ethMinter = actor ("sv3dd-oaaaa-aaaar-qacoa-cai") : actor {
    withdraw_erc20 : shared ETHMinter.WithdrawErc20Arg -> async {
      #Ok : ETHMinter.RetrieveErc20Request;
      #Err : ETHMinter.WithdrawErc20Error;
    };
  };
  let ckBTCckUSDCPair = actor ("vg3po-ix777-77774-qaafa-cai") : actor {
    swap : shared (CKBTCCKUSDC.SwapArgs) -> async CKBTCCKUSDC.Result_9;
    getExchangeRate : shared query () -> async CKBTCCKUSDC.Result_10;
  };
  let ckUSDCLedger = actor ("umunu-kh777-77774-qaaca-cai") : actor {
    icrc1_transfer : shared CKUSDCLedger.TransferArg -> async CKUSDCLedger.Result;
    icrc1_balance_of : shared query CKUSDCLedger.Account -> async Nat;
  };
  let ckBTCLedger = actor ("vt46d-j7777-77774-qaagq-cai") : actor {
    icrc1_transfer : shared CKBTCLedger.TransferArg -> async CKBTCLedger.Result;
    icrc1_balance_of : shared query CKBTCLedger.Account -> async Nat;
    icrc1_supported_standards : shared query () -> async [CKBTCLedger.StandardRecord];
    icrc2_approve : shared CKBTCLedger.ApproveArgs -> async CKBTCLedger.Result_2;
    icrc1_fee : shared query () -> async Nat;
    icrc2_allowance : shared query CKBTCLedger.AllowanceArgs -> async CKBTCLedger.Allowance;
  };

  public func getCkBTCBalance(owner : Principal, subaccount : ?Blob) : async Nat {
    let account : CKBTCLedger.Account = {
      owner;
      subaccount;
    };
    await ckBTCLedger.icrc1_balance_of(account);
  };

  public func getBtcAddress(owner : ?Principal, subaccount : ?Blob) : async Text {
    await btcMinter.get_btc_address({ owner; subaccount });
  };

  public func updateBalance(owner : ?Principal, subaccount : ?Blob) : async {
    #Ok : [BTCMinter.UtxoStatus];
    #Err : BTCMinter.UpdateBalanceError;
  } {
    await btcMinter.update_balance({ owner; subaccount });
  };

  public func getWithdrawalAccount() : async BTCMinter.Account {
    await btcMinter.get_withdrawal_account();
  };

  public func retrieveBtc(address : Text, amount : Nat64) : async {
    #Ok : BTCMinter.RetrieveBtcOk;
    #Err : BTCMinter.RetrieveBtcError;
  } {
    await btcMinter.retrieve_btc({ address; amount });
  };

  public func retrieveBtcWithApproval(from_subaccount : ?Blob, address : Text, amount : Nat64) : async {
    #Ok : BTCMinter.RetrieveBtcOk;
    #Err : BTCMinter.RetrieveBtcWithApprovalError;
  } {
    await btcMinter.retrieve_btc_with_approval({
      from_subaccount;
      address;
      amount;
    });
  };

  public func retrieveBtcStatus(block_index : Nat64) : async BTCMinter.RetrieveBtcStatus {
    await btcMinter.retrieve_btc_status({ block_index });
  };

  public func retrieveBtcStatusV2ByAccount(account : ?BTCMinter.Account) : async [{
    block_index : Nat64;
    status_v2 : ?BTCMinter.RetrieveBtcStatusV2;
  }] {
    await btcMinter.retrieve_btc_status_v2_by_account(account);
  };

  public func estimateWithdrawalFee(amount : ?Nat64) : async {
    minter_fee : Nat64;
    bitcoin_fee : Nat64;
  } {
    await btcMinter.estimate_withdrawal_fee({ amount });
  };

  public func getMinterInfo() : async BTCMinter.MinterInfo {
    await btcMinter.get_minter_info();
  };

  public func getKnownUtxos(owner : ?Principal, subaccount : ?Blob) : async [BTCMinter.Utxo] {
    await btcMinter.get_known_utxos({ owner; subaccount });
  };

  public func withdrawERC20(address : Text, amount : Nat64) : async {
    #Ok : ETHMinter.RetrieveErc20Request;
    #Err : ETHMinter.WithdrawErc20Error;
  } {
    await ethMinter.withdraw_erc20({
      // TODO: Check if the address is valid
      recipient = address;
      amount = Nat64.toNat(amount);
      ckerc20_ledger_id = Principal.fromActor(ckUSDCLedger);
    });
  };

  public shared (msg) func approveSwap(amount : Nat64) : async {
    #Ok : Nat;
    #Err : Text;
  } {
    try {
      let caller = msg.caller;

      // Check ICRC-2 support
      let supported = await ckBTCLedger.icrc1_supported_standards();
      let supportsICRC2 = Array.find(supported, func(s : { name : Text; url : Text }) : Bool { s.name == "ICRC-2" });
      if (supportsICRC2 == null) {
        return #Err("ICRC-2 not supported");
      };

      // Check balance
      let balance = await ckBTCLedger.icrc1_balance_of({
        owner = caller;
        subaccount = null;
      });
      if (balance < Nat64.toNat(amount)) {
        return #Err("Insufficient balance for caller: " # Principal.toText(caller) # ". Balance: " # debug_show (balance) # ", Required: " # debug_show (Nat64.toNat(amount)));
      };

      // Get fee
      let fee = await ckBTCLedger.icrc1_fee();

      // Check existing allowance
      let allowance = await ckBTCLedger.icrc2_allowance({
        account = { owner = caller; subaccount = null };
        spender = {
          owner = Principal.fromActor(ckBTCckUSDCPair);
          subaccount = null;
        };
      });

      let approveArgs : CKBTCLedger.ApproveArgs = {
        fee = ?fee;
        memo = null;
        from_subaccount = null;
        created_at_time = null;
        amount = Nat64.toNat(amount);
        expected_allowance = ?allowance.allowance; // Use existing allowance
        expires_at = null;
        spender = {
          owner = Principal.fromActor(ckBTCckUSDCPair);
          subaccount = null;
        };
      };

      let approveResult = await ckBTCLedger.icrc2_approve(approveArgs);

      switch (approveResult) {
        case (#Ok(blockIndex)) {
          #Ok(blockIndex);
        };
        case (#Err(e)) {
          Debug.print("Approval error: " # debug_show (e));
          #Err("Failed to approve ICPSwap: " # debug_show (e));
        };
      };
    } catch (e) {
      #Err("Unexpected error in approve: " # Error.message(e));
    };
  };

  public func executeSwap(amount : Nat64, minAmountOut : Nat64) : async {
    #Ok : Nat;
    #Err : Text;
  } {
    try {
      let swapArgs : CKBTCCKUSDC.SwapArgs = {
        amountIn = Nat64.toText(amount);
        zeroForOne = true;
        amountOutMinimum = Nat64.toText(minAmountOut);
      };

      let swapResult = await ckBTCckUSDCPair.swap(swapArgs);
      switch (swapResult) {
        case (#ok(amountOut)) {
          #Ok(amountOut);
        };
        case (#err(e)) {
          #Err("Swap failed: " # debug_show (e));
        };
      };
    } catch (e) {
      #Err("Unexpected error in swap: " # Error.message(e));
    };
  };

  public func transferUSDC(recipient : Principal, amount : Nat) : async {
    #Ok : Nat;
    #Err : Text;
  } {
    try {
      let transferArgs : CKUSDCLedger.TransferArg = {
        to = {
          owner = recipient;
          subaccount = null;
        };
        fee = null;
        memo = null;
        from_subaccount = null;
        created_at_time = null;
        amount = amount;
      };

      let transferResult = await ckUSDCLedger.icrc1_transfer(transferArgs);
      switch (transferResult) {
        case (#Ok(blockIndex)) {
          #Ok(blockIndex);
        };
        case (#Err(e)) {
          #Err("Failed to transfer ckUSDC: " # debug_show (e));
        };
      };
    } catch (e) {
      #Err("Unexpected error in transfer: " # Error.message(e));
    };
  };

  public func borrowWithSwap(
    amount : Nat64,
    minAmountOut : Nat64,
    recipient : Principal,
  ) : async {
    #Ok : {
      swapAmount : Nat;
      usdcReceived : Nat;
    };
    #Err : Text;
  } {
    try {
      let approveResult = await approveSwap(amount);
      switch (approveResult) {
        case (#Err(e)) { return #Err(e) };
        case (#Ok(_)) {
          let swapResult = await executeSwap(amount, minAmountOut);
          switch (swapResult) {
            case (#Err(e)) { return #Err(e) };
            case (#Ok(amountOut)) {
              let transferResult = await transferUSDC(recipient, amountOut);
              switch (transferResult) {
                case (#Err(e)) { return #Err(e) };
                case (#Ok(_)) {
                  #Ok({
                    swapAmount = Nat64.toNat(amount);
                    usdcReceived = amountOut;
                  });
                };
              };
            };
          };
        };
      };
    } catch (e) {
      #Err("Unexpected error in borrowWithSwap: " # Error.message(e));
    };
  };

};
