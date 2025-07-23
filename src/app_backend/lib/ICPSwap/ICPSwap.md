# ICPSwap Interface Documentation

## Core Pool Methods

### Query Methods
- `metadata()` - Get pool metadata including fees, liquidity, tokens
- `getPosition(args: GetPositionArgs)` - Get position info for given tick range
- `getPositions(offset: Nat, limit: Nat)` - Get paginated list of positions
- `getUserPosition(positionId: Nat)` - Get specific position details
- `getUserPositions(offset: Nat, limit: Nat)` - Get user's positions
- `getTokenBalance()` - Get pool token balances
- `getTokenMeta()` - Get token metadata
- `quote(args: SwapArgs)` - Get quote for swap
- `refreshIncome(positionId: Nat)` - Get updated position income

### Update Methods
- `mint(args: MintArgs)` - Create new position
- `increaseLiquidity(args: IncreaseLiquidityArgs)` - Add liquidity to position
- `decreaseLiquidity(args: DecreaseLiquidityArgs)` - Remove liquidity from position
- `claim(args: ClaimArgs)` - Claim fees from position
- `swap(args: SwapArgs)` - Execute token swap
- `deposit(args: DepositArgs)` - Deposit tokens
- `withdraw(args: WithdrawArgs)` - Withdraw tokens
- `transferPosition(from: Principal, to: Principal, positionId: Nat)` - Transfer position ownership

## Token Management Methods

### Query Methods
- `getUserUnusedBalance(principal: Principal)` - Get unused token balance
- `getWithdrawErrorLog()` - Get withdrawal error logs
- `getTransferLogs()` - Get transfer history
- `getTokenAmountState()` - Get token amount state

### Update Methods
- `approvePosition(principal: Principal, positionId: Nat)` - Approve position transfer
- `setAdmins(admins: [Principal])` - Set admin principals
- `setAvailable(available: Bool)` - Set pool availability
- `setWhiteList(principals: [Principal])` - Set whitelisted users

## Pool State Methods

### Query Methods
- `getTickInfos(offset: Nat, limit: Nat)` - Get tick info
- `getTicks(offset: Nat, limit: Nat)` - Get tick data
- `sumTick()` - Get tick summary
- `getCycleInfo()` - Get cycle balance info
- `getVersion()` - Get pool version

Key features:
- Automated market making
- Position-based liquidity provision
- Fee collection system
- Token deposit/withdrawal
- Transfer and approval system
- Admin controls
