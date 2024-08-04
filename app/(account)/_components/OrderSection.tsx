"use client";
import { useAppSelector } from "@/store/hooks";
import { orderApiSlice } from "@/store/services/orderApiSlice";
import styled from "styled-components";
import OrderItem from "./OrderItem";

const OrderSection = () => {
    const user = useAppSelector((state) => state.user);
    const { data: orders } = orderApiSlice.useGetOrdersByUserIdQuery(user.id);
    return (
        <Wrapper>
            <Title>Orders History</Title>
            <OrdersBlock>
                <Caption>
                    <CaptionText>Number ID</CaptionText>
                    <CaptionText>Dates</CaptionText>
                    <CaptionText>Status</CaptionText>
                    <CaptionText>Price</CaptionText>
                </Caption>
                {orders?.map((el, index) => <OrderItem order={el} key={index} />)}
            </OrdersBlock>
        </Wrapper>
    );
};
const CaptionText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
`;
const Caption = styled.div`
    display: grid;
    grid-template-columns: 176.75px 176.75px 176.75px 176.75px;
    align-items: center;
    border-bottom: 1px #e8ecef solid;
    padding-bottom: 8px;
`;
const OrdersBlock = styled.div`
    display: flex;
    flex-direction: column;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    padding: 0 72px;
    min-width: 851px;
`;
const Title = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    line-height: 32px;
`;

export default OrderSection;
