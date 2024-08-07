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
                    <OrderDetailText>${order?.price}</OrderDetailText>
                    <OrderDetailText>
                        {order?.paymentMethod === "card" ? "Credit Card" : "Paypal"}
                    </OrderDetailText>
                </OrderDetailColumn>
            </OrderDetails>
            <MobileOrderDetails>
                <MobileOrderDetailBlock>
                    <MobileOrderDetailTitle>Order code:</MobileOrderDetailTitle>
                    <MobileOrderDetailText>{order?.id}</MobileOrderDetailText>
                </MobileOrderDetailBlock>
                <MobileOrderDetailBlock>
                    <MobileOrderDetailTitle>Date:</MobileOrderDetailTitle>
                    <MobileOrderDetailText>
                        {order?.createdAt
                            ? new Date(order?.createdAt).toLocaleDateString()
                            : "Error"}
                    </MobileOrderDetailText>
                </MobileOrderDetailBlock>
                <MobileOrderDetailBlock>
                    <MobileOrderDetailTitle>Total:</MobileOrderDetailTitle>
                    <MobileOrderDetailText>${order?.price}</MobileOrderDetailText>
                </MobileOrderDetailBlock>
                <MobileOrderDetailBlock>
                    <MobileOrderDetailTitle>Payment method:</MobileOrderDetailTitle>
                    <MobileOrderDetailText>
                        {order?.paymentMethod === "card" ? "Credit Card" : "Paypal"}
                    </MobileOrderDetailText>
                </MobileOrderDetailBlock>
            </MobileOrderDetails>
            <OrdersHistoryButton onClick={() => router.push("/account")}>
                Orders history
            </OrdersHistoryButton>
        </Wrapper>
    );
};
const MobileOrderDetailBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8ecef;
`;
const MobileOrderDetailText = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #141718;
`;
const MobileOrderDetailTitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    color: #6c7275;
`;
const MobileOrderDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 16px;
    @media screen and (min-width: 1120px) {
        display: none;
    }
`;
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
    display: none;
    column-gap: 32px;
    @media screen and (min-width: 1120px) {
        display: flex;
    }
`;
const OrderProducts = styled.div`
    display: flex;
    justify-content: flex-start;
    max-width: 280px;
    overflow-x: auto;
    column-gap: 8px;
    padding-bottom: 10px;
    flex-wrap: wrap;

    @media screen and (min-width: 1120px) {
        column-gap: 40px;
        max-width: 546px;
    }
`;
const Subtitle = styled.p`
    color: #6c7275;
    font-family: "Poppins", sans-serif;
    width: fit-content;
    text-align: start;
    font-size: 16px;
    line-height: 26px;
    font-weight: 600;
    @media screen and (min-width: 1120px) {
        font-weight: 500;
        text-align: center;
        font-size: 28px;
        line-height: 34px;
    }
`;
const Title = styled.p`
    font-family: "Poppins", sans-serif;
    color: #23262f;
    font-weight: 500;
    font-size: 34px;
    line-height: 38px;
    width: fit-content;
    text-align: start;
    @media screen and (min-width: 1120px) {
        font-size: 40px;
        line-height: 44px;
        width: 492px;
        text-align: center;
    }
`;
const TitleBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    @media screen and (min-width: 1120px) {
        align-items: center;
    }
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 40px 0;
    row-gap: 40px;
    border-radius: 4px;
    background-color: #ffffff;
    align-items: flex-start;
    min-width: 312px;
    min-height: fit-content;
    box-shadow: rgba(18, 18, 18, 0.1) 0 0 32px 0;
    padding: 16px;
    align-items: center;
    @media screen and (min-width: 1120px) {
        min-height: 784px;
        margin: 80px 0;
        border-radius: 8px;
        padding: 80px 95px;
        min-width: 738px;
        min-height: 730px;
    }
`;

export default OrderComplete;
