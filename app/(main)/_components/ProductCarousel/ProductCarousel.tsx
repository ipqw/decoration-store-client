import { productApiSlice } from "../../../../store/services/productApiSlice";
import React, { FC } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
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
    min-width: 1120px;
    display: flex;
    column-gap: 24px;
`;

export default ProductCarousel;
