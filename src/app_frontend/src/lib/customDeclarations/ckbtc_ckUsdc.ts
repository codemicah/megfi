import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AccountBalance { 'balance0' : bigint, 'balance1' : bigint }
export interface ClaimArgs { 'positionId' : bigint }
export interface CycleInfo { 'balance' : bigint, 'available' : bigint }
export interface DecreaseLiquidityArgs {
  'liquidity' : string,
  'positionId' : bigint,
}
export interface DepositAndMintArgs {
  'tickUpper' : bigint,
  'fee0' : bigint,
  'fee1' : bigint,
  'amount0' : bigint,
  'amount1' : bigint,
  'positionOwner' : Principal,
  'amount0Desired' : string,
  'amount1Desired' : string,
  'tickLower' : bigint,
}
export interface DepositArgs {
  'fee' : bigint,
  'token' : string,
  'amount' : bigint,
}
export type Error = { 'CommonError' : null } |
  { 'InternalError' : string } |
  { 'UnsupportedToken' : string } |
  { 'InsufficientFunds' : null };
export interface GetPositionArgs { 'tickUpper' : bigint, 'tickLower' : bigint }
export interface IncreaseLiquidityArgs {
  'positionId' : bigint,
  'amount0Desired' : string,
  'amount1Desired' : string,
}
export interface MintArgs {
  'fee' : bigint,
  'tickUpper' : bigint,
  'token0' : string,
  'token1' : string,
  'amount0Desired' : string,
  'amount1Desired' : string,
  'tickLower' : bigint,
}
export interface Page {
  'content' : Array<UserPositionInfoWithId>,
  'offset' : bigint,
  'limit' : bigint,
  'totalElements' : bigint,
}
export interface Page_1 {
  'content' : Array<UserPositionInfoWithTokenAmount>,
  'offset' : bigint,
  'limit' : bigint,
  'totalElements' : bigint,
}
export interface Page_2 {
  'content' : Array<TickInfoWithId>,
  'offset' : bigint,
  'limit' : bigint,
  'totalElements' : bigint,
}
export interface Page_3 {
  'content' : Array<TickLiquidityInfo>,
  'offset' : bigint,
  'limit' : bigint,
  'totalElements' : bigint,
}
export interface Page_4 {
  'content' : Array<PositionInfoWithId>,
  'offset' : bigint,
  'limit' : bigint,
  'totalElements' : bigint,
}
export interface Page_5 {
  'content' : Array<[Principal, AccountBalance]>,
  'offset' : bigint,
  'limit' : bigint,
  'totalElements' : bigint,
}
export interface PoolMetadata {
  'fee' : bigint,
  'key' : string,
  'sqrtPriceX96' : bigint,
  'tick' : bigint,
  'liquidity' : bigint,
  'token0' : Token,
  'token1' : Token,
  'maxLiquidityPerTick' : bigint,
  'nextPositionId' : bigint,
}
export interface PositionInfo {
  'tokensOwed0' : bigint,
  'tokensOwed1' : bigint,
  'feeGrowthInside1LastX128' : bigint,
  'liquidity' : bigint,
  'feeGrowthInside0LastX128' : bigint,
}
export interface PositionInfoWithId {
  'id' : string,
  'tokensOwed0' : bigint,
  'tokensOwed1' : bigint,
  'feeGrowthInside1LastX128' : bigint,
  'liquidity' : bigint,
  'feeGrowthInside0LastX128' : bigint,
}
export interface PushError { 'time' : bigint, 'message' : string }
export type Result = { 'ok' : string } |
  { 'err' : Error };
export type Result_10 = { 'ok' : boolean } |
  { 'err' : Error };
export type Result_11 = { 'ok' : bigint } |
  { 'err' : Error };
export type Result_12 = {
    'ok' : { 'tokensOwed0' : bigint, 'tokensOwed1' : bigint }
  } |
  { 'err' : Error };
export type Result_13 = { 'ok' : PoolMetadata } |
  { 'err' : Error };
export type Result_14 = { 'ok' : Array<[bigint, WithdrawErrorLog]> } |
  { 'err' : Error };
export type Result_15 = {
    'ok' : { 'balance0' : bigint, 'balance1' : bigint }
  } |
  { 'err' : Error };
export type Result_16 = { 'ok' : Array<UserPositionInfoWithId> } |
  { 'err' : Error };
export type Result_17 = { 'ok' : Page } |
  { 'err' : Error };
export type Result_18 = { 'ok' : Page_1 } |
  { 'err' : Error };
export type Result_19 = { 'ok' : Array<bigint> } |
  { 'err' : Error };
export type Result_20 = { 'ok' : Array<[string, Array<bigint>]> } |
  { 'err' : Error };
export type Result_21 = { 'ok' : UserPositionInfo } |
  { 'err' : Error };
export type Result_22 = { 'ok' : Array<TransferLog> } |
  { 'err' : Error };
export type Result_23 = {
    'ok' : {
      'swapFee0Repurchase' : bigint,
      'token0Amount' : bigint,
      'swapFeeReceiver' : string,
      'token1Amount' : bigint,
      'swapFee1Repurchase' : bigint,
    }
  } |
  { 'err' : Error };
export type Result_24 = { 'ok' : Page_2 } |
  { 'err' : Error };
export type Result_25 = { 'ok' : Page_3 } |
  { 'err' : Error };
export type Result_26 = {
    'ok' : {
      'infoCid' : string,
      'records' : Array<SwapRecordInfo>,
      'errors' : Array<PushError>,
      'retryCount' : bigint,
    }
  } |
  { 'err' : Error };
export type Result_27 = { 'ok' : Page_4 } |
  { 'err' : Error };
export type Result_28 = { 'ok' : PositionInfo } |
  { 'err' : Error };
export type Result_29 = { 'ok' : { 'amount0' : bigint, 'amount1' : bigint } } |
  { 'err' : Error };
export type Result_30 = {
    'ok' : {
      'tokenIncome' : Array<
        [bigint, { 'tokensOwed0' : bigint, 'tokensOwed1' : bigint }]
      >,
      'totalTokensOwed0' : bigint,
      'totalTokensOwed1' : bigint,
    }
  } |
  { 'err' : Error };
export type Result_31 = { 'ok' : Page_5 } |
  { 'err' : Error };
export type Result_8 = { 'ok' : CycleInfo } |
  { 'err' : Error };
export type Result_9 = { 'ok' : bigint } |
  { 'err' : Error };
export interface SwapArgs {
  'amountIn' : string,
  'zeroForOne' : boolean,
  'amountOutMinimum' : string,
}
export interface SwapRecordInfo {
  'to' : string,
  'feeAmount' : bigint,
  'action' : TransactionType,
  'feeAmountTotal' : bigint,
  'token0Id' : string,
  'token1Id' : string,
  'token0AmountTotal' : bigint,
  'liquidityTotal' : bigint,
  'from' : string,
  'tick' : bigint,
  'feeTire' : bigint,
  'recipient' : string,
  'token0ChangeAmount' : bigint,
  'token1AmountTotal' : bigint,
  'liquidityChange' : bigint,
  'token1Standard' : string,
  'TVLToken0' : bigint,
  'TVLToken1' : bigint,
  'token0Fee' : bigint,
  'token1Fee' : bigint,
  'timestamp' : bigint,
  'token1ChangeAmount' : bigint,
  'token0Standard' : string,
  'price' : bigint,
  'poolId' : string,
}
export interface TickInfoWithId {
  'id' : string,
  'initialized' : boolean,
  'feeGrowthOutside1X128' : bigint,
  'secondsPerLiquidityOutsideX128' : bigint,
  'liquidityNet' : bigint,
  'secondsOutside' : bigint,
  'liquidityGross' : bigint,
  'feeGrowthOutside0X128' : bigint,
  'tickCumulativeOutside' : bigint,
}
export interface TickLiquidityInfo {
  'tickIndex' : bigint,
  'price0Decimal' : bigint,
  'liquidityNet' : bigint,
  'price0' : bigint,
  'price1' : bigint,
  'liquidityGross' : bigint,
  'price1Decimal' : bigint,
}
export interface Token { 'address' : string, 'standard' : string }
export type TransactionType = { 'decreaseLiquidity' : null } |
  { 'claim' : null } |
  { 'swap' : null } |
  { 'addLiquidity' : null } |
  { 'increaseLiquidity' : null };
export interface TransferLog {
  'to' : Principal,
  'fee' : bigint,
  'result' : string,
  'token' : Token,
  'action' : string,
  'daysFrom19700101' : bigint,
  'owner' : Principal,
  'from' : Principal,
  'fromSubaccount' : [] | [Uint8Array | number[]],
  'timestamp' : bigint,
  'index' : bigint,
  'amount' : bigint,
  'errorMsg' : string,
}
export interface UserPositionInfo {
  'tickUpper' : bigint,
  'tokensOwed0' : bigint,
  'tokensOwed1' : bigint,
  'feeGrowthInside1LastX128' : bigint,
  'liquidity' : bigint,
  'feeGrowthInside0LastX128' : bigint,
  'tickLower' : bigint,
}
export interface UserPositionInfoWithId {
  'id' : bigint,
  'tickUpper' : bigint,
  'tokensOwed0' : bigint,
  'tokensOwed1' : bigint,
  'feeGrowthInside1LastX128' : bigint,
  'liquidity' : bigint,
  'feeGrowthInside0LastX128' : bigint,
  'tickLower' : bigint,
}
export interface UserPositionInfoWithTokenAmount {
  'id' : bigint,
  'tickUpper' : bigint,
  'tokensOwed0' : bigint,
  'tokensOwed1' : bigint,
  'feeGrowthInside1LastX128' : bigint,
  'liquidity' : bigint,
  'feeGrowthInside0LastX128' : bigint,
  'token0Amount' : bigint,
  'token1Amount' : bigint,
  'tickLower' : bigint,
}
export type Value = { 'Int' : bigint } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string };
export interface WithdrawArgs {
  'fee' : bigint,
  'token' : string,
  'amount' : bigint,
}
export interface WithdrawErrorLog {
  'token' : Token,
  'time' : bigint,
  'user' : Principal,
  'amount' : bigint,
}
export interface _SERVICE {
  'allTokenBalance' : ActorMethod<[bigint, bigint], Result_31>,
  'approvePosition' : ActorMethod<[Principal, bigint], Result_10>,
  'batchRefreshIncome' : ActorMethod<[Array<bigint>], Result_30>,
  'checkOwnerOfUserPosition' : ActorMethod<[Principal, bigint], Result_10>,
  'claim' : ActorMethod<[ClaimArgs], Result_29>,
  'decreaseLiquidity' : ActorMethod<[DecreaseLiquidityArgs], Result_29>,
  'deposit' : ActorMethod<[DepositArgs], Result_9>,
  'depositAllAndMint' : ActorMethod<[DepositAndMintArgs], Result_9>,
  'depositFrom' : ActorMethod<[DepositArgs], Result_9>,
  'getAdmins' : ActorMethod<[], Array<Principal>>,
  'getAvailabilityState' : ActorMethod<
    [],
    { 'whiteList' : Array<Principal>, 'available' : boolean }
  >,
  'getClaimLog' : ActorMethod<[], Array<string>>,
  'getCycleInfo' : ActorMethod<[], Result_8>,
  'getMistransferBalance' : ActorMethod<[Token], Result_9>,
  'getPosition' : ActorMethod<[GetPositionArgs], Result_28>,
  'getPositions' : ActorMethod<[bigint, bigint], Result_27>,
  'getSwapRecordState' : ActorMethod<[], Result_26>,
  'getTickInfos' : ActorMethod<[bigint, bigint], Result_25>,
  'getTicks' : ActorMethod<[bigint, bigint], Result_24>,
  'getTokenAmountState' : ActorMethod<[], Result_23>,
  'getTokenBalance' : ActorMethod<[], { 'token0' : bigint, 'token1' : bigint }>,
  'getTokenMeta' : ActorMethod<
    [],
    { 'token0' : Array<[string, Value]>, 'token1' : Array<[string, Value]> }
  >,
  'getTransferLogs' : ActorMethod<[], Result_22>,
  'getUserByPositionId' : ActorMethod<[bigint], Result>,
  'getUserPosition' : ActorMethod<[bigint], Result_21>,
  'getUserPositionIds' : ActorMethod<[], Result_20>,
  'getUserPositionIdsByPrincipal' : ActorMethod<[Principal], Result_19>,
  'getUserPositionWithTokenAmount' : ActorMethod<[bigint, bigint], Result_18>,
  'getUserPositions' : ActorMethod<[bigint, bigint], Result_17>,
  'getUserPositionsByPrincipal' : ActorMethod<[Principal], Result_16>,
  'getUserUnusedBalance' : ActorMethod<[Principal], Result_15>,
  'getVersion' : ActorMethod<[], string>,
  'getWithdrawErrorLog' : ActorMethod<[], Result_14>,
  'increaseLiquidity' : ActorMethod<[IncreaseLiquidityArgs], Result_9>,
  'init' : ActorMethod<[bigint, bigint, bigint], undefined>,
  'metadata' : ActorMethod<[], Result_13>,
  'mint' : ActorMethod<[MintArgs], Result_9>,
  'quote' : ActorMethod<[SwapArgs], Result_9>,
  'quoteForAll' : ActorMethod<[SwapArgs], Result_9>,
  'refreshIncome' : ActorMethod<[bigint], Result_12>,
  'removeErrorTransferLog' : ActorMethod<[bigint, boolean], undefined>,
  'removeWithdrawErrorLog' : ActorMethod<[bigint, boolean], undefined>,
  'resetTokenAmountState' : ActorMethod<
    [bigint, bigint, bigint, bigint],
    undefined
  >,
  'setAdmins' : ActorMethod<[Array<Principal>], undefined>,
  'setAvailable' : ActorMethod<[boolean], undefined>,
  'setWhiteList' : ActorMethod<[Array<Principal>], undefined>,
  'sumTick' : ActorMethod<[], Result_11>,
  'swap' : ActorMethod<[SwapArgs], Result_9>,
  'transferPosition' : ActorMethod<[Principal, Principal, bigint], Result_10>,
  'upgradeTokenStandard' : ActorMethod<[Principal], Result>,
  'withdraw' : ActorMethod<[WithdrawArgs], Result_9>,
  'withdrawMistransferBalance' : ActorMethod<[Token], Result_9>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];