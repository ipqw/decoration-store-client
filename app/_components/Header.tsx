import styled from "styled-components";
import Link from "next/link";
import searchIcon from "../../public/icons/search.svg";
import userIcon from "../../public/icons/user-circle.svg";
import shoppingBagIcon from "../../public/icons/shoppingBag.svg";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { FC } from "react";

const Header: FC = () => {
    const pathname = usePathname();
    return (
        <Wrapper>
            <HeaderContent>
                <Logo />
                <NavBlock>
                    <StyledLink
                        style={{ color: pathname === "/" ? "#000000" : "#6C7275" }}
                        className="space-grotesk"
                        href="/">
                        Home
                    </StyledLink>
                    <StyledLink
                        style={{ color: pathname === "/shop" ? "#000000" : "#6C7275" }}
                        className="space-grotesk"
                        href="/shop">
                        Shop
                    </StyledLink>
                    <StyledLink
                        style={{ color: pathname.includes("/product") ? "#000000" : "#6C7275" }}
                        className="space-grotesk"
                        href="/product">
                        Product
                    </StyledLink>
                    <StyledLink
                        style={{ color: pathname === "/contact-us" ? "#000000" : "#6C7275" }}
                        className="space-grotesk"
                        href="/contact-us">
                        Contact us
                    </StyledLink>
                </NavBlock>
                <IconsBlock>
                    <Icon src={searchIcon.src} />
                    <Icon src={userIcon.src} />
                    <Icon src={shoppingBagIcon.src} />
                    <NumberIcon>
                        <NumberTextIcon className="inter">2</NumberTextIcon>
                    </NumberIcon>
                </IconsBlock>
            </HeaderContent>
        </Wrapper>
    );
};

const StyledLink = styled(Link)`
    font-weight: 500;
    font-size: 14px;
`;

const NumberTextIcon = styled.p`
    font-size: 12px;
    font-weight: bold;
    line-height: 10px;
    user-select: none;
`;
const NumberIcon = styled.div`
    background: #000000;
    color: #ffffff;
    border-radius: 90px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
`;
const Icon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;
const IconsBlock = styled.div`
    max-width: 130px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const HeaderContent = styled.div`
    max-width: 1120px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 0;
`;
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const NavBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 324px;
`;
export default Header;
