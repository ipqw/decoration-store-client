import { productApiSlice } from "../../../../store/services/productApiSlice";
import React, { FC } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const ProductCarousel: FC = () => {
    const { data, isLoading, error, refetch } = productApiSlice.useFetchAllProductsQuery(null);
    return (
        <Wrapper>
            {data?.map((product, index) => {
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
