import { configureGraz } from "graz";

import {
    Balance,
    Connection,
    Contracts,
    InstantiateCognitarium,
    InstantiateLawStone,
    QueryCognitarium,
    QueryLawStone,
    Transactions,
} from "./components";
import { Accordion } from "./ui";

import "./App.css";
import Banner from "./assets/okp4-banner-v2.webp";

import {
    COGNITARIUM_CODE_ID,
    LAWSTONE_CODE_ID,
    OKP4TestnetChain,
} from "./constants";

configureGraz({
    defaultChain: OKP4TestnetChain,
});

function App() {
    return (
        <>
            <h1>OKP4 Vite Starter</h1>
            <img className="logo" alt="OKP4 logo" src={Banner} />

            <Connection chainInfo={OKP4TestnetChain} />

            <Accordion title="OKP4 Wallet">
                <Balance />
                <Accordion title="Transactions sent">
                    <Transactions />
                </Accordion>
            </Accordion>

            <Accordion title="Rules (Law-stone smart contracts)">
                <InstantiateLawStone codeId={LAWSTONE_CODE_ID} />
                <QueryLawStone contractAddress="okp41j7f3mcqynl6ux8seaagvn4t09gg9k9wstkqkffu2dnpr3crghhrqdz6cl8" />
                <Accordion title="List of contracts">
                    <Contracts codeId={LAWSTONE_CODE_ID} />
                </Accordion>
            </Accordion>

            <Accordion title="Semantic data (Cognitarium smart contracts)">
                <InstantiateCognitarium codeId={COGNITARIUM_CODE_ID} />
                <QueryCognitarium contractAddress="okp41mnrjmkmv2hx448qq54snt24js43nesk9esn52jzl5fv4c33w6a6smke3n2" />
                <Accordion title="List of contracts">
                    <Contracts codeId={COGNITARIUM_CODE_ID} />
                </Accordion>
            </Accordion>
        </>
    );
}

export default App;
