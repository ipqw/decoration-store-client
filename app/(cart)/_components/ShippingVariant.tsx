"use client";
import RadioButton from "@/app/_components/RadioButton";
import React, { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

interface IProps {
    activeShippingVariant: number;
    setActiveShippingVariant: Dispatch<SetStateAction<number>>;
    index: number;
    title: string;
    price: string;
}

const ShippingVariant: FC<IProps> = ({
    activeShippingVariant,
    setActiveShippingVariant,
    index,
    title,
    price,
}) => {
    return (
        <Wrapper
            onClick={() => setActiveShippingVariant(index)}
            $isActive={index === activeShippingVariant}>
            <TitleWrapper>
                <RadioButton
                    activeRadioButton={activeShippingVariant}
                    setActiveRadioButton={setActiveShippingVariant}
                    index={index}
                />
                <Title>{title}</Title>
            </TitleWrapper>
            <Price>${price}</Price>
        </Wrapper>
    );
};
const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const Price = styled.p`
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

export default ShippingVariant;
