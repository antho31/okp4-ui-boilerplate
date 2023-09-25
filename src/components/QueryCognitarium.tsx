import {
    PurpleTriplePattern,
    PurpleVarOrNode,
    PurpleVarOrNodeOrLiteral,
    QueryPrefix,
    QueryWhere,
    Select,
    SelectClass,
    SelectItem,
    SelectQuery,
    SelectResponse,
    Value,
} from "@okp4/cognitarium-schema";
import { QueryModal } from "./Query";

function onQueryResult(data?: Record<string, unknown>) {
    if (!data) return <></>;

    const selectResult: SelectResponse = data as unknown as SelectResponse;

    return (
        <div>
            {selectResult?.results?.bindings.length ? (
                selectResult?.results?.bindings.map(
                    (res: Record<string, Value>, index: number) => {
                        return (
                            <div key={index}>
                                <pre style={{ textAlign: "left" }}>
                                    {JSON.stringify(res, undefined, 50)}
                                </pre>
                            </div>
                        );
                    },
                )
            ) : (
                <></>
            )}
        </div>
    );
}

export function QueryCognitarium({
    contractAddress,
}: {
    contractAddress: string;
}) {
    const prefixes: QueryPrefix[] = [
        {
            namespace: "https://ontology.okp4.space/core/",
            prefix: "core",
        },
    ];

    const selectItems: SelectItem[] = [
        {
            variable: "subjectVar",
        },
        {
            variable: "predicateVar",
        },

        {
            variable: "objectVar",
        },
    ];

    const subjectFilter: PurpleVarOrNode = {
        variable: "subjectVar",
    };
    const predicateFilter: PurpleVarOrNode = {
        variable: "predicateVar",
    };
    const objectFilter: PurpleVarOrNodeOrLiteral = {
        variable: "objectVar",
    };
    const triplePatternFilter: PurpleTriplePattern = {
        subject: subjectFilter,
        predicate: predicateFilter,
        object: objectFilter,
    };

    const where: QueryWhere[] = [
        {
            simple: {
                triple_pattern: triplePatternFilter,
            },
        },
    ];

    const limit: number = 2;

    const selectQuery: SelectQuery = {
        prefixes,
        select: selectItems,
        where,
        limit,
    };
    const select: SelectClass = {
        query: selectQuery,
    };
    const query: Select = {
        select,
    };

    return (
        <QueryModal
            contractAddress={contractAddress}
            query={query}
            onQueryResult={onQueryResult}
            textButton={"Result from query data"}
        ></QueryModal>
    );
}
