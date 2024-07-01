"use client";
import { FC, Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import Cart from "../_components/Cart";
import Checkout from "../_components/Checkout";
import OrderComplete from "../_components/OrderComplete";
import { ICartProduct, IOrder } from "@/app/_types/types";
import tickIcon from "@/public/icons/check.svg";
import { useSearchParams } from "next/navigation";

const CartPageContent: FC = () => {
    const searchParams = useSearchParams();
    const [activeProcess, setActiveProcess] = useState<number>(0);
    const [activeShippingVariant, setActiveShippingVariant] = useState<number>(0);
    const [sortedCartProducts, setSortedCartProducts] = useState<ICartProduct[][]>([]);
    const [order, setOrder] = useState<IOrder>();
    useEffect(() => {
        if (searchParams.has("checkout")) {
            setActiveProcess(1);
        }
    }, []);
    return (
        <Wrapper>
            <Title>
                {activeProcess === 0 && "Cart"}
                {activeProcess === 1 && "Check Out"}
                {activeProcess === 2 && "Complete!"}
            </Title>
            <ProcessBar>
                <Process
                    onClick={() => {
                        activeProcess === 1 ? setActiveProcess(0) : "";
                    }}
                    $pointer={activeProcess === 1}
                    $isCompleted={activeProcess > 0}
                    $isActive={activeProcess === 0}>
                    <ProcessCircle $isCompleted={activeProcess > 0} $isActive={activeProcess === 0}>
                        {activeProcess > 0 ? <TickIcon src={tickIcon.src} /> : "1"}
                    </ProcessCircle>
                    <ProcessText $isCompleted={activeProcess > 0} $isActive={activeProcess === 0}>
                        Shopping cart
                    </ProcessText>
                </Process>
                <Process $isCompleted={activeProcess > 1} $isActive={activeProcess === 1}>
                    <ProcessCircle $isCompleted={activeProcess > 1} $isActive={activeProcess === 1}>
                        2
                    </ProcessCircle>
                    <ProcessText $isCompleted={activeProcess > 1} $isActive={activeProcess === 1}>
                        Checkout details
                    </ProcessText>
                </Process>
                <Process $isCompleted={activeProcess > 2} $isActive={activeProcess === 2}>
                    <ProcessCircle $isCompleted={activeProcess > 2} $isActive={activeProcess === 2}>
                        3
                    </ProcessCircle>
                    <ProcessText $isCompleted={activeProcess > 2} $isActive={activeProcess === 2}>
                        Order complete
                    </ProcessText>
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
const CartPage: FC = () => {
    return (
        <Suspense>
            <CartPageContent />
        </Suspense>
    );
};
const TickIcon = styled.img``;
const ProcessText = styled.p<{ $isActive: boolean; $isCompleted: boolean }>`
    color: ${({ $isActive, $isCompleted }) =>
        $isCompleted ? "#38CB89" : $isActive ? "#23262f" : "#B1B5C3"};
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
`;
const ProcessCircle = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
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
    background-color: ${({ $isActive, $isCompleted }) =>
        $isCompleted ? "#38CB89" : $isActive ? "#23262f" : "#B1B5C3"};
`;
const Process = styled.div<{ $isActive: boolean; $isCompleted: boolean; $pointer?: boolean }>`
    display: flex;
    column-gap: 16px;
    align-items: center;
    cursor: ${({ $pointer }) => ($pointer ? "pointer" : "default")};
    padding: 0 8px 16px 8px;
    border-bottom: ${({ $isActive, $isCompleted }) =>
        $isCompleted ? "2px solid #38CB89" : $isActive ? "2px solid #141718" : "none"};
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
