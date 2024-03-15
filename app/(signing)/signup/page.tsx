"use client";
import React, { FC, useState } from "react";
import styled from "styled-components";
import mainImage from "../../../public/images/signup/main-image.png";
import eyeIcon from "@/public/icons/eye.svg";

import Logo from "@/app/_components/Logo";
import CheckboxInput from "@/app/_components/CheckboxInput";

const SignUp: FC = () => {
    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
    return (
        <Wrapper>
            <LeftBlock>
                <MainBlock>
                    <LogoWrapper>
                        <Logo />
                    </LogoWrapper>
                    <LogoWrapper></LogoWrapper>
                    <MainImage src={mainImage.src} />
                </MainBlock>
            </LeftBlock>
            <RightBlock>
                <Form>
                    <FormTitle>Sign up</FormTitle>
                    <FormText>
                        Already have an account? <FormLink href="./signin">Sign in</FormLink>
                    </FormText>
                    <FormInputs>
                        <FormInput $border placeholder="Your name"></FormInput>
                        <FormInput $border placeholder="Username"></FormInput>
                        <FormInput $border placeholder="Email address" />
                        <FormInputWrapper>
                            <FormInput
                                type={isVisiblePassword ? "text" : "password"}
                                $border={false}
                                placeholder="Password"
                            />
                            <FormIcon
                                onClick={() => setIsVisiblePassword((value) => !value)}
                                src={eyeIcon.src}
                            />
                        </FormInputWrapper>
                        <AgreementBlock>
                            <CheckboxInput />
                            <AgreementText>
                                I agree with <AgreementLink>Privacy Policy</AgreementLink> and{" "}
                                <AgreementLink>Terms of Use</AgreementLink>
                            </AgreementText>
                        </AgreementBlock>
                        <SubmitButton>
                            <SubmitButtonText>Sign Up</SubmitButtonText>
                        </SubmitButton>
                    </FormInputs>
                </Form>
            </RightBlock>
        </Wrapper>
    );
};
const SubmitButton = styled.div`
    width: 100%;
    border-radius: 8px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #141718;
    cursor: pointer;
    user-select: none;
`;
const SubmitButtonText = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    color: #ffffff;
`;
const AgreementText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
`;
const AgreementLink = styled.a`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    cursor: pointer;
`;
const AgreementBlock = styled.div`
    display: flex;
`;
const RightBlock = styled.aside`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 88px;
    width: 50%;
`;
const FormInputs = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 32px;
`;
const FormInputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: #e8ecef 1px solid;
`;
const FormIcon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;
const FormInput = styled.input<{ $border: boolean }>`
    &::placeholder {
        color: #6c7275;
        font-family: "Inter", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 26px;
    }
    background-color: transparent;
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    width: 100%;
    height: 40px;
    border-bottom: ${({ $border }) => ($border ? "#e8ecef 1px solid" : "none")};
    &:focus {
        outline: none;
    }
`;
const FormText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color: #6c7275;
    margin-bottom: 32px;
`;
const FormLink = styled.a`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    color: #38cb89;
`;
const FormTitle = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 40px;
    line-height: 44px;
    margin-bottom: 24px;
`;
const Form = styled.div`
    width: 456px;
`;

const LeftBlock = styled.aside`
    display: flex;
    justify-content: flex-end;
    background-color: #f3f5f7;
    width: 50%;
`;
const LogoWrapper = styled.div`
    position: absolute;
    right: 316px;
    top: 32px;
`;
const MainImage = styled.img`
    max-width: 736px;
    max-height: 100%;
`;
const MainBlock = styled.div`
    position: relative;
`;

const Wrapper = styled.div`
    display: flex;
    max-height: 100vh;
`;

export default SignUp;
