import { useAccount } from "graz";
import { InstantiateOptions } from "graz/dist/cosmjs";
import { Key } from "graz/dist/keplr";

import { InstantiateMsg } from "@okp4/law-stone-schema";

import { Instantiate } from "./Instantiate";

import { encodeForMsgTx } from "../utils";

export function InstantiateLawStone({ codeId }: { codeId: number }) {
    const { data: account }: { data: Key | null } = useAccount();

    const label: string = `lawstone-frontdemo-${new Date().valueOf()}`;

    const prologRules: string = `program_creation_epoch(${
        new Date().valueOf() / 1000
    }).
voter(alice).
voter(bob).

can_vote(X) :- voter(X), block_time(T), program_creation_epoch(C), T > C.
`;

    const msg: InstantiateMsg = {
        program: encodeForMsgTx(prologRules),
        storage_address:
            "okp41lppz4x9dtmccek2m6cezjlwwzup6pdqrkvxjpk95806c3dewgrfq602kgx",
    };

    const options: InstantiateOptions = {
        memo: "law-stone instantiation from the frontdemo",
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
            textButton="Instantiate a contract (store new rules)"
        />
    );
}
