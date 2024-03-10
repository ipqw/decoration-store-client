"use client";
import styled from "styled-components";
import mainImage from "../public/homePage/mainImage.png";
import { FC } from "react";
import ImageCarousel from "./components/ImageCarousel";

const Home: FC = () => {
    return (
        <Wrapper>
            <ImageCarousel images={[mainImage, mainImage, mainImage]} />
        </Wrapper>
    );
};
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;
export default Home;
