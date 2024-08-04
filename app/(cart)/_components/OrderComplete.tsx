"use client";
import { ICartProduct, IOrder } from "@/app/_types/types";
import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import OrderProduct from "./OrderProduct";
import { useRouter } from "next/navigation";

interface IProps {
    sortedCartProducts: ICartProduct[][];
    order: IOrder | undefined;
}

const OrderComplete: FC<IProps> = ({ sortedCartProducts, order }) => {
    const router = useRouter();
    return (
        <Wrapper>
            <TitleBlock>
                <Subtitle>Thank you! 🎉</Subtitle>
                <Title>Your order has been received</Title>
            </TitleBlock>
            <OrderProducts>
                {sortedCartProducts.map((el, index) => {
                    return <OrderProduct sortedCartProducts={el} key={index} />;
                })}
            </OrderProducts>
            <OrderDetails>
                <OrderDetailColumn>
                    <OrderDetailTitle>Order code:</OrderDetailTitle>
                    <OrderDetailTitle>Date:</OrderDetailTitle>
                    <OrderDetailTitle>Total:</OrderDetailTitle>
                    <OrderDetailTitle>Payment method:</OrderDetailTitle>
                </OrderDetailColumn>
                <OrderDetailColumn>
                    <OrderDetailText>{order?.id}</OrderDetailText>
                    <OrderDetailText>
                        {order?.createdAt
                            ? new Date(order?.createdAt).toLocaleDateString()
                            : "Error"}
                    </OrderDetailText>
                    <OrderDetailText>{order?.price}</OrderDetailText>
                    <OrderDetailText>
                        {order?.paymentMethod === "card" ? "Credit Card" : "Paypal"}
                    </OrderDetailText>
                </OrderDetailColumn>
            </OrderDetails>
            <OrdersHistoryButton onClick={() => router.push("/account")}>
                Orders history
            </OrdersHistoryButton>
        </Wrapper>
    );
};
const OrdersHistoryButton = styled.a`
    padding: 12px 40px;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    background-color: #141718;
    border-radius: 80px;
    cursor: pointer;
`;
const OrderDetailText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
`;
const OrderDetailTitle = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
`;
const OrderDetailColumn = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`;
const OrderDetails = styled.div`
    display: flex;
    column-gap: 32px;
`;
const OrderProducts = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 40px;
    width: 546px;
    overflow-x: auto;
    padding-bottom: 10px;
`;
const Subtitle = styled.p`
    color: #6c7275;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 28px;
    line-height: 34px;
    width: fit-content;
    text-align: center;
`;
const Title = styled.p`
    color: #23262f;
    text-align: center;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 40px;
    line-height: 44px;
    width: 492px;
`;
const TitleBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 80px 0;
    border-radius: 8px;
    row-gap: 40px;
    background-color: #ffffff;
    padding: 80px 95px;
    align-items: center;
    min-width: 738px;
    min-height: 730px;
    box-shadow: rgba(18, 18, 18, 0.1) 0 0 32px 0;
`;

export default OrderComplete;
