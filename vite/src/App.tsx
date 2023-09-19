import "./App.css";
import { configureGraz, useActiveChain } from "graz";

configureGraz({
    defaultChain: {
        chainId: "okp4-nemeton-1",
        gas: {
            price: "10000000",
            denom: "uknow",
        },
        currencies: [
            {
                coinDenom: "know",
                coinMinimalDenom: "uknow",
                coinDecimals: 6,
                coinGeckoId: "OKP4 nemeton",
                coinImageUrl:
                    "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/okp4testnet/images/okp4.png",
            },
        ],
        rpc: "https://api.testnet.okp4.network:443/rpc",
        rest: "https://api.testnet.okp4.network:443/",
    },
});

function App() {
    const activeChain = useActiveChain();

    return (
        <div>
            <span>Connected to {activeChain?.chainId}</span>
        </div>
    );
}

export default App;
