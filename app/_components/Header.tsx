import styled from "styled-components";
import Link from "next/link";
import searchIcon from "../../public/icons/search.svg";
import userIcon from "../../public/icons/user-circle.svg";
import shoppingBagIcon from "../../public/icons/shoppingBag.svg";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { Dispatch, FC, SetStateAction } from "react";
import { useAppSelector } from "@/store/hooks";
import { cartApiSlice } from "@/store/services/cartApiSlice";

interface IProps {
    setIsFlyoutCartVisible?: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<IProps> = ({ setIsFlyoutCartVisible }) => {
    const pathname = usePathname();
    const router = useRouter();
    const user = useAppSelector((state) => state.user);
    const { data: cartProducts } = cartApiSlice.useGetCartProductsByCartIdQuery(user.cart?.id || 0);
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
                        href="">
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
                    {/* <Icon src={searchIcon.src} /> */}
                    <Icon
                        src={userIcon.src}
                        onClick={() => {
                            (typeof window !== "undefined" ? localStorage.getItem("token") : false)
                                ? router.replace("/account")
                                : router.replace("/signin");
                        }}
                    />
                    <CartIcons>
                        <Icon
                            onClick={() =>
                                setIsFlyoutCartVisible ? setIsFlyoutCartVisible(true) : null
                            }
                            src={shoppingBagIcon.src}
                        />
                        <NumberIcon>
                            <NumberTextIcon className="inter">
                                {cartProducts?.length || 0}
                            </NumberTextIcon>
                        </NumberIcon>
                    </CartIcons>
                </IconsBlock>
            </HeaderContent>
        </Wrapper>
    );
};
const CartIcons = styled.div`
    display: flex;
    column-gap: 5px;
    align-items: center;
    justify-content: center;
`;
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
    min-width: 24px;
    height: 24px;
    padding: 5px 6px;
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
    display: flex;
    column-gap: 16px;
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
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
`;
const NavBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 324px;
`;
export default Header;
