"use client";
import { useAppSelector } from "@/store/hooks";
import { wishlistApiSlice } from "@/store/services/wishlistApiSlice";
import styled from "styled-components";
import WishlistProductItem from "./WishlistProductItem";

const WishlistSection = () => {
    const user = useAppSelector((state) => state.user);
    const { data: wishlistProducts } = wishlistApiSlice.useGetWishlistProductsByWishlistIdQuery(
        user?.wishlist?.id || 0,
    );
    return (
        <Wrapper>
            <Title>Your Wishlist</Title>
            <WishlistProductsBlock>
                <Caption>
                    <CaptionText>Product</CaptionText>
                    <CaptionText>Price</CaptionText>
                    <CaptionText>Action</CaptionText>
                </Caption>
                {wishlistProducts?.map((el, index) => (
                    <WishlistProductItem wishlistProduct={el} key={index} />
                ))}
            </WishlistProductsBlock>
        </Wrapper>
    );
};
const Caption = styled.div`
    padding-left: 32px;
    display: grid;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: #e8ecef solid 1px;
    grid-template-columns: 265px 270px 140px;
    justify-content: space-between;
`;
const CaptionText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
`;
const WishlistProductsBlock = styled.div`
    display: flex;
    flex-direction: column;
`;
const Title = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    line-height: 32px;
`;
const Wrapper = styled.div`
    min-width: 851px;
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    padding: 0 72px;
`;
export default WishlistSection;
