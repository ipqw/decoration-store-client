import { IProduct } from "@/app/types/types";
import React, { FC } from "react";
import styled from "styled-components";
import noImageIcon from "../../../public/icons/no-image.ico";
import starIcon from "../../../public/icons/Star.svg";

const ProductCard: FC<{ product: IProduct }> = ({ product }) => {
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 604800000;
    console.log(product);
    return (
        <Wrapper>
            <ImageWrapper>
                <LabelWrapper>
                    <NewLabel $isNew={isNew}>
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
            <InfoWrapper>
                <StarsWrapper>
                    <Star $isFilled={product.averageRate >= 1} src={starIcon.src} />
                    <Star $isFilled={product.averageRate >= 2} src={starIcon.src} />
                    <Star $isFilled={product.averageRate >= 3} src={starIcon.src} />
                    <Star $isFilled={product.averageRate >= 4} src={starIcon.src} />
                    <Star $isFilled={product.averageRate >= 5} src={starIcon.src} />
                </StarsWrapper>
                <Title>{product.name}</Title>
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
const Title = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 26px;
    color: #141718;
    font-weight: 600;
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
const Star = styled.img<{ $isFilled: boolean }>`
    height: 16px;
    width: 16px;
    filter: ${({ $isFilled }) =>
        $isFilled
            ? "brightness(0) saturate(100%) invert(81%) sepia(100%) saturate(287%) hue-rotate(1deg) brightness(91%) contrast(115%)"
            : ""};
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
    height: 349px;
    align-items: center;
    justify-content: center;
    background-color: #f3f5f7;
`;

export default ProductCard;
