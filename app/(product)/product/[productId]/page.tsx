"use client";
import { productApiSlice } from "@/store/services/productApiSlice";
import React, { FC } from "react";
import styled from "styled-components";
import ImageSlider from "../../_components/ImageSlider";

interface IProps {
    params: { productId: string };
}

const ProductPage: FC<IProps> = ({ params }) => {
    const { data, isLoading, error, refetch } = productApiSlice.useGetOneProductQuery(
        Number(params.productId),
    );
    return (
        <Wrapper>
            <ProductSection>
                <ProductLeftAside>
                    <ImageSlider product={data} />
                </ProductLeftAside>
                <ProductRightAside></ProductRightAside>
            </ProductSection>
        </Wrapper>
    );
};
const ProductLeftAside = styled.aside`
    width: fit-content;
`;
const ProductRightAside = styled.aside`
    width: fit-content;
`;
const ProductSection = styled.section`
    display: flex;
    justify-content: center;
`;

const Wrapper = styled.div``;

export default ProductPage;
