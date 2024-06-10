"use client";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import AccountSection from "../_components/AccountSection";
import { useRouter } from "next/navigation";

const AccountPage: FC = () => {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<
        "account" | "address" | "orders" | "wishlist"
    >("account");
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.replace("/signin");
        }
    }, []);
    return (
        <Wrapper>
            <Title>My Account</Title>
            <ContentBlock>{activeSection === "account" && <AccountSection />}</ContentBlock>
        </Wrapper>
    );
};
const ContentBlock = styled.div`
    display: flex;
`;
const Title = styled.p`
    color: #000000;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 54px;
    line-height: 58px;
    padding: 80px 0;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 80px;
`;

export default AccountPage;
