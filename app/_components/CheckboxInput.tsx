import React, { useState } from "react";
import styled from "styled-components";
import CheckIcon from "@/public/icons/check.svg";

const CheckboxInput = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    return (
        <Wrapper $isActive={isActive} onClick={() => setIsActive((state) => !state)}>
            <Check $isActive={isActive} src={CheckIcon.src} />
        </Wrapper>
    );
};

const Wrapper = styled.div<{ $isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border: ${({ $isActive }) => ($isActive ? "none" : "1.5px solid #6c7275")};
    border-radius: 4px;
    margin-right: 12px;
    background-color: ${({ $isActive }) => ($isActive ? "#141718" : "#FCFCFD")};
    user-select: none;
`;
const Check = styled.img<{ $isActive: boolean }>`
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    max-width: 15px;
    border-radius: 4px;
    max-height: 11px;
`;

export default CheckboxInput;
