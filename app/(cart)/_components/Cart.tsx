"use client";
import { useAppSelector } from "@/store/hooks";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import React, { FC } from "react";
import styled from "styled-components";
import CartProduct from "./CartProduct";

const Cart: FC = () => {
    const user = useAppSelector((state) => state.user);
    const { data: cartProducts, refetch } = cartApiSlice.useGetCartProductsByCartIdQuery(
        user.cart?.id || 0,
    );
    return (
        <Wrapper>
            <CartBlock>
                <ColumnTitles>
                    <ColumnTitle>Product</ColumnTitle>
                    <ColumnTitlesWrapper>
                        <ColumnTitle>Quantity</ColumnTitle>
                        <ColumnTitle>Price</ColumnTitle>
                        <ColumnTitle>Subtotal</ColumnTitle>
                    </ColumnTitlesWrapper>
                </ColumnTitles>
                {cartProducts?.map((el, index) => {
                    return <CartProduct cartProducts={[el]} key={index} />;
                })}
            </CartBlock>
        </Wrapper>
    );
};
const ColumnTitlesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 322px;
`;
const ColumnTitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    color: #121212;
`;
const ColumnTitles = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 4px 24px 4px;
    border-bottom: 1px #6c7275 solid;
`;
const CartBlock = styled.div`
    display: flex;
    width: 643px;
    flex-direction: column;
`;
const Wrapper = styled.div`
    display: flex;
    padding: 80px 0;
    width: 643px;
`;

export default Cart;
