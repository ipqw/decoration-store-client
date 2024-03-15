import { StaticImageData } from "next/image";
import React, { FC, useState } from "react";
import styled from "styled-components";
import arrow from "../../../public/icons/arrow-right.svg";

interface IProps {
    images: StaticImageData[];
    width?: number;
    height?: number;
}
interface IWrapperProps {
    $width?: number;
    $height?: number;
}
const ImageSlider: FC<IProps> = ({ images, width, height }) => {
    const [active, setActive] = useState<number>(0);
    const [leftDisable, setLeftDisable] = useState<boolean>(true);
    const [rightDisable, setRightDisable] = useState<boolean>(false);
    const handleLeftButtonClick = () => {
        if (active > 0) {
            setActive((state) => state - 1);
            if (active - 1 === 0) {
                setLeftDisable(true);
            }
            setRightDisable(false);
        }
    };
    const handleRightButtonClick = () => {
        if (active < images.length - 1) {
            setActive((state) => state + 1);
            if (active + 1 === images.length - 1) {
                setRightDisable(true);
            }
            setLeftDisable(false);
        }
    };
    const handleDotClick = (index: number) => {
        setActive(index);
        setLeftDisable(false);
        setRightDisable(false);
        if (index === 0) {
            setLeftDisable(true);
        }
        if (index === images.length - 1) {
            setRightDisable(true);
        }
    };
    return (
        <Wrapper $width={width} $height={height}>
            <ArrowButton onClick={handleLeftButtonClick} $position="left">
                <ArrowImage $rotation="180" $disable={leftDisable} src={arrow.src} />
            </ArrowButton>
            {images.map((image, index) => {
                return <Image $active={index === active} alt="image" key={index} src={image.src} />;
            })}
            <ArrowButton onClick={handleRightButtonClick} $position="right">
                <ArrowImage $disable={rightDisable} src={arrow.src} />
            </ArrowButton>
            <DotsWrapper>
                {images.map((image, index) => {
                    return (
                        <Dot
                            key={index}
                            onClick={() => {
                                handleDotClick(index);
                            }}
                            $active={index === active}
                        />
                    );
                })}
            </DotsWrapper>
        </Wrapper>
    );
};
const DotsWrapper = styled.div`
    position: absolute;
    display: flex;
    gap: 16px;
    width: fit-content;
    bottom: 32px;
    left: 0;
    right: 0;
    margin: auto;
`;
const Dot = styled.div<{ $active: boolean }>`
    width: ${({ $active }) => ($active ? "30px" : "8px")};
    border-radius: 100px;
    height: 8px;
    background-color: #fefefe;
    cursor: pointer;
`;
const ArrowButton = styled.div<{ $position: string }>`
    position: absolute;
    left: ${({ $position }) => ($position === "left" ? "32px" : "none")};
    right: ${({ $position }) => ($position === "right" ? "32px" : "none")};
    top: 0;
    bottom: 0;
    margin: auto;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`;
const ArrowImage = styled.img<{ $disable: boolean; $rotation?: string }>`
    filter: ${({ $disable }) =>
        $disable
            ? "invert(46%) sepia(5%) saturate(388%) hue-rotate(155deg) brightness(96%) contrast(99%)"
            : "none"};
    rotate: ${({ $rotation }) => {
        return `${$rotation}deg`;
    }};
`;
const Image = styled.img<{ $active: boolean }>`
    display: ${({ $active }) => ($active ? "block" : "none")};
`;
const Wrapper = styled.div<IWrapperProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    width: ${({ $width }) => $width || "1120px"};
    height: ${({ $height }) => $height || "536px"};
    user-select: none;
`;

export default ImageSlider;
