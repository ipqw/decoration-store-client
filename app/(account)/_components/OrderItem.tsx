"use client";
import { months } from "@/app/_lib/constants";
import { IOrder } from "@/app/_types/types";
import React, { FC } from "react";
import styled from "styled-components";

const OrderItem: FC<{ order: IOrder }> = ({ order }) => {
    const date = new Date(order.createdAt);
    return (
        <Wrapper>
            <Text>#{order.id}</Text>
            <Text>
                {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
            </Text>
            <Text>
                {order.status[0].toUpperCase()}
                {order.status.slice(1)}
            </Text>
            <Text>{order.price}</Text>
        </Wrapper>
    );
};
const Text = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
`;
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 176.75px 176.75px 176.75px 176.75px;
    align-items: center;
    padding: 24px 0;
    border-bottom: 1px #e8ecef solid;
`;

export default OrderItem;
