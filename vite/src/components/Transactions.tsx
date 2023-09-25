import { useEffect, useState } from "react";
import { useAccount, useTendermintClient } from "graz";
import { Key } from "graz/dist/keplr";
import {
    Block,
    ReadonlyDateWithNanoseconds,
    Tendermint37Client,
    TxData,
    TxResponse,
    TxSearchParams,
    TxSearchResponse,
} from "graz/dist/tendermint";
import { toHex } from "@cosmjs/encoding";
import { DecodedTxRaw, decodeTxRaw } from "@cosmjs/proto-signing";
import { decodeTxMessage } from "../utils";

type DecodedTransaction = {
    decodedTx: DecodedTxRaw;
    decodedMsgs: Array<unknown>;
    hash: string;
    result: TxData;
    time: ReadonlyDateWithNanoseconds;
};

export function Transactions() {
    const { data: account }: { data: Key | null } = useAccount();

    const { data: tendermintClient }: { data: Tendermint37Client | undefined } =
        useTendermintClient("tm37");

    const [transactions, setTransactions] = useState<Array<DecodedTransaction>>(
        [],
    );

    const query: string = account?.bech32Address
        ? `message.sender='${account.bech32Address}'`
        : "";
    // you can also filter by message action, i.e. "message.action='/cosmwasm.wasm.v1.MsgInstantiateContract'";
    // and/or use operators like: "message.sender='okp41cu9wzlcyyxpek20jaqfwzu3llzjgx34cwnv2v5' AND instantiate.code_id=5",

    useEffect(() => {
        async function fetchTxs() {
            if (tendermintClient && query.length) {
                // 1: get all transactions, per batch of 100 elements
                const transactionsFromRequest: TxResponse[] = [];
                let page: number = 1;
                let stop: boolean = false;
                do {
                    try {
                        const searchParams: TxSearchParams = {
                            query,
                            page,
                            per_page: 100,
                            order_by: "desc",
                        };
                        const txSearchRes: TxSearchResponse =
                            await tendermintClient?.txSearch(searchParams);
                        const { txs }: { txs: readonly TxResponse[] } =
                            txSearchRes;
                        transactionsFromRequest.push(...txs);
                        page++;
                    } catch (e) {
                        stop = true;
                    }
                } while (!stop);

                // 2: decode and populate transaction infos
                const decodedTransactions: DecodedTransaction[] =
                    await Promise.all(
                        transactionsFromRequest.map(
                            async (txResponse: TxResponse) => {
                                const {
                                    tx,
                                    hash,
                                    height,
                                    result,
                                }: {
                                    tx: Uint8Array;
                                    hash: Uint8Array;
                                    height: number;
                                    result: TxData;
                                } = txResponse;

                                // Get time from block height
                                const { block }: { block: Block } =
                                    await tendermintClient.block(height);
                                const {
                                    header: { time },
                                }: {
                                    header: {
                                        time: ReadonlyDateWithNanoseconds;
                                    };
                                } = block;

                                const decodedTx: DecodedTxRaw = decodeTxRaw(tx);

                                return {
                                    decodedTx,
                                    decodedMsgs:
                                        decodedTx.body.messages.map(
                                            decodeTxMessage,
                                        ),
                                    hash: toHex(hash).toUpperCase(),
                                    result,
                                    time,
                                };
                            },
                        ),
                    );
                console.log({ query, decodedTransactions });

                setTransactions(decodedTransactions);
            }
        }
        fetchTxs();
    }, [tendermintClient, query]);

    return (
        <div className="table-responsive">
            <table border={1}>
                <thead>
                    <tr>
                        <th>Hashs for the {transactions.length} txs sent</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(({ hash }, i) => (
                        <tr key={i}>
                            <td>
                                <a
                                    href={`https://explore.okp4.network/OKP4%20testnet/tx/${hash}`}
                                >
                                    {hash}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
