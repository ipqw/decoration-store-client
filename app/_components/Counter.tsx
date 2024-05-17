import React, { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import removeIcon from "@/public/icons/product/Minus.svg";
import addIcon from "@/public/icons/product/Add.svg";

interface IProps {
    counter: number;
    setCounter: Dispatch<SetStateAction<number>>;
    small?: boolean;
}

const Counter: FC<IProps> = ({ counter, setCounter, small }) => {
    return (
        <Wrapper $small={small || false}>
            <Button
                onClick={() => {
                    if (counter > 0) {
                        setCounter((prev) => prev - 1);
                    }
                }}>
                <Icon src={removeIcon.src} />
            </Button>
            <Text>{counter}</Text>
            <Button
                onClick={() => {
                    setCounter((prev) => prev + 1);
                }}>
                <Icon src={addIcon.src} />
            </Button>
        </Wrapper>
    );
};
const Text = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    color: #121212;
`;
const Icon = styled.img``;
const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;
const Wrapper = styled.div<{ $small: boolean }>`
    background-color: #f5f5f5;
    border-radius: 8px;
    display: flex;
    padding: 12px 16px;
    justify-content: space-between;
    align-items: center;
    min-width: ${({ $small }) => ($small ? "80px" : "127px")};
    height: ${({ $small }) => ($small ? "32px" : "52px")};
    user-select: none;
`;

export default Counter;
