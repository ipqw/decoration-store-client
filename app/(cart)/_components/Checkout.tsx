"use client";
import React, { useState } from "react";
import styled from "styled-components";
import RadioVariant from "./RadioVariant";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState<number>(0);
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
                </FormSection>
                <PlaceOrderButton>Place Order</PlaceOrderButton>
            </Form>
        </Wrapper>
    );
};
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
`;

export default Checkout;
