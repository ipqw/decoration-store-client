"use client";
import styled from "styled-components";
import mainImage from "../public/images/homepage/mainImage.png";
import { FC } from "react";
import ImageCarousel from "./components/ImageCarousel";
import sofaImage from "../public/images/homepage/sofaImage.png";
import drawerImage from "../public/images/homepage/drawerImage.png";
import toasterImage from "../public/images/homepage/toasterImage.png";
import BannerCard from "./components/BannerCard";

const Home: FC = () => {
    return (
        <Wrapper>
            <ImageCarouselSection>
                <ImageCarousel images={[mainImage, mainImage, mainImage]} />
                <ImageCarouselTextBlock>
                    <ImageCarouselTitle>
                        Simply Unique<ImageCarouselTitleSpan>/</ImageCarouselTitleSpan> Simply
                        Better
                        <ImageCarouselTitleSpan>.</ImageCarouselTitleSpan>
                    </ImageCarouselTitle>
                    <ImageCarouselText>
                        <ImageCarouselTextSpan>3legant</ImageCarouselTextSpan> is a gift &
                        decorations store based in HCMC, Vietnam. Est since 2019.
                    </ImageCarouselText>
                </ImageCarouselTextBlock>
            </ImageCarouselSection>
            <BannerSection>
                <BannerCard image={sofaImage} title="Living Room" />
                <SmallBannerCardBlock>
                    <BannerCard image={drawerImage} title="Bedroom" variety="small" />
                    <BannerCard image={toasterImage} title="Kitchen" variety="small" />
                </SmallBannerCardBlock>
            </BannerSection>
        </Wrapper>
    );
};

const SmallBannerCardBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const BannerSection = styled.div`
    display: flex;
    width: min-content;
    column-gap: 24px;
`;

const ImageCarouselText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    line-height: 26px;
    font-size: 16px;
    max-width: 40.8%;
`;
const ImageCarouselTextSpan = styled.span`
    color: #343839;
    font-weight: 600;
`;
const ImageCarouselTitleSpan = styled.span`
    font-family: "Poppins", sans-serif;
    font-size: 72px;
    font-weight: 500;
    color: #6c7275;
`;
const ImageCarouselTitle = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: 72px;
    font-weight: 500;
    line-height: 76px;
    color: #141718;
    max-width: 57.45%;
`;
const ImageCarouselTextBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 40px;
`;
const ImageCarouselSection = styled.div`
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
