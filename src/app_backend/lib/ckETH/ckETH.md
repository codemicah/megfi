# ckETH Interface Documentation

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

## Ledger Canister Methods

### Query Methods
- `icrc1_balance_of(account: Account)` - Get account balance
- `icrc1_decimals()` - Get token decimals
- `icrc1_metadata()` - Get token metadata
- `icrc1_name()` - Get token name
- `icrc1_symbol()` - Get token symbol
- `icrc1_total_supply()` - Get total supply
- `icrc2_allowance(args: AllowanceArgs)` - Get allowance for spender

### Update Methods
- `icrc1_transfer(args: TransferArg)` - Transfer tokens
- `icrc2_approve(args: ApproveArgs)` - Approve spender
- `icrc2_transfer_from(args: TransferFromArgs)` - Transfer tokens as approved spender

## Minter Canister Methods

### Query Methods
- `get_minter_info()` - Get minter configuration
- `is_address_blocked(address: Text)` - Check if address is blocked
- `smart_contract_address()` - Get Ethereum contract address
- `withdrawal_status(param: WithdrawalSearchParameter)` - Get withdrawal status

### Update Methods
- `add_ckerc20_token(token: AddCkErc20Token)` - Add new ERC20 token
- `withdraw_eth(arg: WithdrawalArg)` - Withdraw ETH
- `withdraw_erc20(arg: WithdrawErc20Arg)` - Withdraw ERC20 tokens

## Orchestrator Canister Methods

### Query Methods
- `canister_ids(contract: Erc20Contract)` - Get canister IDs for ERC20 contract
- `get_orchestrator_info()` - Get orchestrator configuration

### Update Methods
- `get_canister_status()` - Get canister status

Key features:
- ICRC-1 token standard compliance
- ERC20 token bridging support  
- ETH withdrawal functionality
- Archive/indexing for transaction history
- Allowance and approval system
