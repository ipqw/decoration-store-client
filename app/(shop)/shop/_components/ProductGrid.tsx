"use client";
import ProductCard from "@/app/_components/ProductCard";
import { IProduct } from "@/app/_types/types";
import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
    products: IProduct[];
}

const ProductGrid: FC<IProps> = ({ products }) => {
    return (
        <Wrapper>
            {products.map((product, index) => {
                return <ProductCard key={index} product={product} />;
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: 24px;
    row-gap: 24px;
    justify-content: space-between;
`;

export default ProductGrid;
