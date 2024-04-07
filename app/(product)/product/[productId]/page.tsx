"use client";
import { productApiSlice } from "@/store/services/productApiSlice";
import React, { FC } from "react";
import styled from "styled-components";
import ImageSlider from "../../_components/ImageSlider";
import emptyStar from "@/public/icons/emptyStar.svg";
import fullStar from "@/public/icons/fullStar.svg";

interface IProps {
    params: { productId: string };
}

const ProductPage: FC<IProps> = ({ params }) => {
    const { data, isLoading, error, refetch } = productApiSlice.useGetOneProductQuery(
        Number(params.productId),
    );
    return (
        <Wrapper $invisible={error || !data ? true : false}>
            <ProductSection>
                <ProductImages>
                    <ImageSlider product={data} />
                </ProductImages>
                <ProductInfoAside>
                    <ProductInfo>
                        <ProductRatingWrapper>
                            <StarsWrapper>
                                <Star
                                    src={
                                        Number(data?.averageRate) >= 1
                                            ? fullStar.src
                                            : emptyStar.src
                                    }
                                />
                                <Star
                                    src={
                                        Number(data?.averageRate) >= 2
                                            ? fullStar.src
                                            : emptyStar.src
                                    }
                                />
                                <Star
                                    src={
                                        Number(data?.averageRate) >= 3
                                            ? fullStar.src
                                            : emptyStar.src
                                    }
                                />
                                <Star
                                    src={
                                        Number(data?.averageRate) >= 4
                                            ? fullStar.src
                                            : emptyStar.src
                                    }
                                />
                                <Star
                                    src={
                                        Number(data?.averageRate) == 5
                                            ? fullStar.src
                                            : emptyStar.src
                                    }
                                />
                            </StarsWrapper>
                            <ProductRatingText>{data?.reviews?.length} Reviews</ProductRatingText>
                        </ProductRatingWrapper>
                        <ProductInfoTitle>{data?.name}</ProductInfoTitle>
                        <ProductInfoText>
                            {data?.product_infos?.find((el) => el.name === "about")?.text}
                        </ProductInfoText>
                        <ProductPriceWrapper>
                            <ProductPrice>
                                $
                                {data?.discountPrice
                                    ? data?.discountPrice.toString().split(".")[1]
                                        ? data?.discountPrice
                                        : `${data?.discountPrice}.00`
                                    : data?.price.toString().split(".")[1]
                                      ? data?.price
                                      : `${data?.price}.00`}
                            </ProductPrice>
                            <ProductOldPrice $invisible={data?.discountPrice ? false : true}>
                                $
                                {data?.price.toString().split(".")[1]
                                    ? data?.price
                                    : `${data?.price}.00`}
                            </ProductOldPrice>
                        </ProductPriceWrapper>
                    </ProductInfo>
                </ProductInfoAside>
            </ProductSection>
        </Wrapper>
    );
};
const ProductPrice = styled.p`
    color: #121212;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 28px;
    line-height: 34px;
`;
const ProductOldPrice = styled.p<{ $invisible: boolean }>`
    display: ${({ $invisible }) => ($invisible ? "none" : "block")};
    color: #6c7275;
    font-size: 20px;
    line-height: 28px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-decoration: line-through;
`;
const ProductPriceWrapper = styled.div`
    display: flex;
    column-gap: 12px;
    align-items: center;
`;
const ProductInfoText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
`;
const ProductInfo = styled.div`
    display: flex;
    row-gap: 16px;
    flex-direction: column;
`;
const ProductInfoTitle = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-size: 40px;
    line-height: 44px;
    font-weight: 500;
`;
const ProductRatingText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
`;
const ProductRatingWrapper = styled.div`
    display: flex;
    column-gap: 10px;
    align-items: center;
`;
const Star = styled.img`
    width: 16px;
    height: 16px;
`;
const StarsWrapper = styled.div`
    display: flex;
    column-gap: 2px;
    align-items: center;
`;
const ProductImages = styled.aside`
    width: fit-content;
`;
const ProductInfoAside = styled.aside`
    width: fit-content;
    max-width: 508px;
`;
const ProductSection = styled.section`
    display: flex;
    justify-content: center;
    column-gap: 63px;
`;

const Wrapper = styled.div<{ $invisible?: boolean }>`
    visibility: ${({ $invisible }) => ($invisible ? "hidden" : "visible")};
`;

export default ProductPage;
