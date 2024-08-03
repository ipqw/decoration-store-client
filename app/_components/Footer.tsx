import React, { FC } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Link from "next/link";
import youtubeIcon from "../../public/icons/youtube.svg";
import facebookIcon from "../../public/icons/facebook.svg";
import instagramIcon from "../../public/icons/instagram.svg";
import { useWindowSize } from "../_lib/hooks";

const Footer: FC = () => {
    const windowSize = useWindowSize();
    return (
        <Wrapper>
            <FooterContent>
                <TopBlock>
                    <LogoBlock>
                        <Logo maincolor="#ffffff" />
                        <HorizontalLine $isVisible={windowSize.width < 1440} />
                        <LogoText>Gift & Decoration Store</LogoText>
                    </LogoBlock>
                    <NavBlock>
                        <NavLink href={"/"}>Home</NavLink>
                        <NavLink href={"/shop"}>Shop</NavLink>
                        <NavLink href={""}>Product</NavLink>
                        <NavLink href={"/contact-us"}>Contact us</NavLink>
                    </NavBlock>
                </TopBlock>
                <BottomBlock>
                    <PolicyBlock>
                        <PolicyText>Copyright © 2023 3legant. All rights reserved</PolicyText>
                        <PolicyLinkBlock>
                            <PolicyLink href="#">Privacy Policy</PolicyLink>
                            <PolicyLink href="#">Terms of Use</PolicyLink>
                        </PolicyLinkBlock>
                    </PolicyBlock>
                    <SocialBlock>
                        <Icon src={instagramIcon.src} />
                        <Icon src={facebookIcon.src} />
                        <Icon src={youtubeIcon.src} />
                    </SocialBlock>
                </BottomBlock>
            </FooterContent>
        </Wrapper>
    );
};
const PolicyLinkBlock = styled.div`
    display: flex;
    column-gap: 28px;
`;
const HorizontalLine = styled.div<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
    width: 24px;
    height: 1px;
    background-color: #6c7275;
    margin-top: 16px;
`;
const Icon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;
const SocialBlock = styled.div`
    width: 120px;
    display: flex;
    justify-content: space-between;
`;
const PolicyLink = styled(Link)`
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: #fefefe;
    font-size: 12px;
    line-height: 20px;
`;
const PolicyText = styled.div`
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: #e8ecef;
`;
const PolicyBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    row-gap: 28px;
    flex-direction: column-reverse;
    @media screen and (min-width: 1440px) {
        flex-direction: row;
        height: 20px;
        width: 485px;
    }
`;
const BottomBlock = styled.div`
    display: flex;
    justify-content: space-between;
    row-gap: 32px;
    flex-direction: column-reverse;
    align-items: center;
    border-top: 0.5px solid #6c7275;
    padding-top: 24px;
    width: fit-content;
    @media screen and (min-width: 1440px) {
        flex-direction: row;
        padding-top: 15px;
        width: 1120px;
    }
`;
const LogoBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media screen and (min-width: 1440px) {
        flex-direction: row;
    }
`;
const TopBlock = styled.div`
    display: flex;
    justify-content: center;
    width: 1120px;
    align-items: center;
    padding-bottom: 50px;
    flex-direction: column;
    row-gap: 40px;
    @media screen and (min-width: 1440px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;
const NavBlock = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 392px;
    width: 100%;
    align-items: center;
    flex-direction: column;
    row-gap: 32px;
    @media screen and (min-width: 1440px) {
        flex-direction: row;
    }
`;
const NavLink = styled(Link)`
    font-family: "Inter", sans-serif;
    color: #fefefe;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
`;
const LogoText = styled.p`
    color: #e8ecef;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    line-height: 22px;
    font-weight: 400;
    padding-top: 16px;
    @media screen and (min-width: 1440px) {
        border-left: 1px solid #6c7275;
        padding-left: 32px;
        padding-top: 0;
        margin-left: 32px;
        height: 24px;
    }
`;
const Wrapper = styled.div`
    background-color: #000000;
    display: flex;
    width: 100%;
    justify-content: center;
`;
const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1120px;
    padding-top: 80px;
    padding-bottom: 30px;
`;
export default Footer;
