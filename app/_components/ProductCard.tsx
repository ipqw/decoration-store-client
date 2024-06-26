import { IProduct } from "@/app/_types/types";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import noImageIcon from "@/public/icons/no-image.ico";
import fullStarIcon from "@/public/icons/fullStar.svg";
import emptyStarIcon from "@/public/icons/emptyStar.svg";
import { useAppSelector } from "@/store/hooks";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import { useRouter } from "next/navigation";
import { imageLinkHandler } from "../_global";

const ProductCard: FC<{ product: IProduct }> = ({ product }) => {
    const [isVisibleCartButton, setIsVisibleCartButton] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    const [createCartProduct, { isLoading: isLoadingCreateCartProduct }] =
        cartApiSlice.useCreateCartProductMutation();

    const cartButtonHandler = () => {
        if (!isLoadingCreateCartProduct && user?.cart && product) {
            createCartProduct({ productId: product.id, cartId: user.cart.id, amount: 1 });
        }
    };
    return (
        <Wrapper>
            <ImageWrapper
                onMouseOver={() => setIsVisibleCartButton(true)}
                onMouseLeave={() => setIsVisibleCartButton(false)}>
                <LabelWrapper>
                    <NewLabel
                        $isNew={Date.now() - new Date(product.createdAt).getTime() < 604800000}>
                        <NewLabelText>NEW</NewLabelText>
                    </NewLabel>
                    <DiscountLabel $discount={product.discount ? true : false}>
                        <DiscountLabelText>-{product.discount?.percent}%</DiscountLabelText>
                    </DiscountLabel>
                </LabelWrapper>
                <CartButton onClick={cartButtonHandler} $isVisible={isVisibleCartButton}>
                    <CartText>Add to cart</CartText>
                </CartButton>
                <Image
                    draggable={false}
                    alt="product image"
                    src={
                        product.images?.length
                            ? imageLinkHandler(product.images[0])
                            : noImageIcon.src
                    }
                />
            </ImageWrapper>
            <InfoWrapper>
                <StarsWrapper>
                    <Star
                        src={
                            (product?.product_group?.averageRate || 0) >= 1
                                ? fullStarIcon.src
                                : emptyStarIcon.src
                        }
                    />
                    <Star
                        src={
                            (product?.product_group?.averageRate || 0) >= 2
                                ? fullStarIcon.src
                                : emptyStarIcon.src
                        }
                    />
                    <Star
                        src={
                            (product?.product_group?.averageRate || 0) >= 3
                                ? fullStarIcon.src
                                : emptyStarIcon.src
                        }
                    />
                    <Star
                        src={
                            (product?.product_group?.averageRate || 0) >= 4
                                ? fullStarIcon.src
                                : emptyStarIcon.src
                        }
                    />
                    <Star
                        src={
                            (product?.product_group?.averageRate || 0) >= 5
                                ? fullStarIcon.src
                                : emptyStarIcon.src
                        }
                    />
                </StarsWrapper>
                <Title href={`./product/${product.id}`}>{product.name}</Title>
                <PriceWrapper>
                    <Price>
                        $
                        {product.discountPrice
                            ? product.discountPrice.toString().split(".")[1]
                                ? product.discountPrice
                                : `${product.discountPrice}.00`
                            : product.price.toString().split(".")[1]
                              ? product.price
                              : `${product.price}.00`}
                    </Price>
                    <OldPrice $isVisible={product.discountPrice ? true : false}>
                        $
                        {product.price.toString().split(".")[1]
                            ? product.price
                            : `${product.price}.00`}
                    </OldPrice>
                </PriceWrapper>
            </InfoWrapper>
        </Wrapper>
    );
};
const CartButton = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    bottom: 16px;
    left: 16px;
    width: 230px;
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    opacity: ${({ $isVisible }) => ($isVisible ? "100%" : "0%")};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    height: 46px;
    background-color: #141718;
    cursor: pointer;
`;
const CartText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    color: #fefefe;
    user-select: none;
`;
const Title = styled.a`
    font-family: "Inter", sans-serif;
    text-decoration: none;
    font-size: 16px;
    line-height: 26px;
    color: #141718;
    font-weight: 600;
    cursor: pointer;
`;
const PriceWrapper = styled.div`
    display: flex;
    width: fit-content;
    column-gap: 12px;
    justify-content: space-between;
`;
const Price = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
`;
const OldPrice = styled.p<{ $isVisible: boolean }>`
    visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    text-decoration: line-through;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 12px;
`;
const Star = styled.img`
    height: 16px;
    width: 16px;
`;
const StarsWrapper = styled.div`
    width: 88px;
    height: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 262px;
    height: 72px;
`;
const LabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 16px;
    left: 16px;
    width: 71px;
    height: 56px;
`;
const NewLabelText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    color: #141718;
`;
const NewLabel = styled.div<{ $isNew: boolean }>`
    display: ${({ $isNew }) => ($isNew ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    width: 71px;
    height: 24px;
    border-radius: 4px;
    background-color: #ffffff;
`;
const DiscountLabelText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    color: #fefefe;
`;
const DiscountLabel = styled.div<{ $discount: boolean }>`
    display: ${({ $discount }) => ($discount ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    width: 71px;
    height: 24px;
    border-radius: 4px;
    background-color: #38cb89;
`;
const Image = styled.img`
    max-width: 262px;
    max-height: 349px;
`;
const ImageWrapper = styled.div`
    display: flex;
    position: relative;
    width: 262px;
    user-select: none;
    height: 349px;
    align-items: center;
    justify-content: center;
    background-color: #f3f5f7;
`;

export default ProductCard;
