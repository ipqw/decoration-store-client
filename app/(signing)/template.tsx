"use client";
import React, { FC, ReactNode } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import styled from "styled-components";

interface IProps {
    children: ReactNode;
}

const template: FC<IProps> = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
    max-width: 100%;
    overflow: hidden;
`;

export default template;
