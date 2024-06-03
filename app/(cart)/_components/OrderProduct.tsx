"use client";
import { ICartProduct } from "@/app/_types/types";
import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
    sortedCartProducts: ICartProduct[];
}

const OrderProduct: FC<IProps> = ({ sortedCartProducts }) => {
    return (
        <Wrapper>
            <ImageWrapper>
                <Image
                    alt="product image"
                    src={
                        sortedCartProducts[0].product.images
                            ? sortedCartProducts[0]?.product?.images[0]
                            : ""
                    }
                />
            </ImageWrapper>
            <Amount>{sortedCartProducts.length}</Amount>
        </Wrapper>
    );
};
const ImageWrapper = styled.div`
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    background-color: #f3f5f7;
    width: 80px;
    height: 96px;
`;
const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const Amount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    width: 32px;
    height: 32px;
    position: absolute;
    right: 0;
    top: 0;
    font-family: "Inter", sans-serif;
    color: #fcfcfd;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    background-color: #141718;
`;
const Wrapper = styled.div`
    display: flex;
    width: 96px;
    height: 112px;
    position: relative;
`;

export default OrderProduct;
