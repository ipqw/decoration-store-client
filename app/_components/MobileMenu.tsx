import { Dispatch, FC, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import crossIcon from "@/public/icons/cross.svg";
import { usePathname, useRouter } from "next/navigation";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import { useAppSelector } from "@/store/hooks";
import shoppingBagIcon from "@/public/icons/shoppingBag.svg";

interface IProps {
    isMobileMenuVisible: boolean;
    setIsMobileMenuVisible: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu: FC<IProps> = ({ isMobileMenuVisible, setIsMobileMenuVisible }) => {
    const pathname = usePathname();
    const user = useAppSelector((state) => state.user);
    const { data: cartProducts } = cartApiSlice.useGetCartProductsByCartIdQuery(user.cart?.id || 0);
    const router = useRouter();

    const handleTabKey: EventListener = (e: any) => {
        if (e.key === "Tab") {
            setIsMobileMenuVisible(false);
        }
    };
    useEffect(() => {
        typeof document !== "undefined" ? document.addEventListener("keydown", handleTabKey) : "";

        return () => {
            typeof document !== "undefined"
                ? document.removeEventListener("keydown", handleTabKey)
                : "";
        };
    }, []);
    return (
        <Wrapper onClick={() => setIsMobileMenuVisible(false)} $isVisible={isMobileMenuVisible}>
            <Menu onClick={(e) => e.stopPropagation()} $isFlyoutCartVisible={isMobileMenuVisible}>
                <TopBlock>
                    <LogoBlock>
                        <Logo small />
                        <CrossIcon
                            onClick={() => setIsMobileMenuVisible(false)}
                            src={crossIcon.src}
                        />
                    </LogoBlock>
                    <NavBlock>
                        <NavLink onClick={() => router.push("/")} $active={pathname === "/"}>
                            Home
                        </NavLink>
                        <NavLink
                            onClick={() => router.push("/shop")}
                            $active={pathname === "/shop"}>
                            Shop
                        </NavLink>
                        <NavLink $active={pathname.includes("/product")}>Product</NavLink>
                        <NavLink
                            onClick={() => router.push("/contact-us")}
                            $active={pathname === "/contact-us"}>
                            Contact Us
                        </NavLink>
                    </NavBlock>
                </TopBlock>
                <BottomBlock>
                    <CartBlock onClick={() => router.push("/cart")}>
                        <CartText>Cart</CartText>
                        <IconsBlock>
                            <Icon src={shoppingBagIcon.src} />
                            <NumberIcon>
                                <NumberTextIcon>{cartProducts?.length || 0}</NumberTextIcon>
                            </NumberIcon>
                        </IconsBlock>
                    </CartBlock>
                    <SignInButton $isVisible={!user.id ? true : false}>Sign In</SignInButton>
                </BottomBlock>
            </Menu>
        </Wrapper>
    );
};
const SignInButton = styled.div<{ $isVisible: boolean }>`
    background-color: #141718;
    border-radius: 6px;
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
`;
const IconsBlock = styled.div`
    display: flex;
    column-gap: 5px;
    width: fit-content;
`;
const NumberTextIcon = styled.p`
    font-size: 12px;
    font-family: "Inter", sans-serif;
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
const CartText = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
    color: #6c7275;
`;
const CartBlock = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid #e8ecef;
    cursor: pointer;
`;
const NavLink = styled.p<{ $active?: boolean }>`
    font-family: "Inter", sans-serif;
    font-weight: ${({ $active }) => ($active ? "700" : "500")};
    font-size: 14px;
    color: ${({ $active }) => ($active ? "#000000" : "#141718")};
    line-height: 24px;
    border-bottom: #e8ecef 1px solid;
    padding-bottom: 16px;
    cursor: pointer;
`;
const NavBlock = styled.nav`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    padding-top: 32px;
`;
const Wrapper = styled.div<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    position: absolute;
    background-color: rgba(0, 0, 0, 0.32);
    width: 100vw;
    height: 100vh;
    z-index: 5;
    top: 0;
`;
const CrossIcon = styled.img`
    width: 24px;
    height: 24px;
`;
const LogoBlock = styled.div`
    display: flex;
    justify-content: space-between;
`;
const TopBlock = styled.div`
    display: flex;
    flex-direction: column;
`;
const BottomBlock = styled.div``;
const Menu = styled.div<{ $isFlyoutCartVisible: boolean }>`
    width: 343px;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    position: absolute;
    left: ${({ $isFlyoutCartVisible }) => ($isFlyoutCartVisible ? "0px" : "-343px")};
    flex-direction: column;
    padding: 24px;
    justify-content: space-between;
    transition: 1s all;
    top: 0;
    animation-duration: 0.5s;
    animation-name: menuSlide;
    @keyframes menuSlide {
        from {
            left: -343px;
        }
        to {
            left: 0;
        }
    }
`;

export default MobileMenu;
