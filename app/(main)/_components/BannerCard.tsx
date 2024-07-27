import { StaticImageData } from "next/image";
import React, { FC } from "react";
import styled from "styled-components";
import arrowIcon from "../../../public/icons/arrow-right.svg";

interface IProps {
    image: StaticImageData;
    smallImage: StaticImageData;
    title: string;
    variety?: "small" | "default";
}

const BannerCard: FC<IProps> = ({ image, smallImage, title, variety }) => {
    return (
        <Wrapper $smallImage={smallImage} $variety={variety || "default"} $image={image}>
            <Content $variety={variety || "default"}>
                <Title>{title}</Title>
                <Button>
                    <ButtonText href={`/shop?category=${title.split(" ")[0]}`}>Shop Now</ButtonText>
                    <ButtonImage src={arrowIcon.src} />
                </Button>
            </Content>
        </Wrapper>
    );
};

const Wrapper = styled.div<{
    $image: StaticImageData;
    $smallImage: StaticImageData;
    $variety: "small" | "default";
}>`
    position: relative;
    background-image: ${({ $smallImage }) => `url(${$smallImage.src})`};
    background-size: contain;
    background-repeat: no-repeat;
    width: 311px;
    height: ${({ $variety }) => ($variety === "small" ? "180px" : "377px")};
    user-select: none;
    @media screen and (min-width: 1440px) {
        width: 548px;
        background-image: ${({ $image }) => `url(${$image.src})`};
        height: ${({ $variety }) => ($variety === "small" ? "319px" : "664px")};
    }
`;
const Content = styled.div<{ $variety: "small" | "default" }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    width: 247px;
    height: 66px;
    top: ${({ $variety }) => ($variety === "small" ? "auto" : "32px")};
    left: ${({ $variety }) => ($variety === "small" ? "32px" : "32px")};
    bottom: ${({ $variety }) => ($variety === "small" ? "32px" : "auto")};
    @media screen and (min-width: 1440px) {
        width: 420px;
        height: 78px;
        top: ${({ $variety }) => ($variety === "small" ? "auto" : "48px")};
        left: ${({ $variety }) => ($variety === "small" ? "32px" : "48px")};
        bottom: ${({ $variety }) => ($variety === "small" ? "40px" : "auto")};
    }
`;
const Title = styled.p`
    font-size: 28px;
    line-height: 34px;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    color: #141718;
    @media screen and (min-width: 1440px) {
        font-size: 34px;
        line-height: 38px;
    }
`;
const Button = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    height: 28px;
    border-bottom: 1px solid #141718;
`;
const ButtonText = styled.a`
    font-family: "Inter", sans-serif;
    color: #141718;
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
`;
const ButtonImage = styled.img`
    width: 20px;
    height: 20px;
`;

export default BannerCard;
