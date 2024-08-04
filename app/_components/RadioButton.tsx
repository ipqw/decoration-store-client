"use client";
import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

interface IProps {
    activeRadioButton: number;
    setActiveRadioButton: Dispatch<SetStateAction<number>>;
    index: number;
}

const RadioButton: FC<IProps> = ({ index, activeRadioButton, setActiveRadioButton }) => {
    return (
        <Wrapper onClick={() => setActiveRadioButton(index)}>
            <Circle $isVisible={activeRadioButton === index} />
        </Wrapper>
    );
};
const Circle = styled.div<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
    width: 10px;
    height: 10px;
    border-radius: 100px;
    background-color: #121212;
`;
const Wrapper = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 100px;
    border: 1px solid #121212;
`;

export default RadioButton;
