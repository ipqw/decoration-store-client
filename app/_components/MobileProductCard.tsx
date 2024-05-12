"use client";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { IProduct } from "../_types/types";

import noImageIcon from "@/public/icons/no-image.ico";
import fullStarIcon from "@/public/icons/fullStar.svg";
import emptyStarIcon from "@/public/icons/emptyStar.svg";
import wishlistIcon from "@/public/icons/product/Wishlist.svg";
import filledWishlistIcon from "@/public/icons/product/FilledWishlist.svg";
import { wishlistApiSlice } from "@/store/services/wishlistApiSlice";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import { useAppSelector } from "@/store/hooks";

interface IProps {
    product: IProduct;
    variation: "horizontal" | "vertical";
}

const MobileProductCard: FC<IProps> = ({ product, variation }) => {
    const user = useAppSelector((state) => state.user);
    const [isAddedToWishlistBtn, setIsAddedToWishlistBtn] = useState<boolean>(false);

    useEffect(() => {
        setIsAddedToWishlistBtn(
            user.wishlist?.wishlist_products?.find((el) => el.productId === Number(product.id))
                ? true
                : false,
        );
    }, [user, product]);

    // mutations
    const [createWishlistProduct, { isLoading: isLoadingCreateWishlistProduct }] =
        wishlistApiSlice.useCreateWishlistProductMutation();
    const [deleteWishlistProduct, { isLoading: isLoadingDeleteWishlistProduct }] =
        wishlistApiSlice.useDeleteWishlistProductMutation();

    const [createCartProduct, { isLoading: isLoadingCreateCartProduct }] =
        cartApiSlice.useCreateCartProductMutation();

    const wishlistButtonHandler = () => {
        if (isAddedToWishlistBtn && user?.wishlist && product) {
            if (!isLoadingDeleteWishlistProduct) {
                deleteWishlistProduct({ productId: product.id, wishlistId: user.wishlist.id });
                setIsAddedToWishlistBtn(false);
            }
        } else {
            if (!isLoadingCreateWishlistProduct && product && user?.wishlist) {
                createWishlistProduct({ productId: product?.id, wishlistId: user.wishlist.id });
                setIsAddedToWishlistBtn(true);
            }
        }
    };
    const cartButtonHandler = () => {
        if (!isLoadingCreateCartProduct && user?.cart && product) {
            createCartProduct({ productId: product.id, cartId: user.cart.id, amount: 1 });
        }
    };
    return (
        <Wrapper $variation={variation}>
            <ImageWrapper>
                <LabelWrapper>
                    <NewLabel
                        $isNew={Date.now() - new Date(product.createdAt).getTime() < 604800000}>
                        <NewLabelText>NEW</NewLabelText>
                    </NewLabel>
                    <DiscountLabel $discount={product.discount ? true : false}>
                        <DiscountLabelText>-{product.discount?.percent}%</DiscountLabelText>
                    </DiscountLabel>
                </LabelWrapper>
                <Image
                    alt="product image"
                    src={product.images?.length ? product.images[0] : noImageIcon.src}
                />
            </ImageWrapper>
            <InfoWrapper $variation={variation}>
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
                <Text>{product?.product_infos?.find((el) => el.name === "about")?.text}</Text>
                <ButtonsWrapper>
                    <CartButton onClick={cartButtonHandler}>
                        <CartText>Add to cart</CartText>
                    </CartButton>
                    <WishlistButton onClick={wishlistButtonHandler}>
                        <WishlistIcon
                            src={isAddedToWishlistBtn ? filledWishlistIcon.src : wishlistIcon.src}
                        />
                        <WishlistText>Wishlist</WishlistText>
                    </WishlistButton>
                </ButtonsWrapper>
            </InfoWrapper>
        </Wrapper>
    );
};
const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const WishlistIcon = styled.img`
    width: 20px;
    height: 20px;
`;
const WishlistText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
`;
const WishlistButton = styled.div`
    display: flex;
    width: fit-content;
    justify-content: center;
    align-items: center;
    height: 32px;
    column-gap: 4px;
    margin-top: 4px;
    cursor: pointer;
`;
const CartText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    color: #fefefe;
`;
const CartButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    height: 46px;
    background-color: #141718;
    cursor: pointer;
    margin: 8px;
`;
const Text = styled.p`
    font-family: "Inter", sans-serif;
    text-decoration: none;
    font-size: 14px;
    line-height: 22px;
    color: #6c7275;
    font-weight: 400;
    padding-bottom: 24px;
`;
const Title = styled.a`
    font-family: "Inter", sans-serif;
    text-decoration: none;
    font-size: 16px;
    line-height: 26px;
    color: #141718;
    font-weight: 600;
    padding-bottom: 4px;
    cursor: pointer;
`;
const PriceWrapper = styled.div`
    display: flex;
    width: fit-content;
    column-gap: 12px;
    justify-content: space-between;
    padding-bottom: 16px;
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
    padding-bottom: 16px;
`;
const InfoWrapper = styled.div<{ $variation: "horizontal" | "vertical" }>`
    display: flex;
    flex-direction: column;
    width: ${({ $variation }) => ($variation === "horizontal" ? "50%" : "100%")};
    height: 100%;
    padding: 24px;
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
    height: 349px;
    align-items: center;
    justify-content: center;
    background-color: #f3f5f7;
`;

const Wrapper = styled.div<{ $variation: "horizontal" | "vertical" }>`
    display: flex;
    width: ${({ $variation }) => ($variation === "horizontal" ? "548px" : "312px")};
    flex-direction: ${({ $variation }) => ($variation === "horizontal" ? "row" : "column")};
`;

export default MobileProductCard;
