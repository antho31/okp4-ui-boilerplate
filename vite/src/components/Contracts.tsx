import { useEffect, useState } from "react";

import { useAccount, useCosmWasmClient } from "graz";
import { Contract, CosmWasmClient } from "graz/dist/cosmjs";
import { Key } from "graz/dist/keplr";

import { ExecuteCognitarium } from "./ExecuteCognitarium";

import { COGNITARIUM_CODE_ID } from "../constants";

export function Contracts({ codeId }: { codeId: number }) {
    const {
        data: account,
        isLoading,
    }: { data: Key | null; isLoading: boolean } = useAccount();
    const {
        data: client,
        isFetching,
    }: { data: CosmWasmClient | unknown; isFetching: boolean } =
        useCosmWasmClient();

    const [contracts, setContracts] = useState<Contract[]>([]);
    const [userContracts, setUserContracts] = useState<Contract[]>([]);

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: {
        target: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
        setIsChecked(event.target.checked);
    };

    useEffect(() => {
        if (!client) return;

        const cosmWasmClient: CosmWasmClient = client as CosmWasmClient;

        const getContracts = async () => {
            const contractAddrs: readonly string[] =
                await cosmWasmClient.getContracts(codeId);
            const newContracts: Contract[] = [];
            for (const contractAddr of contractAddrs) {
                const contract: Contract = await cosmWasmClient.getContract(
                    contractAddr
                );
                newContracts.push(contract);
            }
            setContracts(newContracts);
        };

        getContracts();
    }, [client, codeId]);

    useEffect(() => {
        if (!account) return;
        const userContracts: Contract[] = contracts.filter(
            ({ creator }) => creator === account.bech32Address
        );
        setUserContracts(userContracts);
    }, [contracts, account]);

    return (
        <>
            {!client ? (
                <div>Connect your wallet to get all contracts</div>
            ) : isLoading ? (
                <div>Loading wallet account...</div>
            ) : isFetching ? (
                <div>Fetching contracts...</div>
            ) : (
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        Only contracts I created
                    </label>

                    <div className="table-responsive">
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>Address</th>
                                    <th>Creator</th>
                                    <th>Execute</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(isChecked ? userContracts : contracts).map(
                                    (row: Contract) => (
                                        <tr key={row.address}>
                                            <td>{row.address}</td>
                                            <td>{row.creator}</td>
                                            <td>
                                                {codeId ===
                                                    COGNITARIUM_CODE_ID &&
                                                row.creator ===
                                                    account?.bech32Address ? (
                                                    <ExecuteCognitarium
                                                        contractAddress={
                                                            row.address
                                                        }
                                                    />
                                                ) : (
                                                    <span>
                                                        {" "}
                                                        (No available execution)
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
