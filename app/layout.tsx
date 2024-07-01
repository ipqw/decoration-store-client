"use client";
import "./_styles/globals.css";
import "./_styles/fonts.css";
import { Provider } from "react-redux";
import { setupStore } from "../store/store";
import { userApiSlice } from "@/store/services/userApiSlice";

const store = setupStore();

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    store.dispatch(
        userApiSlice.endpoints.check.initiate(
            typeof window !== "undefined" ? localStorage.getItem("token") || "" : "",
        ),
    );
    return (
        <Provider store={store}>
            <html lang="en">
                <body>{children}</body>
            </html>
        </Provider>
    );
};
export default RootLayout;
