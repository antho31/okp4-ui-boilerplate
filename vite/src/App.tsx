import { configureGraz } from "graz";

import {
    Balance,
    Connection,
    ExecuteCognitarium,
    InstantiateCognitarium,
    InstantiateLawStone,
} from "./components";

import "./App.css";

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

            <Connection chainInfo={OKP4TestnetChain} />
            <Balance></Balance>
            <InstantiateCognitarium codeId={COGNITARIUM_CODE_ID} />
            <ExecuteCognitarium contractAddress="okp41mnrjmkmv2hx448qq54snt24js43nesk9esn52jzl5fv4c33w6a6smke3n2" />
            <InstantiateLawStone codeId={LAWSTONE_CODE_ID} />
        </>
    );
}

export default App;
