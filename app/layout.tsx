"use client";
import "./_styles/globals.css";
import "./_styles/fonts.css";
import { Provider } from "react-redux";
import { setupStore } from "../store/store";

const store = setupStore();

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <Provider store={store}>
            <html lang="en">
                <body>{children}</body>
            </html>
        </Provider>
    );
};
export default RootLayout;
