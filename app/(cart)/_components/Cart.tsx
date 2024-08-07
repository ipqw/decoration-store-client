"use client";
import { useAppSelector } from "@/store/hooks";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import CartProduct from "./CartProduct";
import { ICartProduct } from "@/app/_types/types";
import ShippingVariant from "./RadioVariant";

interface IProps {
    setActiveProcess: Dispatch<SetStateAction<number>>;
    activeShippingVariant: number;
    setActiveShippingVariant: Dispatch<SetStateAction<number>>;
    sortedCartProducts: ICartProduct[][];
    setSortedCartProducts: Dispatch<SetStateAction<ICartProduct[][]>>;
}

const Cart: FC<IProps> = ({
    setActiveProcess,
    activeShippingVariant,
    setActiveShippingVariant,
    sortedCartProducts,
    setSortedCartProducts,
}) => {
    const [sumOfDiscountPrices, setSumOfDiscountPrices] = useState<number>(0);
    const deliveryPrice = 15;

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
        setSumOfDiscountPrices(() => {
            let sum = 0;
            cartProducts?.forEach((el) => {
                sum += el.product.discountPrice ? el.product.discountPrice : el.product.price;
            });
            return sum;
        });
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
                {sortedCartProducts.length === 0 && (
                    <EmptyCartText>Your cart is empty</EmptyCartText>
                )}
            </CartBlock>
            <SummaryBlock>
                <SummaryTitle>Cart summary</SummaryTitle>
                <ShippingVariants>
                    <ShippingVariant
                        index={0}
                        title="Free shipping"
                        text="$0.00"
                        activeRadioVariant={activeShippingVariant}
                        setActiveRadioVariant={setActiveShippingVariant}
                    />
                    <ShippingVariant
                        index={1}
                        title="Express shipping"
                        text="$15.00"
                        activeRadioVariant={activeShippingVariant}
                        setActiveRadioVariant={setActiveShippingVariant}
                    />
                </ShippingVariants>
                <PriceBlock $border>
                    <SubtotalTitle>Subtotal</SubtotalTitle>
                    <SubtotalPrice>
                        $
                        {sumOfDiscountPrices.toString().split(".")[1]
                            ? sumOfDiscountPrices
                            : `${sumOfDiscountPrices}.00`}
                    </SubtotalPrice>
                </PriceBlock>
                <PriceBlock>
                    <TotalTitle>Total</TotalTitle>
                    <TotalPrice>
                        $
                        {sumOfDiscountPrices
                            ? (
                                  sumOfDiscountPrices +
                                  (activeShippingVariant === 1 ? deliveryPrice : 0) +
                                  sumOfDiscountPrices * 0.15
                              )
                                  .toString()
                                  .split(".")[1]
                                ? sumOfDiscountPrices +
                                  (activeShippingVariant === 1 ? deliveryPrice : 0) +
                                  sumOfDiscountPrices * 0.15
                                : `${sumOfDiscountPrices + (activeShippingVariant === 1 ? deliveryPrice : 0) + sumOfDiscountPrices * 0.15}.00`
                            : "0.00"}
                    </TotalPrice>
                </PriceBlock>
                <CheckoutButton
                    onClick={() => {
                        sortedCartProducts.length ? setActiveProcess(1) : "";
                    }}>
                    Checkout
                </CheckoutButton>
            </SummaryBlock>
        </Wrapper>
    );
};
const EmptyCartText = styled.p`
    color: #121212;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 30px;
    line-height: 30px;
    align-self: center;
    margin-top: 70px;
    margin-bottom: 70px;
    @media screen and (min-width: 1120px) {
        margin-bottom: 0;
    }
`;
const CheckoutButton = styled.div`
    display: flex;
    user-select: none;
    cursor: pointer;
    margin-top: 32px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: #141718;
    border-radius: 8px;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
`;
const TotalPrice = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
    @media screen and (min-width: 1120px) {
        font-weight: 600;
        font-size: 20px;
        line-height: 32px;
    }
`;
const TotalTitle = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
    @media screen and (min-width: 1120px) {
        font-weight: 600;
        font-size: 20px;
        line-height: 32px;
    }
`;
const PriceBlock = styled.div<{ $border?: boolean }>`
    display: flex;
    padding: 13px 0;
    align-items: center;
    justify-content: space-between;
    border-bottom: ${({ $border }) => ($border ? "1px #eaeaea solid" : "none")};
`;
const SubtotalPrice = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    line-height: 24px;
    font-weight: 700;
    @media screen and (min-width: 1120px) {
        font-size: 16px;
        font-weight: 600;
        line-height: 26px;
    }
`;
const SubtotalTitle = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    line-height: 24px;
    font-weight: 700;
    @media screen and (min-width: 1120px) {
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
    }
`;
const ShippingVariants = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    padding-bottom: 16px;
`;
const SummaryTitle = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    padding-bottom: 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    @media screen and (min-width: 1120px) {
        font-family: "Poppins", sans-serif;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
    }
`;
const SummaryBlock = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    padding: 16px;
    border: 1px solid #6c7275;
    height: fit-content;
    @media screen and (min-width: 1120px) {
        padding: 24px;
    }
`;
const ColumnTitlesWrapper = styled.div`
    display: none;
    justify-content: space-between;
    width: 322px;
    @media screen and (min-width: 1120px) {
        display: flex;
    }
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
    width: 100%;
    flex-direction: column;
    @media screen and (min-width: 1120px) {
        width: 643px;
    }
`;
const Wrapper = styled.div`
    display: flex;
    column-gap: 64px;
    padding: 40px 0 80px 0;
    flex-direction: column;
    width: 312px;
    @media screen and (min-width: 1120px) {
        flex-direction: row;
        width: 100%;
        padding: 80px 0;
    }
`;

export default Cart;
