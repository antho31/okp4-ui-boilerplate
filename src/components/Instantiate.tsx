import type {
    InstantiateContractMutationArgs} from "graz";
import {
    useAccount,
    useCosmWasmSigningClient,
    useInstantiateContract,
} from "graz";
import type {
    InstantiateOptions,
    InstantiateResult,
    SigningCosmWasmClient,
} from "graz/dist/cosmjs";

type InstatiateProps = {
    codeId: number;
    instantiateArgs: {
        label: string;
        msg: Record<string, unknown>;
        options: InstantiateOptions | undefined;
    };
    textButton: string;
};

export function Instantiate({
    codeId,
    instantiateArgs,
    textButton,
}: InstatiateProps) {
    const { isConnected }: { isConnected: boolean } = useAccount();

    const { data: signingClient }: { data: SigningCosmWasmClient | undefined } =
        useCosmWasmSigningClient();

    const { instantiateContract } = useInstantiateContract({
        codeId,
        onError: (
            error: unknown,
            data: InstantiateContractMutationArgs<Record<string, unknown>>,
        ): void => console.error("instantiate error", { error, data }),
        onSuccess: (data: InstantiateResult) => {
            const {
                contractAddress,
                events,
                logs,
                gasUsed,
                height,
                transactionHash,
            } = data;
            console.log(
                `New instance (code id = ${codeId}): ${contractAddress}`,
                {
                    transactionHash,
                    events,
                    logs,
                    gasUsed,
                    height,
                },
            );
        },
    });

    return (
        <div>
            {isConnected ? (
                <button
                    onClick={() =>
                        instantiateContract({
                            signingClient,
                            ...instantiateArgs,
                        })
                    }
                >
                    {textButton}
                </button>
            ) : (
                <span>Please connect to instantiate</span>
            )}
        </div>
    );
}
