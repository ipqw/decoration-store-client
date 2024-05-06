"use client";
import React, { FC, useState } from "react";
import styled from "styled-components";
import signupBackground from "@/public/images/homepage/signup-background.png";
import emailIcon from "../../public/icons/email-icon.svg";

const NewsletterSection: FC = () => {
    const [value, setValue] = useState<string>("");
    const signUpButtonHandler = () => {
        setValue("");
    };
    return (
        <Wrapper>
            <SignUpContent>
                <Title>Join Our Newsletter</Title>
                <Text>Sign up for deals, new products and promotions</Text>
                <Block>
                    <Icon src={emailIcon.src} />
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Email address"
                    />
                    <Button onClick={signUpButtonHandler}>Signup</Button>
                </Block>
            </SignUpContent>
        </Wrapper>
    );
};

const Button = styled.a`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    cursor: pointer;
    user-select: none;
`;
const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 8px;
    user-select: none;
`;
const Input = styled.input`
    &::placeholder {
        color: #6c7275;
        font-family: "Inter", sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
    }
    background-color: transparent;
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    width: 396px;
    &:focus {
        border: none;
        outline: none;
    }
`;
const Block = styled.div`
    display: flex;
    align-items: center;
    width: 488px;
    height: 52px;
    border-bottom: 1px solid #6c7275;
`;
const Text = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    margin-bottom: 32px;
`;
const Title = styled.p`
    color: #141718;
    font-weight: 500;
    margin-bottom: 8px;
    font-family: "Poppins", sans-serif;
    font-size: 40px;
    line-height: 44px;
`;
const SignUpContent = styled.div`
    width: 540px;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${signupBackground.src});
    background-repeat: no-repeat;
    background-position-x: center;
    width: 100%;
    height: 360px;
`;

export default NewsletterSection;
