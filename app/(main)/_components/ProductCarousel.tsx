import { FC, UIEvent, useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "@/app/_components/ProductCard";
import { IProduct } from "@/app/_types/types";

interface IProps {
    products: IProduct[];
}

const ProductCarousel: FC<IProps> = ({ products }) => {
    return (
        <Wrapper>
            {products?.map((product, index) => {
                return <ProductCard product={product} key={index} />;
            })}
        </Wrapper>
    );
};
const Wrapper = styled.div`
    width: 1120px;
    display: flex;
    padding-bottom: 48px;
    column-gap: 24px;
    overflow: auto;
    &::-webkit-scrollbar {
        height: 4px;
        width: 1120px;
    }
    &::-webkit-scrollbar-track {
        background: #e8ecef;
    }
    &::-webkit-scrollbar-thumb {
        background: #343839;
    }
`;

export default ProductCarousel;
