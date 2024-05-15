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
    // queries
    const {
        data: products,
        isLoading,
        error,
        refetch,
    } = productApiSlice.useGetAllProductsQuery(null);
    // hooks
    const [activeCategory, setActiveCategory] = useState<string>("All Rooms");
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [activeGridButton, setActiveGridButton] = useState<number>(0);
    useEffect(() => {
        setFilteredProducts(products || []);
    }, [products]);
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
            <ProductsSection>
                <ProductFilter
                    activeGridButton={activeGridButton}
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
        </Wrapper>
    );
};
const ProductsSection = styled.section`
    display: flex;
    column-gap: 24px;
    padding-top: 60px;
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
