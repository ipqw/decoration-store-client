"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, setupStore } from "@/store/store";
import { userApiSlice } from "@/store/services/userApiSlice";

export default function StoreProvider({ children }: { children: ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = setupStore();
        storeRef.current.dispatch(
            userApiSlice.endpoints.check.initiate(
                typeof window !== "undefined" ? localStorage.getItem("token") || "" : "",
            ),
        );
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
