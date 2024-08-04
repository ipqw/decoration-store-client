import { StaticImageData } from "next/image";
import { FC, useState } from "react";
import styled from "styled-components";
import arrow from "../../../public/icons/arrow-right.svg";

interface IProps {
    images: StaticImageData[];
}

const ImageSlider: FC<IProps> = ({ images }) => {
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
        <Wrapper>
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
    display: none;
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
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    @media screen and (min-width: 1440px) {
        display: flex;
    }
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
    height: 100%;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 304px;
    user-select: none;
    @media screen and (min-width: 1440px) {
        height: 536px;
    }
`;

export default ImageSlider;
