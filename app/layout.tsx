import "./_styles/globals.css";
import "./_styles/fonts.css";
import StyledComponentsRegistry from "./_lib/registry";
import { Metadata } from "next";
import StoreProvider from "./_components/StoreProvider";

export const metadata: Metadata = {
    title: "3legant.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <StoreProvider>
            <html lang="en">
                <body>
                    <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
                </body>
            </html>
        </StoreProvider>
    );
};
export default RootLayout;
