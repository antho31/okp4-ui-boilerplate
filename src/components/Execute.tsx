import {
    ExecuteContractMutationArgs,
    useAccount,
    useCosmWasmSigningClient,
    useExecuteContract,
} from "graz";
import { ExecuteResult, SigningCosmWasmClient } from "graz/dist/cosmjs";

type ExecuteProps = {
    contractAddress: string;
    executeArgs: {
        msg: Record<string, unknown>;
        memo: string | undefined;
    };
    textButton: string;
};

export function Execute({
    contractAddress,
    executeArgs,
    textButton,
}: ExecuteProps) {
    const { isConnected }: { isConnected: boolean } = useAccount();

    const { data: signingClient }: { data: SigningCosmWasmClient | undefined } =
        useCosmWasmSigningClient();

    const { executeContract } = useExecuteContract({
        contractAddress,

        onError: (
            error: unknown,
            data: ExecuteContractMutationArgs<Record<string, unknown>>,
        ): void => console.error("execute error", { error, data }),

        onSuccess: (data: ExecuteResult) => {
            const {
                logs,
                height,
                transactionHash,
                events,
                gasWanted,
                gasUsed,
            } = data;
            console.log(`Execution on ${contractAddress} OK`, {
                logs,
                height,
                transactionHash,
                events,
                gasWanted,
                gasUsed,
            });
        },
    });

    return (
        <div>
            {isConnected ? (
                <button
                    onClick={() =>
                        executeContract({
                            signingClient,
                            ...executeArgs,
                        })
                    }
                >
                    {textButton}
                </button>
            ) : (
                <span>Please connect to execute</span>
            )}
        </div>
    );
}
