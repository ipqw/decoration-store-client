import React, { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import removeIcon from "@/public/icons/product/Minus.svg";
import addIcon from "@/public/icons/product/Add.svg";

interface IProps {
    counter: number;
    setCounter: Dispatch<SetStateAction<number>>;
    small?: boolean;
    noBorders?: boolean;
    backgroundColor?: string;
}

const Counter: FC<IProps> = ({ counter, setCounter, small, backgroundColor, noBorders }) => {
    return (
        <Wrapper $noBorders={noBorders} $backgroundColor={backgroundColor} $small={small || false}>
            <Button
                $small={small || false}
                onClick={() => {
                    if (counter > 0) {
                        setCounter((prev) => prev - 1);
                    }
                }}>
                <Icon $small={small || false} src={removeIcon.src} />
            </Button>
            <Text $small={small || false}>{counter}</Text>
            <Button
                $small={small || false}
                onClick={() => {
                    setCounter((prev) => prev + 1);
                }}>
                <Icon $small={small || false} src={addIcon.src} />
            </Button>
        </Wrapper>
    );
};
const Text = styled.p<{ $small: boolean }>`
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: ${({ $small }) => ($small ? "12px" : "16px")};
    line-height: ${({ $small }) => ($small ? "20px" : "26px")};
    color: #121212;
`;
const Icon = styled.img<{ $small: boolean }>`
    width: ${({ $small }) => ($small ? "16px" : "auto")};
    height: ${({ $small }) => ($small ? "16px" : "auto")};
`;
const Button = styled.div<{ $small: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ $small }) => ($small ? "16px" : "auto")};
    height: ${({ $small }) => ($small ? "16px" : "auto")};
    cursor: pointer;
`;
const Wrapper = styled.div<{ $small: boolean; $backgroundColor?: string; $noBorders?: boolean }>`
    background-color: ${({ $small, $backgroundColor }) =>
        $backgroundColor ? $backgroundColor : $small ? "#FFFFFF" : "#f5f5f5"};
    border-radius: ${({ $small }) => ($small ? "4px" : "8px")};
    display: flex;
    padding: ${({ $small }) => ($small ? "6px 8px" : "12px 16px")};
    justify-content: space-between;
    align-items: center;
    min-width: ${({ $small }) => ($small ? "80px" : "127px")};
    height: ${({ $small }) => ($small ? "32px" : "52px")};
    user-select: none;
    border: ${({ $small, $noBorders }) =>
        $noBorders ? "none" : $small ? "1px solid #6C7275" : "none"};
`;

export default Counter;
