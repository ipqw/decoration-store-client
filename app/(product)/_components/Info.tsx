"use client";
import { FC } from "react";
import styled from "styled-components";

interface IProps {
    title: string;
    text: string;
}

const Info: FC<IProps> = ({ title, text }) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <Text>{text}</Text>
        </Wrapper>
    );
};
const Title = styled.p`
    color: #6c7275;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    line-height: 22px;
`;
const Text = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

export default Info;
