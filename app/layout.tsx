"use client";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Provider } from "react-redux";
import { setupStore } from "../store/store";

const store = setupStore();

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <Provider store={store}>
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </Provider>
    );
};
export default RootLayout;
