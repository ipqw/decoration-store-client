"use client";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import mainImage from "../../public/images/homepage/mainImage.png";
import secondMainImage from "../../public/images/homepage/mainImage2.png";
import sofaImage from "../../public/images/homepage/sofaImage.png";
import drawerImage from "../../public/images/homepage/drawerImage.png";
import toasterImage from "../../public/images/homepage/toasterImage.png";
import roomImage from "../../public/images/homepage/room.png";
import arrowIcon from "../../public/icons/arrow-right.svg";
import truckIcon from "../../public/icons/truck.svg";
import moneyIcon from "../../public/icons/money.svg";
import lockIcon from "../../public/icons/lock.svg";
import callIcon from "../../public/icons/call.svg";

import BannerCard from "./_components/BannerCard";
import ImageSlider from "./_components/ImageSlider";
import ProductCarousel from "./_components/ProductCarousel";
import NewsletterSection from "../_components/NewsletterSection";
import { productApiSlice } from "@/store/services/productApiSlice";
import { IProduct } from "../_types/types";

const Home: FC = () => {
    const {
        data: products,
        isLoading,
        error,
        refetch,
    } = productApiSlice.useGetAllProductsQuery(null);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        setFilteredProducts(() => {
            if (products) {
                return [...products].filter(
                    (el) => Date.now() - new Date(el.createdAt).getTime() < 604800000,
                );
            } else {
                return [];
            }
        });
    }, [products]);
    return (
        <Wrapper>
            <ImageSliderSection>
                <ImageSlider images={[mainImage, secondMainImage]} />
                <ImageSliderTextBlock>
                    <ImageSliderTitle>
                        Simply Unique<ImageSliderTitleSpan>/</ImageSliderTitleSpan> Simply Better
                        <ImageSliderTitleSpan>.</ImageSliderTitleSpan>
                    </ImageSliderTitle>
                    <ImageSliderText>
                        <ImageSliderTextSpan>3legant</ImageSliderTextSpan> is a gift & decorations
                        store based in HCMC, Vietnam. Est since 2019.
                    </ImageSliderText>
                </ImageSliderTextBlock>
            </ImageSliderSection>

            <BannerSection>
                <BannerCard image={sofaImage} title="Living Room" />
                <SmallBannerCardBlock>
                    <BannerCard image={drawerImage} title="Bedroom" variety="small" />
                    <BannerCard image={toasterImage} title="Kitchen" variety="small" />
                </SmallBannerCardBlock>
            </BannerSection>

            <ProductCarouselSection $isVisible={filteredProducts.length > 0 ? true : false}>
                <ProductCarouselTitleBlock>
                    <ProductCarouselTitleText>New Arrivals</ProductCarouselTitleText>
                    <StyledLink>
                        <StyledLinkText href="/shop">More Products</StyledLinkText>
                        <StyledLinkIcon src={arrowIcon.src} />
                    </StyledLink>
                </ProductCarouselTitleBlock>
                <ProductCarousel products={filteredProducts} />
            </ProductCarouselSection>
            <InfoCardsSection>
                <InfoCardsWrapper>
                    <InfoCard>
                        <InfoCardIcon src={truckIcon.src} />
                        <InfoCardTitle>Free Shipping</InfoCardTitle>
                        <InfoCardText>Order above $200</InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon src={moneyIcon.src} />
                        <InfoCardTitle>Money-back</InfoCardTitle>
                        <InfoCardText>30 days guarantee</InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon src={lockIcon.src} />
                        <InfoCardTitle>Secure Payments</InfoCardTitle>
                        <InfoCardText>Secured by Stripe</InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon src={callIcon.src} />
                        <InfoCardTitle>24/7 Support</InfoCardTitle>
                        <InfoCardText>Phone and Email support</InfoCardText>
                    </InfoCard>
                </InfoCardsWrapper>
            </InfoCardsSection>
            <SaleSection>
                <SaleImage src={roomImage.src} />
                <SaleContent>
                    <SaleInfo>
                        <SaleInfoLabel>SALE UP TO 35% OFF</SaleInfoLabel>
                        <SaleInfoTitle>HUNDREDS of New lower prices!</SaleInfoTitle>
                        <SaleInfoText>
                            It’s more affordable than ever to give every room in your home a stylish
                            makeover
                        </SaleInfoText>
                        <StyledLink>
                            <StyledLinkText href="/shop">Shop Now</StyledLinkText>
                            <StyledLinkIcon src={arrowIcon.src} />
                        </StyledLink>
                    </SaleInfo>
                </SaleContent>
            </SaleSection>
            <NewsletterSection />
        </Wrapper>
    );
};

const SaleInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    max-width: 452px;
`;
const SaleInfoTitle = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: 40px;
    line-height: 44px;
    font-weight: 500;
    color: #141718;
`;
const SaleInfoText = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    color: #141718;
`;
const SaleInfoLabel = styled.p`
    color: #377dff;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
`;
const SaleContent = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f3f5f7;
    padding-left: 72px;
    width: 720px;
`;
const SaleImage = styled.img`
    max-width: 720px;
    height: 532px;
`;
const SaleSection = styled.section`
    display: flex;
    margin-bottom: 48px;
`;

const InfoCardText = styled.p`
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #6c7275;
`;
const InfoCardTitle = styled.p`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #141718;
    margin-bottom: 8px;
`;
const InfoCardIcon = styled.img`
    max-width: 48px;
    max-height: 48px;
    margin-bottom: 16px;
`;
const InfoCard = styled.div`
    display: flex;
    padding: 48px 32px;
    width: 262px;
    height: 220px;
    flex-direction: column;
    background-color: #f3f5f7;
`;
const InfoCardsSection = styled.section`
    padding-top: 48px;
    padding-bottom: 48px;
`;
const InfoCardsWrapper = styled.div`
    display: flex;
    column-gap: 24px;
    width: fit-content;
`;

const ProductCarouselSection = styled.section<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    flex-direction: column;
    padding-top: 48px;
    padding-bottom: 48px;
    align-items: center;
    width: 100%;
    user-select: none;
    row-gap: 48px;
`;
const ProductCarouselTitleBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    max-width: 1120px;
    width: 100%;
`;
const ProductCarouselTitleText = styled.p`
    width: 149px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 40px;
    line-height: 44px;
    color: #000000;
`;
const StyledLink = styled.div`
    border-bottom: 1px solid #141718;
    width: fit-content;
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const StyledLinkText = styled.a`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    padding-right: 4px;
`;
const StyledLinkIcon = styled.img`
    height: 20px;
    width: 20px;
`;

const SmallBannerCardBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const BannerSection = styled.section`
    display: flex;
    width: min-content;
    column-gap: 24px;
`;

const ImageSliderText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    line-height: 26px;
    font-size: 16px;
    max-width: 40.8%;
`;
const ImageSliderTextSpan = styled.span`
    color: #343839;
    font-weight: 600;
`;
const ImageSliderTitleSpan = styled.span`
    font-family: "Poppins", sans-serif;
    font-size: 72px;
    font-weight: 500;
    color: #6c7275;
`;
const ImageSliderTitle = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: 72px;
    font-weight: 500;
    line-height: 76px;
    color: #141718;
    max-width: 57.45%;
`;
const ImageSliderTextBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 40px;
`;
const ImageSliderSection = styled.section`
    display: flex;
    row-gap: 32px;
    flex-direction: column;
    width: min-content;
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export default Home;
