"use client";
import { FC, useState } from "react";
import styled from "styled-components";
import Cart from "../_components/Cart";
import Checkout from "../_components/Checkout";
import OrderComplete from "../_components/OrderComplete";
import { ICartProduct, IOrder } from "@/app/_types/types";

const CartPage: FC = () => {
    const [activeProcess, setActiveProcess] = useState<number>(0);
    const [activeShippingVariant, setActiveShippingVariant] = useState<number>(0);
    const [sortedCartProducts, setSortedCartProducts] = useState<ICartProduct[][]>([]);
    const [order, setOrder] = useState<IOrder>();
    return (
        <Wrapper>
            <Title>Cart</Title>
            <ProcessBar>
                <Process $isActive={activeProcess === 0}>
                    <ProcessCircle $isActive={activeProcess === 0}>1</ProcessCircle>
                    <ProcessText $isActive={activeProcess === 0}>Shopping cart</ProcessText>
                </Process>
                <Process $isActive={activeProcess === 1}>
                    <ProcessCircle $isActive={activeProcess === 1}>2</ProcessCircle>
                    <ProcessText $isActive={activeProcess === 1}>Checkout details</ProcessText>
                </Process>
                <Process $isActive={activeProcess === 2}>
                    <ProcessCircle $isActive={activeProcess === 2}>3</ProcessCircle>
                    <ProcessText $isActive={activeProcess === 2}>Order complete</ProcessText>
                </Process>
            </ProcessBar>
            {activeProcess === 0 && (
                <Cart
                    setActiveShippingVariant={setActiveShippingVariant}
                    activeShippingVariant={activeShippingVariant}
                    setActiveProcess={setActiveProcess}
                    sortedCartProducts={sortedCartProducts}
                    setSortedCartProducts={setSortedCartProducts}
                />
            )}
            {activeProcess === 1 && (
                <Checkout
                    activeShippingVariant={activeShippingVariant}
                    setActiveProcess={setActiveProcess}
                    sortedCartProducts={sortedCartProducts}
                    setSortedCartProducts={setSortedCartProducts}
                    setOrder={setOrder}
                />
            )}
            {activeProcess === 2 && (
                <OrderComplete order={order} sortedCartProducts={sortedCartProducts} />
            )}
        </Wrapper>
    );
};
const ProcessText = styled.p<{ $isActive: boolean }>`
    color: ${({ $isActive }) => ($isActive ? "#23262f" : "#B1B5C3")};
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    cursor: default;
`;
const ProcessCircle = styled.div<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    border-radius: 40px;
    width: 42px;
    height: 42px;
    color: #fcfcfd;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    background-color: ${({ $isActive }) => ($isActive ? "#23262f" : "#B1B5C3")};
`;
const Process = styled.div<{ $isActive: boolean }>`
    display: flex;
    column-gap: 16px;
    align-items: center;
    padding: 0 8px 16px 8px;
    border-bottom: ${({ $isActive }) => ($isActive ? "2px solid #141718" : "none")};
`;
const ProcessBar = styled.div`
    display: flex;
    column-gap: 32px;
`;
const Title = styled.p`
    color: #000000;
    font-family: "Poppins", sans-serif;
    font-size: 54px;
    font-weight: 500;
    line-height: 58px;
    padding-bottom: 40px;
`;
const Wrapper = styled.div`
    display: flex;
    padding-top: 80px;
    flex-direction: column;
    align-items: center;
`;

export default CartPage;
