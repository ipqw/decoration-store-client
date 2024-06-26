"use client";
import { FC, ReactNode, useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import styled from "styled-components";
import FlyoutCart from "../_components/FlyoutCart";

interface IProps {
    children: ReactNode;
}

const Template: FC<IProps> = ({ children }) => {
    const [isFlyoutCartVisible, setIsFlyoutCartVisible] = useState<boolean>(false);
    return (
        <Wrapper $isScrollVisible={!isFlyoutCartVisible}>
            <Header setIsFlyoutCartVisible={setIsFlyoutCartVisible} />
            <FlyoutCart
                isFlyoutCartVisible={isFlyoutCartVisible}
                setIsFlyoutCartVisible={setIsFlyoutCartVisible}
            />
            {children}
            <Footer />
        </Wrapper>
    );
};

const Wrapper = styled.div<{ $isScrollVisible: boolean }>`
    overflow-y: ${({ $isScrollVisible }) => ($isScrollVisible ? "auto" : "hidden")};
    overflow-x: hidden;
    height: ${({ $isScrollVisible }) => ($isScrollVisible ? "100%" : "100vh")};
    max-width: 100%;
    position: relative;
    padding-top: 60px;
`;

export default Template;
