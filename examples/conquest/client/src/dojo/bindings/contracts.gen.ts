
// Generated by dojo-bindgen on Fri, 4 Oct 2024 13:23:58 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript` 
import { Account, byteArray } from "starknet";
import { DojoProvider } from "@dojoengine/core";
import * as models from "./models.gen";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export interface Signup {
    account: Account;
    name: string;
}

export interface Conquest {
    account: Account;
}

export interface Verify {
    account: Account;
    quest: number;
    tile_ids: number[];
}

export interface ConquestVerify {
    account: Account;
    owned_tile_ids: number[];
    consecutive_tile_ids: number[];
}

export async function setupWorld(provider: DojoProvider) {
    // System definitions for `conquest-Actions` contract
    function Actions() {
        const contract_name = "Actions";

        
        // Call the `world` system with the specified Account and calldata
        const world = async (props: { account: Account }) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "world",
                        calldata: [],
                    },
                    "conquest"
                );
            } catch (error) {
                console.error("Error executing world:", error);
                throw error;
            }
        };
            

    
        // Call the `signup` system with the specified Account and calldata
        const signup = async (props: Signup) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "signup",
                        calldata: [props.name],
                    },
                    "conquest"
                );
            } catch (error) {
                console.error("Error executing signup:", error);
                throw error;
            }
        };
            

    
        // Call the `conquest` system with the specified Account and calldata
        const conquest = async (props: Conquest) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "conquest",
                        calldata: [],
                    },
                    "conquest"
                );
            } catch (error) {
                console.error("Error executing conquest:", error);
                throw error;
            }
        };
            

    
        // Call the `verify` system with the specified Account and calldata
        const verify = async (props: Verify) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "verify",
                        calldata: [props.quest,
                            props.tile_ids.length,
                ...props.tile_ids],
                    },
                    "conquest"
                );
            } catch (error) {
                console.error("Error executing verify:", error);
                throw error;
            }
        };

        const conquest_verify = async (props: ConquestVerify) => {
            try {
                return await provider.execute(
                    props.account,
                    [
                        {
                            contractName: contract_name,
                            entrypoint: "conquest",
                            calldata: [],
                        },
                        {
                            contractName: contract_name,
                            entrypoint: "verify",
                            calldata: [
                                1,
                                props.owned_tile_ids.length,
                                ...props.owned_tile_ids
                            ],
                        },
                        {
                            contractName: contract_name,
                            entrypoint: "verify",
                            calldata: [
                                2,
                                props.consecutive_tile_ids.length,
                                ...props.consecutive_tile_ids
                            ],
                        },
                    ],
                    "conquest"
                );
            } catch (error) {
                console.error("Error executing conquest and verify:", error);
                throw error;
            }
        }
            

        return {
            world, signup, conquest, verify, conquest_verify
        };
    }

    return {
        Actions: Actions()
    };
}
