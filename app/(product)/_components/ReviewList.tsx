"use client";
import { IProductGroup } from "@/app/_types/types";
import { FC, MouseEventHandler, useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import emptyStar from "@/public/icons/emptyStar.svg";
import fullStar from "@/public/icons/fullStar.svg";
import ReviewCreator from "./ReviewCreator";
import { reviewApiSlice } from "@/store/services/reviewApiSlice";
import FilteredReviews from "./FilteredReviews";
import { useAppSelector } from "@/store/hooks";

interface IProps {
    averageRate: number;
    productGroup?: IProductGroup;
}

const ReviewsList: FC<IProps> = ({ averageRate, productGroup }) => {
    const [reviewAmount, setReviewAmount] = useState<number>(5);
    const user = useAppSelector((state) => state.user);

    // dropdown
    const [isOpenedDropdown, setIsOpenedDropdown] = useState<boolean>(false);
    const [activeDropdownItem, setActiveDropdownItem] = useState<string>("");

    // queries
    const { data, isLoading, error } = reviewApiSlice.useGetAllReviewsQuery({
        limit: reviewAmount,
        productGroupId: productGroup?.id,
    });
    const {
        data: userReview,
        isLoading: isLoadingUserReview,
        error: userReviewError,
    } = reviewApiSlice.useGetReviewByUserIdAndProductGroupIdQuery({
        productGroupId: productGroup?.id || 0,
        userId: user.id,
    });

    const [rate, setRate] = useState<number>(5);

    // handlers
    const mouseClickHandler: MouseEventHandler<HTMLImageElement> = (el: any) => {
        setRate(Number(el.target.id));
    };
    const loadMoreButtonHandler: MouseEventHandler<HTMLImageElement> = (el) => {
        setReviewAmount((prev) => prev + 5);
    };
    return (
        <Wrapper $isVisible={!isLoading && !error && data?.reviews ? true : false}>
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
                        {data?.amount} {(data?.amount || 0) > 1 ? "Reviews" : "Review"}
                    </InfoText>
                </Info>
                <RateSetter>
                    <RateTitle>Your rate:</RateTitle>
                    <StarsWrapper>
                        <RateStar
                            onClick={mouseClickHandler}
                            src={rate >= 1 ? fullStar.src : emptyStar.src}
                            id="1"
                        />
                        <RateStar
                            onClick={mouseClickHandler}
                            src={rate >= 2 ? fullStar.src : emptyStar.src}
                            id="2"
                        />
                        <RateStar
                            onClick={mouseClickHandler}
                            src={rate >= 3 ? fullStar.src : emptyStar.src}
                            id="3"
                        />
                        <RateStar
                            onClick={mouseClickHandler}
                            src={rate >= 4 ? fullStar.src : emptyStar.src}
                            id="4"
                        />
                        <RateStar
                            onClick={mouseClickHandler}
                            src={rate >= 5 ? fullStar.src : emptyStar.src}
                            id="5"
                        />
                    </StarsWrapper>
                </RateSetter>
                <ReviewCreator
                    rate={rate}
                    setRate={setRate}
                    userReview={userReview}
                    productGroup={productGroup}
                />
            </WriteReviewSection>
            <ReviewsSection>
                <aside>
                    <TitleBlock>
                        <Title>
                            {data?.amount} {(data?.amount || 0) > 1 ? "Reviews" : "Review"}
                        </Title>
                    </TitleBlock>
                    <ReviewsBlock>
                        <FilteredReviews
                            activeItem={activeDropdownItem}
                            userReview={userReview}
                            reviews={data?.reviews || []}
                        />
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
            <LoadMoreButton
                $isVisible={Number(data?.amount) === data?.reviews.length ? true : false}
                onClick={loadMoreButtonHandler}>
                Load more
            </LoadMoreButton>
        </Wrapper>
    );
};
const LoadMoreButton = styled.p<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "none" : "block")};
    border-radius: 80px;
    border: #141718 1px solid;
    font-size: 16px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    color: #141718;
    padding: 6px 40px;
    width: fit-content;
    margin-top: 24px;
    align-self: center;
    cursor: pointer;
`;
const RateStar = styled.img`
    width: 32px;
    height: 32px;
    user-select: none;
    cursor: pointer;
`;
const RateTitle = styled.p`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;
    color: #000000;
`;
const RateSetter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px 24px;
    border: 2px #e8ecef solid;
    border-radius: 16px;
    background-color: #fefefe;
`;
const Info = styled.div`
    display: flex;
    column-gap: 8px;
    align-items: center;
    padding-bottom: 10px;
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
    padding-bottom: 4px;
`;
const WriteReviewSection = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    padding-bottom: 40px;
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
const Wrapper = styled.div<{ $isVisible: boolean }>`
    width: 1120px;
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    flex-direction: column;
    justify-content: space-between;
    padding-top: 24px;
`;

export default ReviewsList;
