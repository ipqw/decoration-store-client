"use client";
import { IReview } from "@/app/_types/types";
import { userApiSlice } from "@/store/services/userApiSlice";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import blankAvatar from "@/public/icons/blankAvatar.png";
import emptyStar from "@/public/icons/emptyStar.svg";
import fullStar from "@/public/icons/fullStar.svg";
import likeIcon from "@/public/icons/product/Wishlist.svg";
import filledLikeIcon from "@/public/icons/product/FilledWishlist.svg";
import { reviewApiSlice } from "@/store/services/reviewApiSlice";
import { useAppSelector } from "@/store/hooks";
import { imageLinkHandler } from "@/app/_lib/functions";

interface IProps {
    review: IReview;
}

const Review: FC<IProps> = ({ review }) => {
    // queries
    const { data: reviewAuthor } = userApiSlice.useGetUserQuery(review.userId);
    const user = useAppSelector((state) => state.user);
    const { data: like } = reviewApiSlice.useGetOneLikeByReviewIdAndUserIdQuery({
        userId: user?.id || 0,
        reviewId: review.id,
    });
    const [isLiked, setIsLiked] = useState<boolean>(like ? true : false);
    const [likeCounter, setLikeCounter] = useState<number>(Number(review.likes?.length));
    useEffect(() => {
        if (user.id !== 0) {
            setIsLiked(like ? true : false);
        }
    }, [like, user]);
    useEffect(() => {
        setLikeCounter(Number(review.likes?.length));
    }, [review]);

    // mutations
    const [createLike, { isLoading: isLoadingCreateLike }] = reviewApiSlice.useCreateLikeMutation();
    const [removeLike, { isLoading: isLoadingRemoveLike }] = reviewApiSlice.useRemoveLikeMutation();

    const buttonClickHandler = () => {
        if (user.id !== 0) {
            if (isLiked && like && !isLoadingCreateLike) {
                removeLike(like);
                setIsLiked(false);
                setLikeCounter((prev) => prev - 1);
            } else if (user && !isLoadingRemoveLike) {
                createLike({ reviewId: review.id, userId: user?.id });
                setIsLiked(true);
                setLikeCounter((prev) => prev + 1);
            }
        }
    };
    return (
        <Wrapper>
            <MainVersion>
                <Avatar
                    src={
                        reviewAuthor?.imageUrl
                            ? imageLinkHandler(reviewAuthor?.imageUrl)
                            : blankAvatar.src
                    }
                />
                <InfoBlock>
                    <Name>{reviewAuthor?.displayName}</Name>
                    <StarsWrapper>
                        <Star src={review.rate >= 1 ? fullStar.src : emptyStar.src} />
                        <Star src={review.rate >= 2 ? fullStar.src : emptyStar.src} />
                        <Star src={review.rate >= 3 ? fullStar.src : emptyStar.src} />
                        <Star src={review.rate >= 4 ? fullStar.src : emptyStar.src} />
                        <Star src={review.rate >= 5 ? fullStar.src : emptyStar.src} />
                    </StarsWrapper>
                    <Text>{review.text}</Text>
                    <LikeWrapper>
                        <LikeText>{likeCounter} likes</LikeText>•
                        <Button onClick={buttonClickHandler}>
                            <ButtonImg src={isLiked ? filledLikeIcon.src : likeIcon.src} /> Like
                        </Button>
                    </LikeWrapper>
                </InfoBlock>
            </MainVersion>
            <MobileVersion>
                <MobileAccountInfo>
                    <Avatar
                        src={
                            reviewAuthor?.imageUrl
                                ? imageLinkHandler(reviewAuthor?.imageUrl)
                                : blankAvatar.src
                        }
                    />
                    <InfoWrapper>
                        <Name>{reviewAuthor?.displayName}</Name>
                        <StarsWrapper>
                            <Star src={review.rate >= 1 ? fullStar.src : emptyStar.src} />
                            <Star src={review.rate >= 2 ? fullStar.src : emptyStar.src} />
                            <Star src={review.rate >= 3 ? fullStar.src : emptyStar.src} />
                            <Star src={review.rate >= 4 ? fullStar.src : emptyStar.src} />
                            <Star src={review.rate >= 5 ? fullStar.src : emptyStar.src} />
                        </StarsWrapper>
                    </InfoWrapper>
                </MobileAccountInfo>
                <Text>{review.text}</Text>
                <LikeWrapper>
                    <LikeText>{likeCounter} likes</LikeText>•
                    <Button onClick={buttonClickHandler}>
                        <ButtonImg src={isLiked ? filledLikeIcon.src : likeIcon.src} /> Like
                    </Button>
                </LikeWrapper>
            </MobileVersion>
        </Wrapper>
    );
};
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
`;
const MobileAccountInfo = styled.div`
    display: flex;
    column-gap: 16px;
`;
const MobileVersion = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    @media screen and (min-width: 1120px) {
        display: none;
    }
`;
const MainVersion = styled.div`
    display: none;
    @media screen and (min-width: 1120px) {
        display: block;
    }
`;
const LikeText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: #23262f;
    padding-right: 5px;
`;
const LikeWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const ButtonImg = styled.img`
    width: 18px;
    height: 18px;
`;
const Button = styled.div`
    display: flex;
    align-items: center;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: #23262f;
    cursor: pointer;
    column-gap: 5px;
    padding-left: 5px;
    padding-top: 2px;
    user-select: none;
`;
const Text = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color: #353945;
    padding-bottom: 8px;
    hyphens: auto;
    word-wrap: break-word;
`;
const Star = styled.img`
    width: 16px;
    height: 16px;
    user-select: none;
`;
const StarsWrapper = styled.div`
    display: flex;
    padding-bottom: 8px;
`;
const Name = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
    hyphens: auto;
    word-wrap: break-word;
    @media screen and (min-width: 1120px) {
        padding-bottom: 8px;
    }
`;
const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
`;
const Avatar = styled.img`
    border-radius: 48px;
    width: 72px;
    height: 72px;
    user-select: none;
`;
const Wrapper = styled.div`
    display: flex;
    column-gap: 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e8ecef;
    width: 100%;
    padding-top: 24px;
`;

export default Review;
