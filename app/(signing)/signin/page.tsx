"use client";
import React, { FC, useState } from "react";
import styled from "styled-components";
import mainImage from "../../../public/images/signup/main-image.png";
import eyeIcon from "@/public/icons/eye.svg";

import Logo from "@/app/_components/Logo";
import CheckboxInput from "@/app/_components/CheckboxInput";
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
            typeof window !== "undefined" ? localStorage.removeItem("token") : "";
            login({
                email,
                password,
            }).then((res) => {
                if ("data" in res) {
                    typeof window !== "undefined"
                        ? localStorage.setItem("token", res.data.token)
                        : "";
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
const FormInputWrapper = styled.div<{ $outlined?: boolean; $checkbox?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ $checkbox }) => ($checkbox ? "fit-content" : "100%")};
    height: ${({ $checkbox }) => ($checkbox ? "min-content" : "40px")};
    border-bottom: ${({ $outlined, $checkbox }) =>
        !$checkbox && $outlined ? "none" : "#e8ecef 1px solid"};
    outline: ${({ $outlined }) => ($outlined ? "#ff0000 2px solid" : "none")};
    border-radius: 4px;
    margin-right: ${({ $checkbox }) => ($checkbox ? "12px" : "0")};
`;
const FormIcon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;
const FormInput = styled.input`
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
