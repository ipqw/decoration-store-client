import React, { FC } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Link from "next/link";
import youtubeIcon from "../../public/icons/youtube.svg";
import facebookIcon from "../../public/icons/facebook.svg";
import instagramIcon from "../../public/icons/instagram.svg";

const Footer: FC = () => {
    return (
        <Wrapper>
            <FooterContent>
                <TopBlock>
                    <LogoBlock>
                        <Logo maincolor="#ffffff" />
                        <LogoText>Gift & Decoration Store</LogoText>
                    </LogoBlock>
                    <NavBlock>
                        <NavLink href={"./"}>Home</NavLink>
                        <NavLink href={"./shop"}>Shop</NavLink>
                        <NavLink href={""}>Product</NavLink>
                        <NavLink href={"./contact-us"}>Contact us</NavLink>
                    </NavBlock>
                </TopBlock>
                <BottomBlock>
                    <PolicyBlock>
                        <PolicyText>Copyright © 2023 3legant. All rights reserved</PolicyText>
                        <PolicyLink href="#">Privacy Policy</PolicyLink>
                        <PolicyLink href="#">Terms of Use</PolicyLink>
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
    width: 485px;
    height: 20px;
`;
const BottomBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1120px;
    border-top: 0.5px solid #6c7275;
    padding-top: 15px;
`;
const LogoBlock = styled.div`
    display: flex;
    align-items: center;
`;
const TopBlock = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1120px;
    padding-bottom: 50px;
`;
const NavBlock = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 392px;
    width: 100%;
    align-items: center;
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
    height: 24px;
    font-weight: 400;
    border-left: 1px solid #6c7275;
    padding-left: 32px;
    margin-left: 32px;
`;
const Wrapper = styled.div`
    background-color: #000000;
    display: flex;
    width: 100%;
    justify-content: center;
`;
const FooterContent = styled.div`
    max-width: 1120px;
    padding-top: 80px;
    padding-bottom: 30px;
`;
export default Footer;
