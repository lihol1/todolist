import { useContext } from "react";
import { TodoStore } from "../context/StoreProvider";

export function useStoreContext() {
    const store = useContext(TodoStore);

    if (store === null) {
        throw new Error("Type of todoStore is undefined")
    }

    return store;
}
