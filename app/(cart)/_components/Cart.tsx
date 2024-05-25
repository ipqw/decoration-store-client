"use client";
import { useAppSelector } from "@/store/hooks";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import CartProduct from "./CartProduct";
import { ICartProduct } from "@/app/_types/types";
import ShippingVariant from "./ShippingVariant";

const Cart: FC = () => {
    const [sortedCartProducts, setSortedCartProducts] = useState<ICartProduct[][]>([]);
    const [activeShippingVariant, setActiveShippingVariant] = useState<number>(0);
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
            <SummaryBlock>
                <SummaryTitle>Cart summary</SummaryTitle>
                <ShippingVariants>
                    <ShippingVariant
                        index={0}
                        title="Free shipping"
                        price="0.00"
                        activeShippingVariant={activeShippingVariant}
                        setActiveShippingVariant={setActiveShippingVariant}
                    />
                    <ShippingVariant
                        index={1}
                        title="Express shipping"
                        price="15.00"
                        activeShippingVariant={activeShippingVariant}
                        setActiveShippingVariant={setActiveShippingVariant}
                    />
                </ShippingVariants>
            </SummaryBlock>
        </Wrapper>
    );
};
const ShippingVariants = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
`;
const SummaryTitle = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    padding-bottom: 16px;
`;
const SummaryBlock = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    padding: 24px;
    border: 1px solid #6c7275;
`;
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
    column-gap: 64px;
    padding: 80px 0;
`;

export default Cart;
