"use client";
import { useAppSelector } from "@/store/hooks";
import { userApiSlice } from "@/store/services/userApiSlice";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const AccountSection = () => {
    const user = useAppSelector(({ user }) => user);
    const [updateUser, { isLoading: isLoadingUpdatingUser }] = userApiSlice.useUpdateUserMutation();

    // form values
    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    const [displayName, setDisplayName] = useState<string>(user?.displayName || "");
    const [email, setEmail] = useState<string>(user.firstName);
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setDisplayName(user?.displayName || "");
        setEmail(user.email);
    }, [user]);

    const [isOldPasswordOutlined, setIsOldPasswordOutlined] = useState<boolean>(false);
    const [isRepeatNewPasswordOutlined, setIsRepeatNewPasswordOutlined] = useState<boolean>(false);

    const saveChanges = () => {
        if (newPassword || oldPassword) {
            if (repeatNewPassword === newPassword) {
                setIsRepeatNewPasswordOutlined(false);
                updateUser({
                    id: user.id,
                    firstName,
                    lastName,
                    displayName,
                    email,
                    oldPassword,
                    password: newPassword,
                }).then((res) => {
                    if ("error" in res) {
                        setIsOldPasswordOutlined(true);
                    } else if ("data" in res) {
                        setIsOldPasswordOutlined(false);
                    }
                });
            } else {
                setIsRepeatNewPasswordOutlined(true);
            }
        } else {
            updateUser({ id: user.id, firstName, lastName, displayName, email });
        }
    };
    return (
        <Wrapper>
            <FormWrapper>
                <Title>Account Details</Title>
                <InputWrapper>
                    <InputTitle>FIRST NAME</InputTitle>
                    <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputTitle>LAST NAME</InputTitle>
                    <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputTitle>DISPLAY NAME</InputTitle>
                    <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Display name"
                    />
                    <ItalicText>
                        This will be how your name will be displayed in the account section and in
                        reviews
                    </ItalicText>
                </InputWrapper>
                <InputWrapper>
                    <InputTitle>EMAIL</InputTitle>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </InputWrapper>
            </FormWrapper>
            <FormWrapper>
                <Title>Password</Title>
                <InputWrapper>
                    <InputTitle>OLD PASSWORD</InputTitle>
                    <Input
                        type="password"
                        $outlined={isOldPasswordOutlined}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Old password"
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputTitle>NEW PASSWORD</InputTitle>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                    />
                </InputWrapper>
                <InputWrapper>
                    <InputTitle>REPEAT NEW PASSWORD</InputTitle>
                    <Input
                        type="password"
                        $outlined={isRepeatNewPasswordOutlined}
                        value={repeatNewPassword}
                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                        placeholder="Repeat new password"
                    />
                </InputWrapper>
                <SubmitButton onClick={saveChanges}>Save changes</SubmitButton>
            </FormWrapper>
        </Wrapper>
    );
};
const SubmitButton = styled.div`
    border-radius: 8px;
    background-color: #141718;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 40px;
    width: fit-content;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    user-select: none;
    cursor: pointer;
`;
const ItalicText = styled.p`
    font-style: italic;
    font-size: 12px;
    font-family: "Inter", sans-serif;
    line-height: 20px;
    color: #6c7275;
`;
const Input = styled.input<{ $outlined?: boolean }>`
    padding: 7px 16px;
    height: 40px;
    border-radius: 6px;
    border: ${({ $outlined }) => ($outlined ? "#ff0000 2px solid" : "1px solid #cbcbcb")};
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
`;
const InputTitle = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 12px;
`;
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
`;
const Title = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
    color: #000000;
`;
const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 72px;
    row-gap: 40px;
`;

export default AccountSection;
