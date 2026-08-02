import { useSyncExternalStore } from "react";

export function useMounted() {
    return useSyncExternalStore(
        () => () => {}, // subscribe (no-op, kabhi change nahi hoga)
        () => true,     // client snapshot
        () => false     // server snapshot
    );
}