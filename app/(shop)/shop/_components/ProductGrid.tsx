"use client";
import ProductCard from "@/app/_components/ProductCard";
import { IProduct } from "@/app/_types/types";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import styled from "styled-components";
import firstGridIcon from "@/public/icons/shop/firstGridIcon.svg";
import secondGridIcon from "@/public/icons/shop/secondGridIcon.svg";
import thirdGridIcon from "@/public/icons/shop/thirdGridIcon.svg";
import fourthGridIcon from "@/public/icons/shop/fourthGridIcon.svg";
import MobileProductCard from "@/app/_components/MobileProductCard";

interface IProps {
    products: IProduct[];
    category: string;
    activeGridButton: number;
    setActiveGridButton: Dispatch<SetStateAction<number>>;
}

const ProductGrid: FC<IProps> = ({ products, category, activeGridButton, setActiveGridButton }) => {
    return (
        <Wrapper
            $gridVariation={
                activeGridButton === 0
                    ? "auto auto auto"
                    : activeGridButton === 1
                      ? "auto auto auto auto"
                      : activeGridButton === 2
                        ? "auto auto"
                        : "auto"
            }>
            <TopBlock>
                <Title $isVisible={!(activeGridButton > 0)}>{category}</Title>
                <SettingsBlock $isVisible={!(activeGridButton > 0)}>
                    <SortBlock>
                        <SortText>Sort by</SortText>
                    </SortBlock>
                    <GridButtonsBlock>
                        <GridButton
                            onClick={() => setActiveGridButton(0)}
                            $active={activeGridButton === 0}>
                            <GridButtonIcon src={firstGridIcon.src} />
                        </GridButton>
                        <GridButton
                            onClick={() => setActiveGridButton(1)}
                            $active={activeGridButton === 1}>
                            <GridButtonIcon src={secondGridIcon.src} />
                        </GridButton>
                        <GridButton
                            onClick={() => setActiveGridButton(2)}
                            $active={activeGridButton === 2}>
                            <GridButtonIcon src={thirdGridIcon.src} />
                        </GridButton>
                        <GridButton
                            onClick={() => setActiveGridButton(3)}
                            $active={activeGridButton === 3}>
                            <GridButtonIcon src={fourthGridIcon.src} />
                        </GridButton>
                    </GridButtonsBlock>
                </SettingsBlock>
            </TopBlock>
            <ProductsBlock
                $gridVariation={
                    activeGridButton === 0
                        ? "auto auto auto"
                        : activeGridButton === 1
                          ? "auto auto auto auto"
                          : activeGridButton === 2
                            ? "auto auto"
                            : "auto"
                }>
                {activeGridButton === 0 || activeGridButton === 1
                    ? products.map((product, index) => {
                          return <ProductCard key={index} product={product} />;
                      })
                    : activeGridButton === 2
                      ? products.map((product, index) => {
                            return (
                                <MobileProductCard
                                    key={index}
                                    product={product}
                                    variation="horizontal"
                                />
                            );
                        })
                      : products.map((product, index) => {
                            return (
                                <MobileProductCard
                                    key={index}
                                    product={product}
                                    variation="vertical"
                                />
                            );
                        })}
            </ProductsBlock>
        </Wrapper>
    );
};
export const SettingsBlock = styled.div<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    column-gap: 32px;
`;
export const GridButton = styled.div<{ $active: boolean; $first?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 40px;
    background-color: ${({ $active }) => ($active ? "#F3F5F7" : "#FFFFFF")};
    border: 1px solid #e8ecef;
    border-width: ${({ $first }) => ($first ? "1px" : "1px 1px 1px 0")};
    cursor: pointer;
`;
export const GridButtonIcon = styled.img`
    width: 24px;
    height: 24px;
`;
export const GridButtonsBlock = styled.div`
    display: flex;
    align-items: center;
`;
export const SortText = styled.p`
    color: #121212;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    line-height: 26px;
`;
export const SortBlock = styled.div`
    display: flex;
    align-items: center;
    column-gap: 4px;
    justify-content: center;
`;
const TopBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 16px;
`;
const ProductsBlock = styled.div<{ $gridVariation?: string }>`
    display: grid;
    grid-template-columns: ${({ $gridVariation }) => $gridVariation};
    column-gap: 24px;
    row-gap: 24px;
    justify-content: ${({ $gridVariation }) =>
        $gridVariation === "auto" ? "center" : "flex-start"};
`;
const Title = styled.p<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
    color: #000000;
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
`;
const Wrapper = styled.div<{ $gridVariation?: string }>`
    display: flex;
    min-width: ${({ $gridVariation }) => {
        if ($gridVariation === "auto auto auto") {
            return "834px";
        } else {
            return "1120px";
        }
    }};
    flex-direction: column;
    row-gap: 40px;
`;

export default ProductGrid;
