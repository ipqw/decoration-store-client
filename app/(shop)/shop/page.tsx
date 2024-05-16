"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import mainImage from "@/public/images/shop/main.png";

import arrowIcon from "@/public/icons/arrow.svg";
import ProductGrid from "./_components/ProductGrid";
import { productApiSlice } from "@/store/services/productApiSlice";
import ProductFilter from "./_components/ProductFilter";
import { IProduct } from "@/app/_types/types";

const ShopPage = () => {
    const [activeCategory, setActiveCategory] = useState<string>("All Rooms");
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [activeGridButton, setActiveGridButton] = useState<number>(0);
    const [productLimit, setProductLimit] = useState<number>(12);

    const {
        data: products,
        isLoading,
        error,
        refetch,
    } = productApiSlice.useGetAllProductsQuery(productLimit);

    useEffect(() => {
        setFilteredProducts(products || []);
    }, [products]);
    const showMoreButtonHandler = () => {
        setProductLimit((prev) => (prev += 12));
    };
    return (
        <Wrapper>
            <MainImage>
                <MainImageBlock>
                    <MainImageNav>
                        <MainImageNavSpan>Home</MainImageNavSpan>
                        <MainImageNavIcon src={arrowIcon.src} />
                        <MainImageNavText>Shop</MainImageNavText>
                    </MainImageNav>
                    <MainImageTitle>Shop Page</MainImageTitle>
                    <MainImageText>Let’s design the place you always imagined.</MainImageText>
                </MainImageBlock>
            </MainImage>
            <ProductsSection $activeGridButton={activeGridButton}>
                <ProductFilter
                    activeGridButton={activeGridButton}
                    setActiveGridButton={setActiveGridButton}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    products={products || []}
                    setProducts={setFilteredProducts}
                />
                <ProductGrid
                    activeGridButton={activeGridButton}
                    setActiveGridButton={setActiveGridButton}
                    category={activeCategory}
                    products={filteredProducts || []}
                />
            </ProductsSection>
            <ShowMoreButton
                $isVisible={Number(products?.length) === productLimit}
                onClick={showMoreButtonHandler}>
                Show more
            </ShowMoreButton>
        </Wrapper>
    );
};
const ShowMoreButton = styled.div<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    border-radius: 80px;
    width: 163px;
    height: 40px;
    padding: 6px;
    justify-content: center;
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    border: #141718 solid 1px;
    user-select: none;
    cursor: pointer;
    align-self: center;
    margin-top: 40px;
    margin-bottom: 40px;
`;

const ProductsSection = styled.section<{ $activeGridButton: number }>`
    display: flex;
    column-gap: 24px;
    padding-top: 60px;
    flex-direction: ${({ $activeGridButton }) => ($activeGridButton > 0 ? "column" : "row")};
`;

const MainImageText = styled.p`
    color: #121212;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
`;
const MainImageNavIcon = styled.img`
    width: 16px;
    height: 16px;
`;
const MainImageNavSpan = styled.span`
    color: #605f5f;
    padding-right: 4px;
`;
const MainImageNavText = styled.span`
    color: #121212;
    padding-left: 4px;
`;
const MainImageNav = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    user-select: none;
    cursor: default;
`;
const MainImageTitle = styled.p`
    color: #000000;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 54px;
    line-height: 58px;
`;
const MainImageBlock = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 24px;
`;
const MainImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${mainImage.src});
    height: 392px;
    width: 1120px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default ShopPage;
