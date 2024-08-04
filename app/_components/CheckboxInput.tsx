import { FC, useState } from "react";
import styled from "styled-components";
import CheckIcon from "@/public/icons/check.svg";

interface IProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    outlined: boolean;
}

const CheckboxInput: FC<IProps> = ({ isActive, setIsActive, outlined }) => {
    return (
        <Wrapper
            $outlined={outlined}
            $isActive={isActive}
            onClick={() => setIsActive((state) => !state)}>
            <Check $isActive={isActive} src={CheckIcon.src} />
        </Wrapper>
    );
};

const Wrapper = styled.div<{ $isActive: boolean; $outlined: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border: ${({ $isActive, $outlined }) =>
        !$isActive && !$outlined ? "1.5px solid #6c7275" : "none"};
    border-radius: 4px;
    background-color: ${({ $isActive }) => ($isActive ? "#141718" : "#FCFCFD")};
    user-select: none;
    cursor: pointer;
`;
const Check = styled.img<{ $isActive: boolean }>`
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    max-width: 15px;
    border-radius: 4px;
    max-height: 11px;
`;

export default CheckboxInput;
