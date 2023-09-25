import { useAccount } from "graz";
import { InstantiateOptions } from "graz/dist/cosmjs";
import { Key } from "graz/dist/keplr";
import { InstantiateMsg, StoreLimitsInput } from "@okp4/cognitarium-schema";
import { Instantiate } from "./Instantiate";

export function InstantiateCognitarium({ codeId }: { codeId: number }) {
    const { data: account }: { data: Key | null } = useAccount();

    const label: string = `cogniatarium-frontdemo-${new Date().valueOf()}`;

    const limits: StoreLimitsInput = {
        max_byte_size: "340282366920938463463374607431768211455",
        max_insert_data_byte_size: "340282366920938463463374607431768211455",
        max_insert_data_triple_count: "340282366920938463463374607431768211455",
        max_query_limit: 30,
        max_query_variable_count: 30,
        max_triple_byte_size: "340282366920938463463374607431768211455",
        max_triple_count: "340282366920938463463374607431768211455",
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
