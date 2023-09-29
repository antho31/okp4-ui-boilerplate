import type { ReactElement} from "react";
import { useEffect, useState } from "react";
import { useQuerySmart } from "graz";
import Modal from "../ui/Modal";

type QueryProps = {
    contractAddress: string;
    query: Record<string, unknown>;
    onQueryResult: (data?: Record<string, unknown>) => ReactElement;
    textButton: string;
};

export function QueryModal({
    contractAddress,
    query,
    onQueryResult,
    textButton,
}: QueryProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => setShowModal(true)}>{textButton}</button>

            <Modal setShowModal={setShowModal} showModal={showModal}>
                <Query
                    contractAddress={contractAddress}
                    onQueryResult={onQueryResult}
                    query={query}
                    textButton={"Result from query data"}
                ></Query>
            </Modal>
        </div>
    );
}

export function Query({ contractAddress, query, onQueryResult }: QueryProps) {
    const { data, isLoading } = useQuerySmart<Record<string, unknown>, boolean>(
        contractAddress,
        query,
    );

    useEffect(() => {
        console.log(`Result from smart query on ${contractAddress}`, {
            query,
            response: data,
        });
    }, [data, query, contractAddress]);

    return (
        <div>
            {isLoading || !data ? <span>Loading...</span> : onQueryResult(data)}
        </div>
    );
}
