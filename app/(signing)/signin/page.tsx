"use client";
import React, { FC, useState } from "react";
import styled from "styled-components";
import mainImage from "../../../public/images/signup/main-image.png";
import eyeIcon from "@/public/icons/eye.svg";

import Logo from "@/app/_components/Logo";
import CheckboxInput from "@/app/_components/CheckboxInput";
import {
    AgreementBlock,
    AgreementLink,
    AgreementText,
    Form,
    FormIcon,
    FormInput,
    FormInputWrapper,
    FormInputs,
    FormLink,
    FormText,
    FormTitle,
    LeftBlock,
    LogoWrapper,
    MainBlock,
    MainImage,
    RightBlock,
    SubmitButton,
    SubmitButtonText,
    Wrapper,
} from "../signup/page";

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
                    <FormTitle>Sign In</FormTitle>
                    <FormText>
                        Don’t have an accout yet? <FormLink href="./signup">Sign Up</FormLink>
                    </FormText>
                    <FormInputs>
                        <FormInput $border placeholder="Your username or email address" />
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
                        <OptionsBlock>
                            <RememberWrapper>
                                <CheckboxInput />
                                <RememberText>Remember me</RememberText>
                            </RememberWrapper>
                            <OptionsLink href="#">Forgot password?</OptionsLink>
                        </OptionsBlock>
                        <SubmitButton>
                            <SubmitButtonText>Sign In</SubmitButtonText>
                        </SubmitButton>
                    </FormInputs>
                </Form>
            </RightBlock>
        </Wrapper>
    );
};
const RememberWrapper = styled.div`
    display: flex;
`;
const RememberText = styled(AgreementText)``;
const OptionsLink = styled(AgreementLink)``;
const OptionsBlock = styled(AgreementBlock)`
    display: flex;
    justify-content: space-between;
`;
export default SignUp;
