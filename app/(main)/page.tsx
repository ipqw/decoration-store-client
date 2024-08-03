"use client";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import mainImage from "../../public/images/homepage/mainImage.png";
import secondMainImage from "../../public/images/homepage/mainImage2.png";
import sofaImage from "../../public/images/homepage/sofaImage.png";
import smallSofaImage from "../../public/images/homepage/smallSofaImage.png";
import drawerImage from "../../public/images/homepage/drawerImage.png";
import smallDrawerImage from "../../public/images/homepage/drawerImage2.png";
import toasterImage from "../../public/images/homepage/toasterImage.png";
import smallToasterImage from "../../public/images/homepage/smallToasterImage.png";
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
import { useWindowSize } from "../_lib/hooks";
import { useRouter } from "next/navigation";

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
    const windowSize = useWindowSize();
    const router = useRouter();
    return (
        <Wrapper>
            <SectionsWrapper>
                <ImageSliderSection>
                    <ImageSlider images={[mainImage, secondMainImage]} />
                    <ImageSliderTextBlock>
                        <ImageSliderTitle>
                            Simply Unique<ImageSliderTitleSpan>/</ImageSliderTitleSpan> Simply
                            Better
                            <ImageSliderTitleSpan>.</ImageSliderTitleSpan>
                        </ImageSliderTitle>
                        <ImageSliderText>
                            <ImageSliderTextSpan>3legant</ImageSliderTextSpan> is a gift &
                            decorations store based in HCMC, Vietnam. Est since 2019.
                        </ImageSliderText>
                    </ImageSliderTextBlock>
                </ImageSliderSection>

                <BannerSection>
                    <BannerCard image={sofaImage} smallImage={smallSofaImage} title="Living Room" />
                    <SmallBannerCardBlock>
                        <BannerCard
                            image={drawerImage}
                            smallImage={smallDrawerImage}
                            title="Bedroom"
                            variety="small"
                        />
                        <BannerCard
                            smallImage={smallToasterImage}
                            image={toasterImage}
                            title="Kitchen"
                            variety="small"
                        />
                    </SmallBannerCardBlock>
                </BannerSection>

                <ProductCarouselSection $isVisible={filteredProducts.length > 0 ? true : false}>
                    <ProductCarouselTitleBlock>
                        <ProductCarouselTitleText>New Arrivals</ProductCarouselTitleText>
                        <StyledLink $isVisible={windowSize.width > 1440}>
                            <StyledLinkText onClick={() => router.push("/shop")}>
                                More Products
                            </StyledLinkText>
                            <StyledLinkIcon src={arrowIcon.src} />
                        </StyledLink>
                    </ProductCarouselTitleBlock>
                    <ProductCarousel products={filteredProducts} />
                    <StyledLink $isVisible={windowSize.width <= 1440}>
                        <StyledLinkText onClick={() => router.push("/shop")}>
                            More Products
                        </StyledLinkText>
                        <StyledLinkIcon src={arrowIcon.src} />
                    </StyledLink>
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
            </SectionsWrapper>

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
                        <StyledLink $isVisible>
                            <StyledLinkText onClick={() => router.push("/shop")}>
                                Shop Now
                            </StyledLinkText>
                            <StyledLinkIcon src={arrowIcon.src} />
                        </StyledLink>
                    </SaleInfo>
                </SaleContent>
            </SaleSection>
            <NewsletterSection />
        </Wrapper>
    );
};

const SectionsWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 312px;
    @media screen and (min-width: 1440px) {
        width: 1120px;
    }
`;

const SaleInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    max-width: 452px;
`;
const SaleInfoTitle = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: 35px;
    line-height: 38px;
    font-weight: 500;
    color: #141718;
    @media screen and (min-width: 1440px) {
        font-size: 40px;
        line-height: 44px;
    }
`;
const SaleInfoText = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #141718;
    @media screen and (min-width: 1440px) {
        font-size: 20px;
        line-height: 32px;
    }
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
    padding: 58.5px 32px;
    width: 375px;
    @media screen and (min-width: 1440px) {
        width: 720px;
        padding: 0;
        padding-left: 72px;
    }
`;
const SaleImage = styled.img`
    width: 375px;
    height: 367px;
    @media screen and (min-width: 1440px) {
        width: 720px;
        height: 532px;
    }
`;
const SaleSection = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
    @media screen and (min-width: 1440px) {
        flex-direction: row;
    }
`;

const InfoCardText = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #6c7275;
    @media screen and (min-width: 1440px) {
        font-family: "Poppins", sans-serif;
        font-size: 14px;
        line-height: 24px;
    }
`;
const InfoCardTitle = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #141718;
    margin-bottom: 4px;
    @media screen and (min-width: 1440px) {
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 8px;
    }
`;
const InfoCardIcon = styled.img`
    max-width: 48px;
    max-height: 48px;
    margin-bottom: 16px;
`;
const InfoCard = styled.div`
    display: flex;
    padding: 32px 16px;
    width: 152px;
    height: 198px;
    flex-direction: column;
    background-color: #f3f5f7;
    @media screen and (min-width: 1440px) {
        padding: 48px 32px;
        width: 262px;
        height: 220px;
    }
`;
const InfoCardsSection = styled.section`
    padding-top: 48px;
    padding-bottom: 48px;
    width: 100%;
    @media screen and (min-width: 1440px) {
        width: 1120px;
    }
`;
const InfoCardsWrapper = styled.div`
    display: flex;
    column-gap: 8px;
    width: 100%;
    flex-wrap: wrap;
    row-gap: 24px;
    @media screen and (min-width: 1440px) {
        column-gap: 24px;
    }
`;

const ProductCarouselSection = styled.section<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    flex-direction: column;
    padding: 48px 0;
    align-items: center;
    width: 100%;
    user-select: none;
    row-gap: 48px;
    @media screen and (min-width: 1440px) {
        width: 1120px;
        padding: 0;
        padding-top: 48px;
    }
`;
const ProductCarouselTitleBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
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
const StyledLink = styled.div<{ $isVisible: boolean }>`
    border-bottom: 1px solid #141718;
    width: fit-content;
    align-items: center;
    cursor: pointer;
    align-self: flex-start;
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
`;
const StyledLinkText = styled.p`
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
    height: 100%;
    justify-content: center;
    row-gap: 16px;
    @media screen and (min-width: 1440px) {
        row-gap: 24px;
    }
`;
const BannerSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    column-gap: 24px;
    align-items: center;
    justify-content: center;
    row-gap: 16px;
    @media screen and (min-width: 1440px) {
        flex-direction: row;
    }
`;

const ImageSliderText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    @media screen and (min-width: 1440px) {
        max-width: 40.8%;
        line-height: 26px;
        font-size: 16px;
    }
`;
const ImageSliderTextSpan = styled.span`
    color: #343839;
    font-weight: 600;
`;
const ImageSliderTitleSpan = styled.span`
    font-family: "Poppins", sans-serif;
    font-size: 40px;
    font-weight: 500;
    color: #6c7275;
    @media screen and (min-width: 1440px) {
        font-size: 72px;
    }
`;
const ImageSliderTitle = styled.p`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 40px;
    line-height: 44px;
    color: #141718;
    @media screen and (min-width: 1440px) {
        max-width: 57.45%;
        font-size: 72px;
        line-height: 76px;
    }
`;
const ImageSliderTextBlock = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    row-gap: 16px;
    align-items: center;
    width: 100%;
    padding-bottom: 40px;
    @media screen and (min-width: 1440px) {
        flex-direction: row;
    }
`;
const ImageSliderSection = styled.section`
    display: flex;
    row-gap: 32px;
    flex-direction: column;
    width: 311px;
    @media screen and (min-width: 1440px) {
        width: 1120px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export default Home;
