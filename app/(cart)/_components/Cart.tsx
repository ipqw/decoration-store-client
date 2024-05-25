"use client";
import { useAppSelector } from "@/store/hooks";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import CartProduct from "./CartProduct";
import { ICartProduct } from "@/app/_types/types";

const Cart: FC = () => {
    const [sortedCartProducts, setSortedCartProducts] = useState<ICartProduct[][]>([]);
    const user = useAppSelector((state) => state.user);
    const { data: cartProducts } = cartApiSlice.useGetCartProductsByCartIdQuery(user.cart?.id || 0);

    const sortCartProducts = (elements: ICartProduct[]): ICartProduct[][] => {
        const result: ICartProduct[][] = [];
        elements.forEach((el) => {
            let existedElem;
            let indexOfExistedArray;
            result.forEach((resultEl, index) => {
                existedElem = resultEl.find((a) => a.productId === el.productId);
                if (existedElem) {
                    indexOfExistedArray = index;
                }
            });
            if (existedElem && typeof indexOfExistedArray === "number") {
                result[indexOfExistedArray].push(el);
            } else {
                result.push([el]);
            }
        });
        return result;
    };

    useEffect(() => {
        setSortedCartProducts(sortCartProducts(cartProducts || []));
    }, [cartProducts]);
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
                {sortedCartProducts?.map((el, index) => {
                    return <CartProduct cartProducts={el} key={index} />;
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
