"use client";
import { months } from "@/app/_lib/constants";
import { IOrder } from "@/app/_types/types";
import { FC } from "react";
import styled from "styled-components";

const OrderItem: FC<{ order: IOrder }> = ({ order }) => {
    const date = new Date(order.createdAt);
    return (
        <Wrapper>
            <AsideWrapper $title>
                <Title>Number ID</Title>
                <Title>Date</Title>
                <Title>Status</Title>
                <Title>Price</Title>
            </AsideWrapper>
            <AsideWrapper>
                <Value>#{order.id}</Value>
                <Value>
                    {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
                </Value>
                <Value>
                    {order.status[0].toUpperCase()}
                    {order.status.slice(1)}
                </Value>
                <Value>${order.price}</Value>
            </AsideWrapper>
        </Wrapper>
    );
};
const Title = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
`;
const AsideWrapper = styled.aside<{ $title?: boolean }>`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 150px;
    @media screen and (min-width: 1120px) {
        flex-direction: row;
        width: auto;
        display: ${({ $title }) => ($title ? "none" : "grid")};
        grid-template-columns: 176.75px 176.75px 176.75px 176.75px;
    }
`;
const Value = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    border-bottom: 1px #e8ecef solid;
`;

export default OrderItem;
