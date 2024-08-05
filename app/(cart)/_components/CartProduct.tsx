"use client";
import { ICartProduct } from "@/app/_types/types";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Counter from "@/app/_components/Counter";

import noImageIcon from "@/public/icons/no-image.ico";
import crossIcon from "@/public/icons/cross.svg";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import { useAppSelector } from "@/store/hooks";
import { imageLinkHandler } from "@/app/_lib/functions";
import { redirect, useRouter } from "next/navigation";

interface IProps {
    cartProducts: ICartProduct[];
}

const CartProduct: FC<IProps> = ({ cartProducts }) => {
    const router = useRouter();
    const product = cartProducts[0].product;

    const user = useAppSelector((state) => state.user);
    const [deleteCartProduct, { isLoading: isLoadingDeletingCartProduct }] =
        cartApiSlice.useDeleteCartProductMutation();
    const [createCartProduct, { isLoading: isLoadingCreatingCartProduct }] =
        cartApiSlice.useCreateCartProductMutation();

    const color = cartProducts[0].product?.product_infos?.find((el) => el.name === "color")?.text;
    const [counter, setCounter] = useState<number>(cartProducts.length);

    const removeButtonHandler = () => {
        cartProducts.forEach((el) => {
            deleteCartProduct(el.id);
        });
    };

    useEffect(() => {
        if (counter > cartProducts.length) {
            if (!isLoadingCreatingCartProduct && user?.cart && product) {
                createCartProduct({ productId: product.id, cartId: user.cart.id, amount: 1 });
            }
        } else if (counter < cartProducts.length) {
            if (!isLoadingDeletingCartProduct && user?.cart && product) {
                deleteCartProduct(cartProducts[0].id);
            }
        }
    }, [counter]);

    useEffect(() => {
        setCounter(cartProducts.length);
    }, [cartProducts]);
    return (
        <Wrapper>
            <MainVersion>
                <ImageWrapper>
                    <Image
                        src={
                            cartProducts[0].product.images?.length
                                ? imageLinkHandler(cartProducts[0].product.images[0])
                                : noImageIcon.src
                        }
                        alt="product image"
                    />
                </ImageWrapper>
                <InfoBlock>
                    <Name onClick={() => router.push(`product/${cartProducts[0].product.id}`)}>
                        {cartProducts[0].product.name}
                    </Name>
                    <Color>
                        Color: {color ? color[0].toUpperCase() + color.substring(1) : "undefined"}
                    </Color>
                    <RemoveButton onClick={removeButtonHandler}>
                        <RemoveButtonIcon src={crossIcon.src} />
                        <RemoveButtonText>Remove</RemoveButtonText>
                    </RemoveButton>
                </InfoBlock>
                <InfoWrapper>
                    <Counter small counter={counter} setCounter={setCounter} />
                    <Price>
                        $
                        {cartProducts[0].product.discountPrice
                            ? cartProducts[0].product.discountPrice.toString().split(".")[1]
                                ? cartProducts[0].product.discountPrice
                                : `${cartProducts[0].product.discountPrice}.00`
                            : cartProducts[0].product.price.toString().split(".")[1]
                              ? cartProducts[0].product.price
                              : `${cartProducts[0].product.price}.00`}
                    </Price>
                    <SubtotalPrice>
                        $
                        {cartProducts[0].product.discountPrice
                            ? (cartProducts[0].product.discountPrice * cartProducts.length)
                                  .toString()
                                  .split(".")[1]
                                ? cartProducts[0].product.discountPrice * cartProducts.length
                                : `${cartProducts[0].product.discountPrice * cartProducts.length}.00`
                            : (cartProducts[0].product.price * cartProducts.length)
                                    .toString()
                                    .split(".")[1]
                              ? cartProducts[0].product.price * cartProducts.length
                              : `${cartProducts[0].product.price * cartProducts.length}.00`}
                    </SubtotalPrice>
                </InfoWrapper>
            </MainVersion>
            <MobileVersion>
                <ImageWrapper>
                    <Image
                        src={
                            cartProducts[0].product.images?.length
                                ? imageLinkHandler(cartProducts[0].product.images[0])
                                : noImageIcon.src
                        }
                        alt="product image"
                    />
                </ImageWrapper>
                <MobileInfoWrapper>
                    <InfoBlock>
                        <Name onClick={() => router.push(`product/${cartProducts[0].product.id}`)}>
                            {cartProducts[0].product.name}
                        </Name>
                        <Color>
                            Color:{" "}
                            {color ? color[0].toUpperCase() + color.substring(1) : "undefined"}
                        </Color>
                        <Counter small counter={counter} setCounter={setCounter} />
                    </InfoBlock>
                    <PriceBlock>
                        <SubtotalPrice>
                            $
                            {cartProducts[0].product.discountPrice
                                ? (cartProducts[0].product.discountPrice * cartProducts.length)
                                      .toString()
                                      .split(".")[1]
                                    ? cartProducts[0].product.discountPrice * cartProducts.length
                                    : `${cartProducts[0].product.discountPrice * cartProducts.length}.00`
                                : (cartProducts[0].product.price * cartProducts.length)
                                        .toString()
                                        .split(".")[1]
                                  ? cartProducts[0].product.price * cartProducts.length
                                  : `${cartProducts[0].product.price * cartProducts.length}.00`}
                        </SubtotalPrice>
                        <RemoveButtonIcon src={crossIcon.src} onClick={removeButtonHandler} />
                    </PriceBlock>
                </MobileInfoWrapper>
            </MobileVersion>
        </Wrapper>
    );
};
const MobileInfoWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
const PriceBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: flex-end;
    justify-self: flex-end;
`;
const MobileVersion = styled.div`
    display: flex;
    padding: 24px 0;
    width: 295px;
    justify-content: flex-start;
    border-bottom: 1px solid #e8ecef;
    @media screen and (min-width: 1120px) {
        display: none;
    }
`;
const Wrapper = styled.div``;
const SubtotalPrice = styled.p`
    color: #121212;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    @media screen and (min-width: 1120px) {
        font-size: 18px;
        line-height: 30px;
    }
`;
const Price = styled.p`
    color: #121212;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
`;
const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 328px;
`;
const RemoveButtonText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
`;
const RemoveButtonIcon = styled.img`
    width: 24px;
    height: 24px;
`;
const RemoveButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const Color = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
`;
const Name = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
`;
const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
    padding-bottom: 6px;
    margin-left: 16px;
    width: fit-content;
    height: 96px;
    @media screen and (min-width: 1120px) {
        padding: 7px 0;
        width: 215px;
    }
`;
const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 96px;
    background-color: #f3f5f7;
`;
const MainVersion = styled.div`
    display: none;
    padding: 24px 0;
    align-items: center;
    @media screen and (min-width: 1120px) {
        display: flex;
    }
`;

export default CartProduct;
