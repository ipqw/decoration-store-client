"use client";
import React, { FC, ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";

interface IProps {
    children: ReactNode;
}

const template: FC<IProps> = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            {children}
            <Footer />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    max-width: 100%;
`;

export default template;
