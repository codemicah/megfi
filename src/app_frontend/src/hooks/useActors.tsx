import { useEffect, useState } from 'react';
import { app_backend, idlFactory, canisterId } from "@/../../declarations/app_backend";
import {icrc1_ledger_canister, idlFactory as ckbtcIdlFactory, canisterId as ckbtcCanisterId  } from "@/../../declarations/icrc1_ledger_canister";
import {icp as icpCanister, idlFactory as icpIdlFactory, canisterId as icpCanisterId  } from "@/../../declarations/icp";
import { Actor, HttpAgent } from "@dfinity/agent";
import {idlFactory as ckbtc_ckUsdc_idlFactory, ckbtc_ckusdc as ckbtc_ckUsdc_canister, } from "@/../../declarations/ckbtc_ckusdc"
import {idlFactory as ckusdc_idlFactory, ckusdc as ckusdc_canister, } from "@/../../declarations/ckusdc"
import {idlFactory as ckbtc_icp_idlFactory, ckbtc_icp as ckbtc_icp_canister, } from "@/../../declarations/ckbtc_icp"
import { useAuth } from '@/providers/auth-provider';

export  const HOST = process.env.DFX_NETWORK === "local" ? "http://localhost:4943" : "https://ic0.app";

// Canister IDs
export const CKBTC_CANISTER_ID = "mxzaz-hqaaa-aaaar-qaada-cai";
export const ICP_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
export const MAIN_CANISTER_ID = process.env.CANISTER_ID_APP_BACKEND || "jxvhg-nyaaa-aaaao-qjwha-cai";
export const CKBTC_CKUSDC_CANISTER_ID = "mhecj-xyaaa-aaaag-qjyjq-cai";
export const CKBTC_ICP_CANISTER_ID = "xmiu5-jqaaa-aaaag-qbz7q-cai";
export const CKUSDC_CANISTER_ID = "xevnm-gaaaa-aaaar-qafnq-cai";

// Create agents with local development support
const createAgent = () => {
    const agent = HttpAgent.createSync({ host: HOST });
    if (process.env.DFX_NETWORK === "local") {
        agent.fetchRootKey().catch(console.error);
    }
    return agent;
};

// Actors
export const MAIN_CANISTER : typeof app_backend = Actor.createActor(idlFactory, { agent: createAgent(), canisterId: MAIN_CANISTER_ID });
export const CKBTC_LEDGER : typeof icrc1_ledger_canister = Actor.createActor(ckbtcIdlFactory, { agent: createAgent(), canisterId: CKBTC_CANISTER_ID });
export const CKBTC_CKUSDC : typeof ckbtc_ckUsdc_canister = Actor.createActor(ckbtc_ckUsdc_idlFactory, { agent: createAgent(), canisterId: CKBTC_CKUSDC_CANISTER_ID });
export const CKBTC_ICP : typeof ckbtc_icp_canister = Actor.createActor(ckbtc_ckUsdc_idlFactory, { agent: createAgent(), canisterId: CKBTC_ICP_CANISTER_ID });
export const ICP : typeof icpCanister = Actor.createActor(icpIdlFactory, { agent: createAgent(), canisterId: ICP_CANISTER_ID });
export const CKBTC : typeof icrc1_ledger_canister = Actor.createActor(ckbtc_ckUsdc_idlFactory, { agent: createAgent(), canisterId: CKBTC_CANISTER_ID });
export const CKUSDC : typeof ckusdc_canister = Actor.createActor(ckusdc_idlFactory, { agent: createAgent(), canisterId: CKUSDC_CANISTER_ID });


export const useActors = () => {
    const {identity} = useAuth();
    // actors in state
    const [mainCanister, setMainCanister] = useState<typeof app_backend >(MAIN_CANISTER);
    const [ckbtcLedger, setCkbtcLedger] = useState<typeof icrc1_ledger_canister>(CKBTC_LEDGER);
    const [ckbtc_ckusdc, setCkbtc_ckusdc] = useState<typeof ckbtc_ckUsdc_canister>(CKBTC_CKUSDC);
    const [ckbtc_icp, setCkbtc_icp] = useState<typeof ckbtc_icp_canister| null>(null);
    const [icp, setIcp] = useState<typeof icpCanister>(ICP);
    const [ckbtc, setCkbtc] = useState<typeof icrc1_ledger_canister>(CKBTC);
    const [ckusdc, setCkusdc] = useState<typeof ckusdc_canister>(CKUSDC);

    useEffect(() => {
        if (!identity) return;
        console.log("after return")
        const agent =  HttpAgent.createSync({ host: HOST, identity});
        // For local development, fetch root key
        if (process.env.DFX_NETWORK === "local") {
            agent.fetchRootKey().catch(console.error);
        }
        //new actors
        const _mainCanisterActor : typeof app_backend = Actor.createActor(idlFactory, { agent, canisterId: MAIN_CANISTER_ID });
        const _ckbtcLedgerActor: typeof icrc1_ledger_canister = Actor.createActor(ckbtcIdlFactory, { agent, canisterId: CKBTC_CANISTER_ID });
        const _ckbtc_ckusdc: typeof ckbtc_ckUsdc_canister = Actor.createActor(ckbtc_ckUsdc_idlFactory, { agent, canisterId: CKBTC_CKUSDC_CANISTER_ID });
        const _ckbtc_icp: typeof ckbtc_icp_canister = Actor.createActor(ckbtc_icp_idlFactory, { agent, canisterId: CKBTC_ICP_CANISTER_ID });
        const _icp: typeof icpCanister = Actor.createActor(icpIdlFactory, { agent, canisterId: ICP_CANISTER_ID });
        const _ckusdc: typeof ckusdc_canister = Actor.createActor(ckusdc_idlFactory, { agent, canisterId: CKUSDC_CANISTER_ID });

        // set actors
        setMainCanister(_mainCanisterActor );
        setCkbtcLedger(_ckbtcLedgerActor);
        setCkbtc_ckusdc(_ckbtc_ckusdc);
        setCkbtc_icp(_ckbtc_icp);
        setIcp(_icp);
        setCkusdc(_ckusdc);

    }, [identity]);

    return { mainCanister, ckbtcLedger, ckbtc_ckusdc, ckbtc_icp, icp , ckusdc};
};