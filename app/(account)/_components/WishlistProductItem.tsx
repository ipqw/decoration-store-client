"use client";
import React, { FC } from "react";
import styled from "styled-components";
import crossIcon from "@/public/icons/cross.svg";
import { IWishlistProduct } from "@/app/_types/types";
import { useAppSelector } from "@/store/hooks";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import { wishlistApiSlice } from "@/store/services/wishlistApiSlice";
import { imageLinkHandler } from "@/app/_lib/functions";

const WishlistProductItem: FC<{ wishlistProduct: IWishlistProduct }> = ({ wishlistProduct }) => {
    const user = useAppSelector((state) => state.user);
    const [createCartProduct, { isLoading: isLoadingCreatingCartProduct }] =
        cartApiSlice.useCreateCartProductMutation();
    const [deleteWishlistProduct, { isLoading: isLoadingDeletingWishlistProduct }] =
        wishlistApiSlice.useDeleteWishlistProductMutation();

    const color =
        wishlistProduct.product?.product_infos?.find((el) => el.name === "color")?.text || "";

    const addToCart = () => {
        if (!isLoadingCreatingCartProduct && user?.cart && wishlistProduct.product) {
            createCartProduct({
                productId: wishlistProduct.product.id,
                cartId: user.cart.id,
                amount: 1,
            });
        }
    };
    const deleteButtonHandler = () => {
        if (!isLoadingDeletingWishlistProduct) {
            deleteWishlistProduct({
                wishlistId: wishlistProduct.wishlistId,
                productId: wishlistProduct.productId,
            });
        }
    };
    return (
        <Wrapper>
            <DeleteButton onClick={deleteButtonHandler} src={crossIcon.src} />
            <Content>
                <InfoBlock>
                    <InfoImageWrapper>
                        <InfoImage
                            alt="image"
                            src={
                                wishlistProduct?.product?.images
                                    ? imageLinkHandler(wishlistProduct?.product?.images[0])
                                    : ""
                            }
                        />
                    </InfoImageWrapper>
                    <TextInfoBlock>
                        <Title>{wishlistProduct.product.name}</Title>
                        <Color>
                            Color: {color[0].toUpperCase()}
                            {color.slice(1)}
                        </Color>
                    </TextInfoBlock>
                </InfoBlock>
                <Price>
                    $
                    {wishlistProduct.product?.discountPrice
                        ? wishlistProduct.product?.discountPrice.toString().split(".")[1]
                            ? wishlistProduct.product?.discountPrice
                            : `${wishlistProduct.product?.discountPrice}.00`
                        : wishlistProduct.product?.price.toString().split(".")[1]
                          ? wishlistProduct.product?.price
                          : `${wishlistProduct.product?.price}.00`}
                </Price>
                <CartButton onClick={addToCart}>Add to cart</CartButton>
            </Content>
        </Wrapper>
    );
};
const CartButton = styled.div`
    border-radius: 8px;
    padding: 6px 24px;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    color: #ffffff;
    background-color: #141718;
    user-select: none;
    text-align: center;
    cursor: pointer;
`;
const Price = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
`;
const Color = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
`;
const Title = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
`;
const TextInfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
`;
const InfoImageWrapper = styled.div`
    background-color: #f3f5f7;
    width: 60px;
    height: 72px;
`;
const InfoImage = styled.img`
    width: 100%;
    height: 100%;
`;
const InfoBlock = styled.div`
    display: flex;
    align-items: center;
    column-gap: 16px;
`;
const Content = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 265px 270px 140px;
    justify-content: space-between;
`;
const DeleteButton = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 10px;
    cursor: pointer;
`;
const Wrapper = styled.div`
    display: flex;
    padding: 24px 0;
    align-items: center;
    border-bottom: 1px solid #e8ecef;
`;

export default WishlistProductItem;
