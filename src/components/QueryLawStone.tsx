import type {
    Ask,
    AskClass,
    AskResponse,
    Result,
    Substitution,
    Term,
} from "@okp4/law-stone-schema";
import { QueryModal } from "./Query";

function onQueryResult(data: Record<string, unknown> | undefined) {
    if (!data) return <></>;

    const askResult: AskResponse = data as unknown as AskResponse;

    return (
        <div>
            <div>Result from rules evaluation: </div>
            {askResult.answer?.success ? (
                <div>
                    {askResult.answer.results.map(
                        ({ substitutions }: Result, resIndex: number) => (
                            <div key={`results-${resIndex}`}>
                                {substitutions.map(
                                    (
                                        substitution: Substitution,
                                        subIndex: number,
                                    ) => {
                                        const { term }: { term: Term } =
                                            substitution;
                                        return (
                                            <div
                                                key={`substitutions-${subIndex}`}
                                            >
                                                {term.name} can vote
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        ),
                    )}
                </div>
            ) : (
                <div>Result from rules evaluation: no one can vote</div>
            )}
        </div>
    );
}

export function QueryLawStone({
    contractAddress,
}: {
    contractAddress: string;
}) {
    const askQuery: string = "can_vote(X).";
    const ask: AskClass = { query: askQuery };
    const query: Ask = { ask };

    return (
        <QueryModal
            contractAddress={contractAddress}
            onQueryResult={onQueryResult}
            query={query}
            textButton={"Result from query data"}
        ></QueryModal>
    );
}
