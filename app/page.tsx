"use client";
import styled from "styled-components";
import mainImage from "../public/images/homepage/mainImage.png";
import { FC } from "react";
import sofaImage from "../public/images/homepage/sofaImage.png";
import drawerImage from "../public/images/homepage/drawerImage.png";
import toasterImage from "../public/images/homepage/toasterImage.png";
import BannerCard from "./components/BannerCard";
import ImageSlider from "./components/ImageSlider";

const Home: FC = () => {
    return (
        <Wrapper>
            <ImageSliderSection>
                <ImageSlider images={[mainImage, mainImage, mainImage]} />
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
const ImageSliderSection = styled.div`
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
