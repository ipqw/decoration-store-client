"use client";
import React, { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";

const template = ({ children }: { children: ReactNode }) => {
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
