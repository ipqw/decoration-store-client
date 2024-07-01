import { StaticImageData } from "next/image";
import React, { FC } from "react";
import styled from "styled-components";
import arrowIcon from "../../../public/icons/arrow-right.svg";

interface IProps {
    image: StaticImageData;
    title: string;
    variety?: "small" | "default";
}

const BannerCard: FC<IProps> = ({ image, title, variety }) => {
    return (
        <Wrapper $variety={variety || "default"} $image={image}>
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

const Wrapper = styled.div<{ $image: StaticImageData; $variety: "small" | "default" }>`
    position: relative;
    background-image: ${({ $image }) => `url(${$image.src})`};
    background-size: contain;
    background-repeat: no-repeat;
    width: 548px;
    height: ${({ $variety }) => ($variety === "small" ? "319px" : "664px")};
    user-select: none;
`;
const Content = styled.div<{ $variety: "small" | "default" }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    width: 420px;
    height: 78px;
    top: ${({ $variety }) => ($variety === "small" ? "auto" : "48px")};
    left: ${({ $variety }) => ($variety === "small" ? "32px" : "48px")};
    bottom: ${({ $variety }) => ($variety === "small" ? "40px" : "auto")};
`;
const Title = styled.p`
    font-size: 34px;
    line-height: 38px;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    color: #141718;
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
