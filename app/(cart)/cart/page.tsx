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
                    $isVisible={activeProcess === 0}
                    onClick={() => {
                        activeProcess === 1 ? setActiveProcess(0) : "";
                    }}
                    $pointer={activeProcess === 1}
                    $isCompleted={activeProcess > 0}
                    $isActive={activeProcess === 0}>
                    <ProcessCircle
                        $isVisible={activeProcess === 0}
                        $isCompleted={activeProcess > 0}
                        $isActive={activeProcess === 0}>
                        {activeProcess > 0 ? <TickIcon src={tickIcon.src} /> : "1"}
                    </ProcessCircle>
                    <ProcessText
                        $isVisible={activeProcess === 0}
                        $isCompleted={activeProcess > 0}
                        $isActive={activeProcess === 0}>
                        Shopping cart
                    </ProcessText>
                </Process>
                <ProcessCircle
                    $isVisible={activeProcess === 0}
                    $mobile
                    $isCompleted={activeProcess > 1}
                    $isActive={activeProcess === 1}>
                    2
                </ProcessCircle>
                <Process
                    $isVisible={activeProcess === 1}
                    $isCompleted={activeProcess > 1}
                    $isActive={activeProcess === 1}>
                    <ProcessCircle
                        $isVisible={activeProcess === 1}
                        $isCompleted={activeProcess > 1}
                        $isActive={activeProcess === 1}>
                        2
                    </ProcessCircle>
                    <ProcessText
                        $isVisible={activeProcess === 1}
                        $isCompleted={activeProcess > 1}
                        $isActive={activeProcess === 1}>
                        Checkout details
                    </ProcessText>
                </Process>
                <ProcessCircle
                    $mobile
                    $isVisible={activeProcess === 1}
                    $isCompleted={activeProcess > 2}
                    $isActive={activeProcess === 2}>
                    3
                </ProcessCircle>
                <Process
                    $isVisible={activeProcess === 2}
                    $isCompleted={activeProcess > 2}
                    $isActive={activeProcess === 2}>
                    <ProcessCircle
                        $isVisible={activeProcess === 2}
                        $isCompleted={activeProcess > 2}
                        $isActive={activeProcess === 2}>
                        3
                    </ProcessCircle>
                    <ProcessText
                        $isVisible={activeProcess === 2}
                        $isCompleted={activeProcess > 2}
                        $isActive={activeProcess === 2}>
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
const ProcessText = styled.p<{ $isActive: boolean; $isCompleted: boolean; $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
    color: ${({ $isActive, $isCompleted }) =>
        $isCompleted ? "#38CB89" : $isActive ? "#23262f" : "#B1B5C3"};
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    @media screen and (min-width: 1120px) {
        display: block;
    }
`;
const ProcessCircle = styled.div<{
    $isActive: boolean;
    $isCompleted: boolean;
    $isVisible: boolean;
    $mobile?: boolean;
}>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
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
    @media screen and (min-width: 1120px) {
        display: ${({ $mobile }) => ($mobile ? "none" : "flex")};
    }
`;

const Process = styled.div<{
    $isActive: boolean;
    $isCompleted: boolean;
    $pointer?: boolean;
    $isVisible: boolean;
}>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    column-gap: 16px;
    align-items: center;
    width: 256px;
    cursor: ${({ $pointer }) => ($pointer ? "pointer" : "default")};
    padding: 0 0 26px 0;
    border-bottom: ${({ $isActive, $isCompleted }) =>
        $isCompleted ? "2px solid #38CB89" : $isActive ? "2px solid #141718" : "none"};
    @media screen and (min-width: 1120px) {
        width: auto;
        display: flex;
        padding: 0 8px 16px 8px;
    }
`;

const ProcessBar = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 0;
    width: 100%;
    @media screen and (min-width: 1120px) {
        justify-content: flex-start;
        column-gap: 32px;
        width: auto;
    }
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
    width: 312px;
    @media screen and (min-width: 1120px) {
        width: auto;
    }
`;

export default CartPage;
