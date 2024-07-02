import React, { FC, useState } from "react";
import styled from "styled-components";
import arrow from "../../../public/icons/arrow-right.svg";
import { IProduct } from "@/app/_types/types";
import { imageLinkHandler } from "@/app/_global";

interface IProps {
    product?: IProduct;
    backgroundColor?: string;
}
interface IWrapperProps {
    $width?: number;
    $height?: number;
    $backgroundColor?: string;
}
const ImageSlider: FC<IProps> = ({ product, backgroundColor }) => {
    const [active, setActive] = useState<number>(0);
    const isNew = product ? Date.now() - new Date(product.createdAt).getTime() < 604800000 : false;
    const optionalImages = product?.images
        ? [
              ...product.images.map((el) => imageLinkHandler(el)),
              imageLinkHandler(product.images[0]),
              imageLinkHandler(product.images[1]),
              imageLinkHandler(product.images[2]),
          ]
        : [];
    const handleLeftButtonClick = () => {
        if (active === 0) {
            setActive(Number(product?.images?.length) - 1);
        }
        if (active > 0) {
            setActive((state) => state - 1);
        }
    };

    const handleRightButtonClick = () => {
        if (active === Number(product?.images?.length) - 1) {
            setActive(0);
        }
        if (product?.images && active < product.images.length - 1) {
            setActive((state) => state + 1);
        }
    };

    const handleOptionalImageClick = (index: number) => {
        if (Number(product?.images?.length) - 1 < index) {
            setActive(index - Number(product?.images?.length));
        } else {
            setActive(index);
        }
    };
    return (
        <Wrapper>
            <MainImageWrapper $backgroundColor={backgroundColor}>
                <LabelWrapper>
                    <NewLabel $isNew={isNew}>
                        <NewLabelText>NEW</NewLabelText>
                    </NewLabel>
                    <DiscountLabel $discount={product?.discount ? true : false}>
                        <DiscountLabelText>-{product?.discount?.percent}%</DiscountLabelText>
                    </DiscountLabel>
                </LabelWrapper>
                <ArrowButton onClick={handleLeftButtonClick} $position="left">
                    <ArrowImage $rotation="180" src={arrow.src} />
                </ArrowButton>
                {product?.images?.map((image, index) => {
                    return (
                        <Image
                            $active={index === active}
                            alt="image"
                            key={index}
                            src={imageLinkHandler(image)}
                        />
                    );
                })}
                <ArrowButton onClick={handleRightButtonClick} $position="right">
                    <ArrowImage src={arrow.src} />
                </ArrowButton>
            </MainImageWrapper>
            <OptionalImagesWrapper $invisible={(product?.images?.length || 0) < 4}>
                {optionalImages.map((image, index) => {
                    return (
                        <OptionalImage
                            $active={index - active <= 3 && index - active > 0}
                            alt="image"
                            key={index}
                            src={image}
                            onClick={() => handleOptionalImageClick(index)}
                        />
                    );
                })}
            </OptionalImagesWrapper>
        </Wrapper>
    );
};
const OptionalImage = styled.img<{ $active: boolean | number | undefined }>`
    display: ${({ $active }) => ($active ? "block" : "none")};
    width: 167px;
    height: 167px;
    cursor: pointer;
    pointer-events: none;
`;
const OptionalImagesWrapper = styled.div<{ $invisible: boolean }>`
    width: 549px;
    height: 167px;
    display: ${({ $invisible }) => ($invisible ? "none" : "flex")};
    justify-content: space-between;
    user-select: none;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
`;

const LabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 32px;
    left: 32px;
    width: 84.15px;
    height: 77.11px;
`;
const NewLabelText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    color: #121212;
`;
const NewLabel = styled.div<{ $isNew: boolean }>`
    display: ${({ $isNew }) => ($isNew ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    width: 84px;
    height: 34px;
    border-radius: 4px;
    background-color: #ffffff;
`;
const DiscountLabelText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    color: #fefefe;
`;
const DiscountLabel = styled.div<{ $discount: boolean }>`
    display: ${({ $discount }) => ($discount ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    width: 84px;
    height: 34px;
    border-radius: 4px;
    background-color: #38cb89;
`;

const ArrowButton = styled.div<{ $position: string }>`
    position: absolute;
    left: ${({ $position }) => ($position === "left" ? "32px" : "none")};
    right: ${({ $position }) => ($position === "right" ? "32px" : "none")};
    top: 0;
    bottom: 0;
    margin: auto;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`;
const ArrowImage = styled.img<{ $rotation?: string }>`
    rotate: ${({ $rotation }) => {
        return `${$rotation}deg`;
    }};
    width: 24px;
    height: 24px;
`;
const Image = styled.img<{ $active: boolean }>`
    display: ${({ $active }) => ($active ? "block" : "none")};
    width: 100%;
    height: 100%;
    pointer-events: none;
`;
const MainImageWrapper = styled.div<IWrapperProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    min-width: 547px;
    min-height: 728px;
    user-select: none;
    background-color: ${({ $backgroundColor }) =>
        $backgroundColor ? `#${$backgroundColor}` : "transparent"};
`;

export default ImageSlider;
