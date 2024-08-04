"use client";
import RadioButton from "@/app/_components/RadioButton";
import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

interface IProps {
    activeRadioVariant: number;
    setActiveRadioVariant: Dispatch<SetStateAction<number>>;
    index: number;
    title: string;
    text?: string;
}

const RadioVariant: FC<IProps> = ({
    activeRadioVariant,
    setActiveRadioVariant,
    index,
    title,
    text,
}) => {
    return (
        <Wrapper
            onClick={() => setActiveRadioVariant(index)}
            $isActive={index === activeRadioVariant}>
            <TitleWrapper>
                <RadioButton
                    activeRadioButton={activeRadioVariant}
                    setActiveRadioButton={setActiveRadioVariant}
                    index={index}
                />
                <Title>{title}</Title>
            </TitleWrapper>
            <Text>{text}</Text>
        </Wrapper>
    );
};
const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const Text = styled.p`
    justify-self: end;
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
`;
const Title = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    color: #141718;
    margin-left: 12px;
`;
const Wrapper = styled.div<{ $isActive: boolean }>`
    display: flex;
    user-select: none;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    padding: 13px 16px;
    min-width: 365px;
    border: 1px solid #141718;
    background-color: ${({ $isActive }) => ($isActive ? "#F3F5F7" : "#FEFEFE")};
`;

export default RadioVariant;
