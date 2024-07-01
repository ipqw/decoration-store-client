"use client";
import React, { FC } from "react";
import styled from "styled-components";

import aboutImage from "@/public/images/contact-us/image-0.png";
import arrowRight from "@/public/icons/arrow-right.svg";
import storeIcon from "@/public/icons/contact-us/store.svg";
import callIcon from "@/public/icons/contact-us/call.svg";
import emailIcon from "@/public/icons/contact-us/mail.svg";
import MapComponent from "../_components/MapComponent";

const ContactUsPage: FC = () => {
    return (
        <Wrapper>
            <TitleSection>
                <Title>We believe in sustainable decor. We’re passionate about life at home.</Title>
                <Text>
                    Our features timeless furniture, with natural fabrics, curved lines, plenty of
                    mirrors and classic design, which can be incorporated into any decor project.
                    The pieces enchant for their sobriety, to last for generations, faithful to the
                    shapes of each period, with a touch of the present
                </Text>
            </TitleSection>
            <AboutSection>
                <AboutImage src={aboutImage.src} />
                <AboutContentBlock>
                    <AboutTitle>About Us</AboutTitle>
                    <AboutText>
                        3legant is a gift & decorations store based in HCMC, Vietnam. Est since
                        2019. Our customer service is always prepared to support you 24/7
                    </AboutText>
                    <AboutLink>
                        <AboutLinkText>Shop Now</AboutLinkText>
                        <AboutLinkIcon src={arrowRight.src} />
                    </AboutLink>
                </AboutContentBlock>
            </AboutSection>
            <ContactSection>
                <ContactTitle>Contact Us</ContactTitle>
                <ContactInfoBlock>
                    <InfoCard>
                        <InfoCardIcon src={storeIcon.src} />
                        <InfoCardTitle>ADDRESS</InfoCardTitle>
                        <InfoCardText>234 Hai Trieu, Ho Chi Minh City, Viet Nam</InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon src={callIcon.src} />
                        <InfoCardTitle>CONTACT US</InfoCardTitle>
                        <InfoCardText>+84 234 567 890</InfoCardText>
                    </InfoCard>
                    <InfoCard>
                        <InfoCardIcon src={emailIcon.src} />
                        <InfoCardTitle>EMAIL</InfoCardTitle>
                        <InfoCardText>hello@3legant.com</InfoCardText>
                    </InfoCard>
                </ContactInfoBlock>
                <MapComponent />
            </ContactSection>
        </Wrapper>
    );
};
const InfoCardText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    max-width: 280px;
    text-align: center;
`;
const InfoCardTitle = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 8px;
`;
const InfoCardIcon = styled.img`
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
`;
const InfoCard = styled.div`
    padding: 16px 32px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #f3f5f7;
`;
const ContactInfoBlock = styled.div`
    display: flex;
    column-gap: 24px;
`;
const ContactTitle = styled.p`
    color: #121212;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 40px;
    line-height: 44px;
    text-align: center;
`;
const ContactSection = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    width: 1120px;
`;

const AboutLinkText = styled.p`
    color: #121212;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
`;
const AboutLink = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #121212;
    column-gap: 4px;
`;
const AboutLinkIcon = styled.img`
    width: 20px;
    height: 20px;
`;
const AboutText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 24px;
`;
const AboutTitle = styled.p`
    color: #121212;
    font-family: "Poppins", sans-serif;
    font-size: 40px;
    font-weight: 500;
    line-height: 44px;
    margin-bottom: 16px;
`;
const AboutContentBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 72px;
    padding-right: 35px;
`;
const AboutImage = styled.img`
    width: 50%;
    height: 100%;
`;
const AboutSection = styled.div`
    display: flex;
    width: 1120px;
    background-color: #f3f5f7;
`;

const Text = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    max-width: 840px;
`;
const Title = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-size: 54px;
    font-weight: 500;
    line-height: 58px;
    max-width: 840px;
`;
const TitleSection = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    width: 1120px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 80px;
    row-gap: 48px;
`;

export default ContactUsPage;
