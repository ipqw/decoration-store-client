"use client";
import { imageLinkHandler } from "@/app/_lib/functions";
import { ICartProduct } from "@/app/_types/types";
import { FC } from "react";
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
                            ? imageLinkHandler(sortedCartProducts[0]?.product?.images[0])
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
    position: absolute;
    width: 16px;
    height: 16px;
    right: 0;
    top: 0;
    font-family: "Inter", sans-serif;
    color: #fcfcfd;
    font-weight: 600;
    font-size: 10px;
    line-height: 10px;
    background-color: #141718;
    @media screen and (min-width: 1120px) {
        font-size: 16px;
        line-height: 24px;
        width: 32px;
        height: 32px;
    }
`;
const Wrapper = styled.div`
    display: flex;
    position: relative;
    width: 88px;
    height: 104px;
    @media screen and (min-width: 1120px) {
        width: 96px;
        height: 112px;
    }
`;

export default OrderProduct;
