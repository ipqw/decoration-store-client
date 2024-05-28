"use client";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import RadioVariant from "./RadioVariant";
import { ICartProduct } from "@/app/_types/types";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import { useAppSelector } from "@/store/hooks";
import CartProduct from "@/app/_components/CartProduct";

interface IProps {
    activeShippingVariant: number;
}

const Checkout: FC<IProps> = ({ activeShippingVariant }) => {
    const [paymentMethod, setPaymentMethod] = useState<number>(0);

    const [sortedCartProducts, setSortedCartProducts] = useState<ICartProduct[][]>([]);

    const user = useAppSelector((state) => state.user);
    const { data: cartProducts, refetch } = cartApiSlice.useGetCartProductsByCartIdQuery(
        user.cart?.id || 0,
    );
    const [sumOfDiscountPrices, setSumOfDiscountPrices] = useState<number>(0);

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

    // prices
    const deliveryPrice = 15;

    const subtotalPrice = sumOfDiscountPrices.toString().split(".")[1]
        ? sumOfDiscountPrices
        : `${sumOfDiscountPrices}.00`;

    const totalPrice = sumOfDiscountPrices
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
        : "0.00";
    return (
        <Wrapper>
            <Form>
                <FormSection>
                    <FormSectionTitle>Contact Infomation</FormSectionTitle>
                    <FlexWrapper>
                        <InputWrapper>
                            <InputTitle>FIRST NAME</InputTitle>
                            <Input placeholder="First name" />
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>LAST NAME</InputTitle>
                            <Input placeholder="Last name" />
                        </InputWrapper>
                    </FlexWrapper>
                    <InputWrapper>
                        <InputTitle>PHONE NUMBER</InputTitle>
                        <Input type="number" $fullWidth placeholder="Phone number" />
                    </InputWrapper>
                    <InputWrapper>
                        <InputTitle>EMAIL ADDRESS</InputTitle>
                        <Input $fullWidth placeholder="Your Email" />
                    </InputWrapper>
                </FormSection>
                <FormSection>
                    <FormSectionTitle>Shipping Address</FormSectionTitle>
                    <InputWrapper>
                        <InputTitle>STREET ADDRESS *</InputTitle>
                        <Input $fullWidth placeholder="Stress Address" />
                    </InputWrapper>
                    <InputWrapper>
                        <InputTitle>COUNTRY *</InputTitle>
                        <Input $fullWidth placeholder="Country" />
                    </InputWrapper>
                    <InputWrapper>
                        <InputTitle>TOWN / CITY *</InputTitle>
                        <Input $fullWidth placeholder="Town / City" />
                    </InputWrapper>
                    <FlexWrapper>
                        <InputWrapper>
                            <InputTitle>STATE</InputTitle>
                            <Input placeholder="State" />
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>ZIP CODE</InputTitle>
                            <Input placeholder="Zip Code" />
                        </InputWrapper>
                    </FlexWrapper>
                </FormSection>
                <FormSection>
                    <FormSectionTitle>Payment method</FormSectionTitle>
                    <RadioWrapper>
                        <RadioVariant
                            activeRadioVariant={paymentMethod}
                            setActiveRadioVariant={setPaymentMethod}
                            index={0}
                            title="Pay by Card Credit"
                        />
                        <RadioVariant
                            activeRadioVariant={paymentMethod}
                            setActiveRadioVariant={setPaymentMethod}
                            index={1}
                            title="Paypal"
                        />
                    </RadioWrapper>
                    {paymentMethod === 0 && (
                        <>
                            <InputWrapper>
                                <InputTitle>CARD NUMBER</InputTitle>
                                <Input type="number" $fullWidth placeholder="1234123412341234" />
                            </InputWrapper>
                            <FlexWrapper>
                                <InputWrapper>
                                    <InputTitle>EXPIRATION DATE</InputTitle>
                                    <Input placeholder="MM/YY" />
                                </InputWrapper>
                                <InputWrapper>
                                    <InputTitle>CVC</InputTitle>
                                    <Input type="number" placeholder="CVC Code" />
                                </InputWrapper>
                            </FlexWrapper>
                        </>
                    )}
                    {paymentMethod === 1 && (
                        <>
                            <InputWrapper>
                                <InputTitle>EMAIL</InputTitle>
                                <Input $fullWidth placeholder="Email" />
                            </InputWrapper>
                            <InputWrapper>
                                <InputTitle>PASSWORD</InputTitle>
                                <Input $fullWidth placeholder="Password" />
                            </InputWrapper>
                        </>
                    )}
                </FormSection>
                <PlaceOrderButton>Place Order</PlaceOrderButton>
            </Form>
            <OrderSummary>
                <OrderSummaryTitle>Order summary</OrderSummaryTitle>
                <CartProducts>
                    {sortedCartProducts?.map((el, index) => {
                        return <CartProduct key={index} cartProducts={el} />;
                    })}
                </CartProducts>
                <PriceBlock>
                    <PriceWrapper $border>
                        <PriceTitle>Shipping</PriceTitle>
                        <PriceText>
                            {activeShippingVariant === 0 ? "Free" : "$" + deliveryPrice + ".00"}
                        </PriceText>
                    </PriceWrapper>
                    <PriceWrapper $border>
                        <PriceTitle>Subtotal</PriceTitle>
                        <PriceText>${subtotalPrice}</PriceText>
                    </PriceWrapper>
                    <PriceWrapper>
                        <TotalPriceText>Total</TotalPriceText>
                        <TotalPriceText>${totalPrice}</TotalPriceText>
                    </PriceWrapper>
                </PriceBlock>
            </OrderSummary>
        </Wrapper>
    );
};
const TotalPriceText = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
`;
const PriceText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
`;
const PriceTitle = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
`;
const PriceWrapper = styled.div<{ $border?: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 13px 0;
    border-bottom: ${({ $border }) => ($border ? "1px solid #E8ECEF" : "none")};
`;
const PriceBlock = styled.div`
    display: flex;
    flex-direction: column;
`;
const CartProducts = styled.div`
    display: flex;
    flex-direction: column;
`;
const OrderSummary = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    border-radius: 6px;
    border: 1px solid #6c7275;
    padding: 16px 24px;
    height: fit-content;
`;
const OrderSummaryTitle = styled.p`
    color: #121212;
    font-family: "Poppins", sans-serif;
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
`;
const PlaceOrderButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 100%;
    padding: 12px;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    background-color: #141718;
    user-select: none;
    cursor: pointer;
`;
const RadioWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    padding-bottom: 32px;
    border-bottom: 1px solid #6c7275;
`;
const Input = styled.input<{ $fullWidth?: boolean }>`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    border: 1px solid #cbcbcb;
    border-radius: 6px;
    padding: 7px 16px;
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "285.5px")};
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
    }
`;
const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
`;
const InputTitle = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 12px;
`;
const FormSectionTitle = styled.p`
    color: #000000;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
`;
const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 24px;
    row-gap: 24px;
    border-radius: 4px;
    border: #6c7275 1px solid;
`;
const Form = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    width: 643px;
`;
const Wrapper = styled.div`
    display: flex;
    padding-top: 80px;
    padding-bottom: 160px;
    column-gap: 64px;
`;

export default Checkout;
