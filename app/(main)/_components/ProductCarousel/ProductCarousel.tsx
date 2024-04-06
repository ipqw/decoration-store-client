import { productApiSlice } from "../../../../store/services/productApiSlice";
import React, { FC } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

interface IProps {
    onlyNew?: boolean;
}

const ProductCarousel: FC<IProps> = ({ onlyNew }) => {
    const { data, isLoading, error, refetch } = productApiSlice.useGetAllProductsQuery(null);
    let sortedArray = data ? [...data] : [];
    if (onlyNew) {
        sortedArray =
            data?.filter((el) => Date.now() - new Date(el.createdAt).getTime() < 604800000) || [];
    }
    return (
        <Wrapper>
            {sortedArray?.map((product, index) => {
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
