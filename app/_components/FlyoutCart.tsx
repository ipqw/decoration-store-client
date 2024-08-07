"use client";
import { useAppSelector } from "@/store/hooks";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import {
    Dispatch,
    FC,
    KeyboardEvent,
    KeyboardEventHandler,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import CartProduct from "./CartProduct";
import { ICartProduct } from "../_types/types";
import { useRouter } from "next/navigation";
import crossIcon from "@/public/icons/cross.svg";

interface IProps {
    isFlyoutCartVisible: boolean;
    setIsFlyoutCartVisible: Dispatch<SetStateAction<boolean>>;
}

const FlyoutCart: FC<IProps> = ({ isFlyoutCartVisible, setIsFlyoutCartVisible }) => {
    const router = useRouter();
    const [sortedCartProducts, setSortedCartProducts] = useState<ICartProduct[][]>([]);

    const user = useAppSelector((state) => state.user);
    const { data: cartProducts, refetch } = cartApiSlice.useGetCartProductsByCartIdQuery(
        user.cart?.id || 0,
    );
    const [sumOfDiscountPrices, setSumOfDiscountPrices] = useState<number>(0);

    const sortCartProducts = (elements: ICartProduct[]): ICartProduct[][] => {
        const result: ICartProduct[][] = [];
        elements.forEach((el) => {
            let existedElem;
            let indexOfExistedArray;
            result.forEach((resultEl, index) => {
                existedElem = resultEl.find((a) => a.productId === el.productId);
                if (existedElem) {
                    indexOfExistedArray = index;
                }
            });
            if (existedElem && typeof indexOfExistedArray === "number") {
                result[indexOfExistedArray].push(el);
            } else {
                result.push([el]);
            }
        });
        return result;
    };
    useEffect(() => {
        setSortedCartProducts(sortCartProducts(cartProducts || []));
        setSumOfDiscountPrices(() => {
            let sum = 0;
            cartProducts?.forEach((el) => {
                sum += el.product.discountPrice ? el.product.discountPrice : el.product.price;
            });
            return sum;
        });
    }, [cartProducts]);

    useEffect(() => {
        refetch();
    }, [isFlyoutCartVisible]);

    const handleTabKey: EventListener = (e: any) => {
        if (e.key === "Tab") {
            setIsFlyoutCartVisible(false);
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
        <Wrapper onClick={() => setIsFlyoutCartVisible(false)} $isVisible={isFlyoutCartVisible}>
            <Cart onClick={(e) => e.stopPropagation()} $isFlyoutCartVisible={isFlyoutCartVisible}>
                <CartTitleBlock>
                    <CartTitle>Cart</CartTitle>
                    <CrossIcon onClick={() => setIsFlyoutCartVisible(false)} src={crossIcon.src} />
                </CartTitleBlock>

                <CartProducts>
                    {sortedCartProducts?.map((el, index) => {
                        return <CartProduct key={index} cartProducts={el} />;
                    })}
                </CartProducts>
                <Summary>
                    <Subtotal>
                        <SubtotalText>Subtotal</SubtotalText>
                        <SubtotalPrice>
                            $
                            {sumOfDiscountPrices.toString().split(".")[1]
                                ? sumOfDiscountPrices
                                : `${sumOfDiscountPrices}.00`}
                        </SubtotalPrice>
                    </Subtotal>
                    <Total>
                        <TotalText>Total</TotalText>
                        <TotalPrice>
                            $
                            {sumOfDiscountPrices
                                ? (sumOfDiscountPrices + sumOfDiscountPrices * 0.15)
                                      .toString()
                                      .split(".")[1]
                                    ? sumOfDiscountPrices + sumOfDiscountPrices * 0.15
                                    : `${sumOfDiscountPrices + sumOfDiscountPrices * 0.15}.00`
                                : "0.00"}
                        </TotalPrice>
                    </Total>
                </Summary>
                <CheckOutButton onClick={() => router.push("/cart?checkout=1")}>
                    Checkout
                </CheckOutButton>
                <ViewCartButton onClick={() => router.push("/cart")}>View Cart</ViewCartButton>
            </Cart>
        </Wrapper>
    );
};
const CrossIcon = styled.img`
    display: flex;
    width: 24px;
    height: 24px;
    user-select: none;
    cursor: pointer;
    @media screen and (min-width: 650px) {
        display: none;
    }
`;
const CartTitleBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ViewCartButton = styled.p`
    font-size: 14px;
    width: fit-content;
    line-height: 22px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    color: #121212;
    border-bottom: 1px solid #121212;
    user-select: none;
    cursor: pointer;
    align-self: center;
`;
const CheckOutButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    border-radius: 6px;
    background-color: #141718;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
    user-select: none;
    margin-top: 16px;
    margin-bottom: 16px;
    cursor: pointer;
`;
const TotalPrice = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
`;
const TotalText = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
`;
const Total = styled.div`
    display: flex;
    justify-content: space-between;
    height: 52px;
    align-items: center;
`;
const SubtotalPrice = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
`;
const SubtotalText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
`;
const Subtotal = styled.div`
    display: flex;
    justify-content: space-between;
    height: 52px;
    align-items: center;
    border-bottom: 1px solid #e8ecef;
`;
const Summary = styled.div`
    display: flex;
    flex-direction: column;
`;
const CartProducts = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    height: 684px;
`;
const CartTitle = styled.p`
    color: #121212;
    font-family: "Poppins", sans-serif;
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
`;
const Cart = styled.div<{ $isFlyoutCartVisible: boolean }>`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 413px;
    height: 100vh;
    background-color: #ffffff;
    transition: 1s all;
    top: 0;
    right: ${({ $isFlyoutCartVisible }) => ($isFlyoutCartVisible ? "0px" : "413px")};
    animation-duration: 0.5s;
    animation-name: cartSlide;
    padding: 40px 24px;

    @keyframes cartSlide {
        from {
            right: -413px;
        }
        to {
            right: 0;
        }
    }
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

export default FlyoutCart;
