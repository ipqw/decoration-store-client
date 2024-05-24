"use client";
import { useAppSelector } from "@/store/hooks";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import CartComponent from "./CartProduct";

interface IProps {
    isFlyoutCartVisible: boolean;
    setIsFlyoutCartVisible: Dispatch<SetStateAction<boolean>>;
}

const FlyoutCart: FC<IProps> = ({ isFlyoutCartVisible, setIsFlyoutCartVisible }) => {
    const deliveryPrice = 15;

    const user = useAppSelector((state) => state.user);
    const { data: cartProducts, refetch } = cartApiSlice.useGetCartProductsByCartIdQuery(
        user.cart?.id || 0,
    );
    const [sumOfDiscountPrices, setSumOfDiscountPrices] = useState<number>(0);

    useEffect(() => {
        setSumOfDiscountPrices(() => {
            let sum = 0;
            cartProducts?.forEach((el) => {
                sum += el.product.discountPrice ? el.product.discountPrice : el.product.price;
            });
            return sum;
        });
    }, [cartProducts]);
    useEffect(() => {
        refetch();
    }, [isFlyoutCartVisible]);
    return (
        <Wrapper onClick={() => setIsFlyoutCartVisible(false)} $isVisible={isFlyoutCartVisible}>
            <Cart onClick={(e) => e.stopPropagation()} $isFlyoutCartVisible={isFlyoutCartVisible}>
                <CartTitle>Cart</CartTitle>
                <CartProducts>
                    {cartProducts?.map((el, index) => {
                        return (
                            <CartComponent
                                product={el.product}
                                setSumOfDiscountPrices={setSumOfDiscountPrices}
                                key={index}
                                cartProducts={[el]}
                            />
                        );
                    })}
                </CartProducts>
                <Summary>
                    <Subtotal>
                        <SubtotalText>Subtotal</SubtotalText>
                        <SubtotalPrice>
                            $
                            {sumOfDiscountPrices.toString().split(".")[1]
                                ? sumOfDiscountPrices
                                : `${sumOfDiscountPrices}.00`}
                        </SubtotalPrice>
                    </Subtotal>
                    <Total>
                        <TotalText>Total</TotalText>
                        <TotalPrice>
                            $
                            {sumOfDiscountPrices
                                ? (sumOfDiscountPrices + deliveryPrice + sumOfDiscountPrices * 0.15)
                                      .toString()
                                      .split(".")[1]
                                    ? sumOfDiscountPrices +
                                      deliveryPrice +
                                      sumOfDiscountPrices * 0.15
                                    : `${sumOfDiscountPrices + deliveryPrice + sumOfDiscountPrices * 0.15}.00`
                                : "0.00"}
                        </TotalPrice>
                    </Total>
                </Summary>
                <CheckOutButton>Checkout</CheckOutButton>
                <ViewCartButton>View Cart</ViewCartButton>
            </Cart>
        </Wrapper>
    );
};
const ViewCartButton = styled.p`
    font-size: 14px;
    width: fit-content;
    line-height: 22px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    color: #121212;
    border-bottom: 1px solid #121212;
    user-select: none;
    cursor: pointer;
    align-self: center;
`;
const CheckOutButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    border-radius: 6px;
    background-color: #141718;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
    user-select: none;
    margin-top: 16px;
    margin-bottom: 16px;
    cursor: pointer;
`;
const TotalPrice = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
`;
const TotalText = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
`;
const Total = styled.div`
    display: flex;
    justify-content: space-between;
    height: 52px;
    align-items: center;
`;
const SubtotalPrice = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
`;
const SubtotalText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
`;
const Subtotal = styled.div`
    display: flex;
    justify-content: space-between;
    height: 52px;
    align-items: center;
    border-bottom: 1px solid #e8ecef;
`;
const Summary = styled.div`
    display: flex;
    flex-direction: column;
`;
const CartProducts = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    height: 684px;
`;
const CartTitle = styled.p`
    color: #121212;
    font-family: "Poppins", sans-serif;
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
`;
const Cart = styled.div<{ $isFlyoutCartVisible: boolean }>`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 413px;
    height: 100vh;
    background-color: #ffffff;
    transition: 1s all;
    top: 0;
    right: ${({ $isFlyoutCartVisible }) => ($isFlyoutCartVisible ? "0px" : "413px")};
    animation-duration: 0.5s;
    animation-name: slidein;
    padding: 40px 24px;

    @keyframes slidein {
        from {
            right: -413px;
        }
        to {
            right: 0;
        }
    }
`;
const Wrapper = styled.div<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    position: absolute;
    background-color: rgba(0, 0, 0, 0.32);
    width: 100vw;
    height: 100vh;
    z-index: 5;
    top: 0;
`;

export default FlyoutCart;
