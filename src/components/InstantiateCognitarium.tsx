import { useAccount } from "graz";
import type { InstantiateOptions } from "graz/dist/cosmjs";
import type { Key } from "graz/dist/keplr";
import type { InstantiateMsg, StoreLimitsInput } from "@okp4/cognitarium-schema";
import { Instantiate } from "./Instantiate";

const UINT128_MAX = "340282366920938463463374607431768211455";

export function InstantiateCognitarium({ codeId }: { codeId: number }) {
    const { data: account }: { data: Key | null } = useAccount();

    const label: string = `cogniatarium-frontdemo-${new Date().valueOf()}`;

    const limits: StoreLimitsInput = {
        max_byte_size: UINT128_MAX,
        max_insert_data_byte_size: UINT128_MAX,
        max_insert_data_triple_count: UINT128_MAX,
        max_query_limit: 30,
        max_query_variable_count: 30,
        max_triple_byte_size: UINT128_MAX,
        max_triple_count: UINT128_MAX,
    };

    const msg: InstantiateMsg = {
        limits,
    };

    const options: InstantiateOptions = {
        memo: "cognitarium instantiation from the frontdemo",
        admin: account?.bech32Address,
    };

    return (
        <Instantiate
            codeId={codeId}
            instantiateArgs={{
                label,
                msg,
                options,
            }}
            textButton="Instantiate a contract (create database)"
        />
    );
}
