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
import { userApiSlice } from "@/store/services/userApiSlice";
import { useRouter } from "next/navigation";

const SignUp: FC = () => {
    const router = useRouter();

    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);
    const [isFirstAttempt, setIsFirstAttempt] = useState<boolean>(true);

    const [login, { isLoading: isLoadingLogin }] = userApiSlice.useLoginMutation();

    const submitButtonHandler = () => {
        if (email && password && !isLoadingLogin) {
            localStorage.clear();
            login({
                email,
                password,
            }).then((res) => {
                if ("data" in res) {
                    localStorage.setItem("token", res.data.token);
                    router.replace("/");
                }
                return null;
            });
        } else {
            setIsFirstAttempt(false);
        }
    };

    return (
        <Wrapper>
            <LeftBlock>
                <MainBlock>
                    <LogoWrapper>
                        <Logo />
                    </LogoWrapper>
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
                        <FormInputWrapper $outlined={!email && !isFirstAttempt ? true : false}>
                            <FormInput
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                            />
                        </FormInputWrapper>
                        <FormInputWrapper $outlined={!password && !isFirstAttempt ? true : false}>
                            <FormInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={isVisiblePassword ? "text" : "password"}
                                placeholder="Password"
                            />
                            <FormIcon
                                onClick={() => setIsVisiblePassword((value) => !value)}
                                src={eyeIcon.src}
                            />
                        </FormInputWrapper>
                        <OptionsBlock>
                            <RememberWrapper>
                                <FormInputWrapper $outlined={false} $checkbox>
                                    <CheckboxInput
                                        outlined={false}
                                        isActive={remember}
                                        setIsActive={setRemember}
                                    />
                                </FormInputWrapper>
                                <RememberText>Remember me</RememberText>
                            </RememberWrapper>
                            <OptionsLink href="#">Forgot password?</OptionsLink>
                        </OptionsBlock>
                        <SubmitButton onClick={submitButtonHandler}>
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
