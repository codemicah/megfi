# ckBTC Interface Documentation

## Archive Canister Methods

### Query Methods
- `get_blocks(start: Nat, length: Nat)` - Get blocks within specified range
- `get_transaction(id: Nat64)` - Get transaction by ID
- `get_transactions(start: Nat, length: Nat)` - Get transactions within range
- `icrc3_get_archives()` - Get archive canister info
- `remaining_capacity()` - Get remaining storage capacity

### Update Methods
- `append_blocks(blocks: [Blob])` - Append new blocks

## Indexer Canister Methods

### Query Methods
- `get_account_transactions(args: GetAccountTransactionsArgs)` - Get transactions for account
- `get_blocks(request: GetBlocksRequest)` - Get blocks within range
- `get_fee_collectors_ranges()` - Get fee collector ranges
- `icrc1_balance_of(account: Account)` - Get account balance
- `list_subaccounts(args: ListSubaccountsArgs)` - List subaccounts for owner
- `status()` - Get indexer sync status

## KYT Canister Methods

### Query Methods
- `txid_to_bytes(txid: Text)` - Convert transaction ID to bytes

### Update Methods
- `fetch_utxo_alerts(request: DepositRequest)` - Get alerts for UTXO
- `fetch_withdrawal_alerts(attempt: WithdrawalAttempt)` - Get alerts for withdrawal
- `set_api_key(arg: SetApiKeyArg)` - Set API key

## Ledger Canister Methods

### Query Methods
- `icrc1_balance_of(account: Account)` - Get account balance
- `icrc1_decimals()` - Get token decimals
- `icrc1_metadata()` - Get token metadata
- `icrc1_name()` - Get token name
- `icrc1_symbol()` - Get token symbol
- `icrc1_total_supply()` - Get total supply
- `icrc2_allowance(args: AllowanceArgs)` - Get allowance

### Update Methods
- `icrc1_transfer(arg: TransferArg)` - Transfer tokens
- `icrc2_approve(args: ApproveArgs)` - Approve allowance
- `icrc2_transfer_from(args: TransferFromArgs)` - Transfer from approved account

## Minter Canister Methods

### Query Methods
- `get_btc_address(owner: ?Principal, subaccount: ?Blob)` - Get BTC address
- `get_deposit_fee()` - Get deposit fee
- `get_minter_info()` - Get minter configuration
- `get_withdrawal_account()` - Get withdrawal account
- `retrieve_btc_status(block_index: Nat64)` - Get BTC retrieval status

### Update Methods
- `retrieve_btc(args: RetrieveBtcArgs)` - Retrieve BTC
- `retrieve_btc_with_approval(args: RetrieveBtcWithApprovalArgs)` - Retrieve BTC with approval
- `update_balance(owner: ?Principal, subaccount: ?Blob)` - Update balance

Key Features:
- ICRC-1 token standard compliance
- Bitcoin address generation and management
- KYT (Know Your Transaction) integration
- Transaction archiving and indexing
- Allowance and approval system
- BTC deposit and withdrawal functionality
- Fee collection and management
- Transaction history tracking
- Multi-signature support
- Subaccount management
