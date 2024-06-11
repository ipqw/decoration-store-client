"use client";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import AccountSection from "../_components/AccountSection";
import { useRouter } from "next/navigation";
import blankAvatar from "@/public/icons/blankAvatar.png";
import cameraIcon from "@/public/icons/account/camera.svg";
import { useAppSelector } from "@/store/hooks";

const AccountPage: FC = () => {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<
        "account" | "address" | "orders" | "wishlist"
    >("account");

    const user = useAppSelector((state) => state.user);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.replace("/signin");
        }
    }, []);
    return (
        <Wrapper>
            <Title>My Account</Title>
            <ContentBlock>
                <MenuBlock>
                    <ProfileBlock>
                        <ProfileImageWrapper>
                            <ProfileImage src={user?.imageUrl ? user.imageUrl : blankAvatar.src} />
                            <CameraIconWrapper>
                                <CameraIcon src={cameraIcon.src} />
                            </CameraIconWrapper>
                        </ProfileImageWrapper>
                        <Name>
                            {user.firstName} {user.lastName}
                        </Name>
                    </ProfileBlock>
                    <MenuSectionsBlock>
                        <MenuSection
                            onClick={() => setActiveSection("account")}
                            $isActive={activeSection === "account"}>
                            Account
                        </MenuSection>
                        <MenuSection
                            onClick={() => setActiveSection("address")}
                            $isActive={activeSection === "address"}>
                            Address
                        </MenuSection>
                        <MenuSection
                            onClick={() => setActiveSection("orders")}
                            $isActive={activeSection === "orders"}>
                            Orders
                        </MenuSection>
                        <MenuSection
                            onClick={() => setActiveSection("wishlist")}
                            $isActive={activeSection === "wishlist"}>
                            Wishlist
                        </MenuSection>
                        <MenuSection
                            onClick={() => {
                                localStorage.removeItem("token");
                                router.replace("/signin");
                            }}>
                            Log Out
                        </MenuSection>
                    </MenuSectionsBlock>
                </MenuBlock>
                {activeSection === "account" && <AccountSection />}
            </ContentBlock>
        </Wrapper>
    );
};
const MenuSection = styled.p<{ $isActive?: boolean }>`
    border-bottom: ${({ $isActive }) => ($isActive ? "1px solid #141718" : "none")};
    color: ${({ $isActive }) => ($isActive ? "#141718" : "#6C7275")};
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    padding: 8px 0;
    cursor: pointer;
`;
const MenuSectionsBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    width: 100%;
`;
const Name = styled.p`
    color: #000000;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
`;
const CameraIcon = styled.img`
    width: 16px;
    height: 16px;
`;
const CameraIconWrapper = styled.div`
    background-color: #141718;
    border: 1.5px solid #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    height: 30px;
    width: 30px;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
`;
const ProfileImage = styled.img`
    border-radius: 58px;
    width: 80px;
    height: 80px;
`;
const ProfileImageWrapper = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
`;
const ProfileBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 6px;
`;
const MenuBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 16px;
    row-gap: 40px;
    background-color: #f3f5f7;
    height: fit-content;
    width: fit-content;
    min-width: 262px;
    align-items: center;
    border-radius: 8px;
`;
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
