"use client";
import { ICartProduct } from "@/app/_types/types";
import React, { FC, useState } from "react";
import styled from "styled-components";
import Counter from "@/app/_components/Counter";

import noImageIcon from "@/public/icons/no-image.ico";
import crossIcon from "@/public/icons/cross.svg";

interface IProps {
    cartProducts: ICartProduct[];
}

const CartProduct: FC<IProps> = ({ cartProducts }) => {
    const color = cartProducts[0].product?.product_infos?.find((el) => el.name === "color")?.text;
    const [counter, setCounter] = useState<number>(cartProducts.length);
    return (
        <Wrapper>
            <ImageWrapper>
                <Image
                    src={
                        cartProducts[0].product.images?.length
                            ? cartProducts[0].product.images[0]
                            : noImageIcon.src
                    }
                    alt="product image"
                />
            </ImageWrapper>
            <InfoBlock>
                <Name>{cartProducts[0].product.name}</Name>
                <Color>
                    Color: {color ? color[0].toUpperCase() + color.substring(1) : "undefined"}
                </Color>
                <RemoveButton>
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
        </Wrapper>
    );
};
const SubtotalPrice = styled.p`
    color: #121212;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 30px;
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
`;
const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 7px 0;
    margin-left: 16px;
    width: 215px;
    height: 96px;
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
const Wrapper = styled.div`
    display: flex;
    padding: 24px 0;
    align-items: center;
`;

export default CartProduct;
