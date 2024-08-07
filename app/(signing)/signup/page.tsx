"use client";
import { FC, useState } from "react";
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
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [agreement, setAgreement] = useState<boolean>(false);
    const [isFirstAttempt, setIsFirstAttempt] = useState<boolean>(true);

    const [createUser, { isLoading: isLoadingCreateUser }] = userApiSlice.useCreateUserMutation();
    const submitButtonHandler = () => {
        if (name && username && email && password && agreement && !isLoadingCreateUser) {
            typeof window !== "undefined" ? localStorage.removeItem("token") : "";
            createUser({
                email,
                firstName: name.split(" ")[0],
                displayName: username,
                lastName: name.split(" ")[1],
                password,
            }).then((res) => {
                if ("data" in res) {
                    typeof window !== "undefined"
                        ? localStorage.setItem("token", res.data.token)
                        : "";
                    router.push("/");
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
                    <FormTitle>Sign up</FormTitle>
                    <FormText>
                        Already have an account?{" "}
                        <FormLink onClick={() => router.push("/signin")}>Sign in</FormLink>
                    </FormText>
                    <FormInputs>
                        <FormInputWrapper $outlined={!name && !isFirstAttempt ? true : false}>
                            <FormInput
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name (first and last name)"
                            />
                        </FormInputWrapper>
                        <FormInputWrapper $outlined={!username && !isFirstAttempt ? true : false}>
                            <FormInput
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </FormInputWrapper>
                        <FormInputWrapper $outlined={!email && !isFirstAttempt ? true : false}>
                            <FormInput
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                            />
                        </FormInputWrapper>
                        <FormInputWrapper $outlined={!password && !isFirstAttempt ? true : false}>
                            <FormInput
                                type={isVisiblePassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <FormIcon
                                onClick={() => setIsVisiblePassword((value) => !value)}
                                src={eyeIcon.src}
                            />
                        </FormInputWrapper>
                        <AgreementBlock>
                            <FormInputWrapper
                                $checkbox
                                $outlined={!agreement && !isFirstAttempt ? true : false}>
                                <CheckboxInput
                                    outlined={!agreement && !isFirstAttempt ? true : false}
                                    isActive={agreement}
                                    setIsActive={setAgreement}
                                />
                            </FormInputWrapper>
                            <AgreementText>
                                I agree with <AgreementLink>Privacy Policy</AgreementLink> and{" "}
                                <AgreementLink>Terms of Use</AgreementLink>
                            </AgreementText>
                        </AgreementBlock>
                        <SubmitButton onClick={submitButtonHandler}>
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
    justify-content: center;
    padding-left: 0;
    width: 375px;
    padding-top: 40px;
    padding-bottom: 40px;
    @media screen and (min-width: 1120px) {
        padding-top: 0;
        padding-left: 88px;
        justify-content: flex-start;
        width: 50%;
        padding-bottom: 0;
    }
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
    width: 312px;
    @media screen and (min-width: 1120px) {
        width: 456px;
    }
`;

const LeftBlock = styled.aside`
    display: flex;
    background-color: #f3f5f7;
    justify-content: center;
    width: 375px;
    height: 430px;
    @media screen and (min-width: 1120px) {
        justify-content: flex-end;
        width: 50%;
        height: auto;
    }
`;
const LogoWrapper = styled.div`
    position: absolute;
    top: 32px;
    right: 135px;
    @media screen and (min-width: 1120px) {
        right: 316px;
    }
`;
const MainImage = styled.img`
    max-width: 100%;
    max-height: 430px;
    @media screen and (min-width: 1120px) {
        max-height: 100%;
        max-width: 736px;
    }
`;
const MainBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    @media screen and (min-width: 1120px) {
        width: auto;
        display: block;
    }
`;

const Wrapper = styled.div`
    display: flex;
    max-height: fit-content;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: 1120px) {
        max-height: 100vh;
        flex-direction: row;
    }
`;

export default SignUp;
