"use client";
import { FC, ReactNode } from "react";
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
