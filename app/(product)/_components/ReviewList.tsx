"use client";
import { IProductGroup, IReview } from "@/app/_types/types";
import React, { FC, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import Dropdown from "./Dropdown";
import emptyStar from "@/public/icons/emptyStar.svg";
import fullStar from "@/public/icons/fullStar.svg";
import ReviewInput from "./ReviewCreator";

interface IProps {
    reviews: IReview[];
    averageRate: number;
    productGroup?: IProductGroup;
}

const ReviewsList: FC<IProps> = ({ reviews, averageRate, productGroup }) => {
    // dropdown
    const [isOpenedDropdown, setIsOpenedDropdown] = useState<boolean>(false);
    const [activeDropdownItem, setActiveDropdownItem] = useState<string>("");
    return (
        <Wrapper>
            <WriteReviewSection>
                <Title>Customer Reviews</Title>
                <Info>
                    <StarsWrapper>
                        <Star src={averageRate >= 1 ? fullStar.src : emptyStar.src} />
                        <Star src={averageRate >= 2 ? fullStar.src : emptyStar.src} />
                        <Star src={averageRate >= 3 ? fullStar.src : emptyStar.src} />
                        <Star src={averageRate >= 4 ? fullStar.src : emptyStar.src} />
                        <Star src={averageRate >= 5 ? fullStar.src : emptyStar.src} />
                    </StarsWrapper>
                    <InfoText>
                        {reviews.length} {reviews.length > 1 ? "Reviews" : "Review"}
                    </InfoText>
                </Info>
                <ReviewInput reviews={reviews} productGroup={productGroup} />
            </WriteReviewSection>
            <ReviewsSection>
                <aside>
                    <TitleBlock>
                        <Title>
                            {reviews.length} {reviews.length > 1 ? "Reviews" : "Review"}
                        </Title>
                    </TitleBlock>
                    <ReviewsBlock>
                        {reviews.map((el, index) => {
                            return <Review key={index} review={el} />;
                        })}
                    </ReviewsBlock>
                </aside>
                <aside>
                    <Dropdown
                        isOpened={isOpenedDropdown}
                        setIsOpened={setIsOpenedDropdown}
                        activeItem={activeDropdownItem}
                        setActiveItem={setActiveDropdownItem}
                        items={["Newest", "Oldest", "Most liked"]}
                    />
                </aside>
            </ReviewsSection>
        </Wrapper>
    );
};
const Info = styled.div`
    display: flex;
    column-gap: 8px;
    align-items: center;
`;
const InfoText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
`;
const Star = styled.img`
    width: 16px;
    height: 16px;
    user-select: none;
`;
const StarsWrapper = styled.div`
    display: flex;
`;
const WriteReviewSection = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
`;
const ReviewsSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const ReviewsBlock = styled.div`
    display: flex;
    flex-direction: column;
`;
const TitleBlock = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
`;
const Title = styled.p`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 28px;
    line-height: 34px;
    color: #000000;
`;
const Wrapper = styled.div`
    width: 1120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export default ReviewsList;
