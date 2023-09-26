import {
    getAvailableWallets,
    useAccount,
    useDisconnect,
    useSuggestChainAndConnect,
    WalletType,
} from "graz";
import type { ChainInfo, Key } from "graz/dist/keplr";

export function Connection({ chainInfo }: { chainInfo: ChainInfo }) {
    const wallets = getAvailableWallets();
    const { suggestAndConnect } = useSuggestChainAndConnect();
    const { disconnect } = useDisconnect();
    const {
        data: account,
        isConnected,
    }: { data: Key | null; isConnected: boolean } = useAccount();

    const gas = {
        price: "0.012",
        denom: "uknow",
    };

    return (
        <div>
            {isConnected ? (
                <>
                    <div>Linked wallet address: {account?.bech32Address}</div>
                    <button onClick={() => disconnect(true)}>Disconnect</button>
                </>
            ) : (
                <>
                    {wallets.keplr && (
                        <button
                            onClick={() =>
                                suggestAndConnect({
                                    chainInfo,
                                    walletType: WalletType.KEPLR,
                                    gas,
                                })
                            }
                        >
                            Connect with Keplr
                        </button>
                    )}
                    {wallets.leap && (
                        <button
                            onClick={() =>
                                suggestAndConnect({
                                    chainInfo,
                                    walletType: WalletType.LEAP,
                                    gas,
                                })
                            }
                        >
                            Connect with Leap
                        </button>
                    )}
                    {wallets.cosmostation && (
                        <button
                            onClick={() =>
                                suggestAndConnect({
                                    chainInfo,
                                    walletType: WalletType.COSMOSTATION,
                                    gas,
                                })
                            }
                        >
                            Connect with Cosmostation
                        </button>
                    )}
                    {wallets.walletconnect && (
                        <button
                            onClick={() =>
                                suggestAndConnect({
                                    chainInfo,
                                    walletType: WalletType.WALLETCONNECT,
                                    gas,
                                })
                            }
                        >
                            Connect with WalletConnect
                        </button>
                    )}
                    {wallets.wc_keplr_mobile && (
                        <button
                            onClick={() =>
                                suggestAndConnect({
                                    chainInfo,
                                    walletType: WalletType.WC_KEPLR_MOBILE,
                                    gas,
                                })
                            }
                        >
                            Connect with Keplr Mobile
                        </button>
                    )}
                    {wallets.wc_leap_mobile && (
                        <button
                            onClick={() =>
                                suggestAndConnect({
                                    chainInfo,
                                    walletType: WalletType.WC_LEAP_MOBILE,
                                    gas,
                                })
                            }
                        >
                            Connect with Leap Mobile
                        </button>
                    )}
                    {wallets.wc_cosmostation_mobile && (
                        <button
                            onClick={() =>
                                suggestAndConnect({
                                    chainInfo,
                                    walletType:
                                        WalletType.WC_COSMOSTATION_MOBILE,
                                    gas,
                                })
                            }
                        >
                            Connect with Cosmostation Mobile
                        </button>
                    )}
                    {wallets.metamask_snap_leap && (
                        <button
                            onClick={() =>
                                suggestAndConnect({
                                    chainInfo,
                                    walletType: WalletType.METAMASK_SNAP_LEAP,
                                    gas,
                                })
                            }
                        >
                            Connect with Metamask
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
