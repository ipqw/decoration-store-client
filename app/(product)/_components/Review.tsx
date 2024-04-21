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

interface IProps {
    review: IReview;
}

const Review: FC<IProps> = ({ review }) => {
    // queries
    const { data: user } = userApiSlice.useGetUserQuery(review.userId);
    const { data: like, isLoading: isLikeLoading } =
        reviewApiSlice.useGetOneLikeByReviewIdAndUserIdQuery({
            userId: user?.id || 0,
            reviewId: review.id,
        });
    const [isLiked, setIsLiked] = useState<boolean>(like ? true : false);
    const [likeCounter, setLikeCounter] = useState<number>(Number(review.likes?.length));
    useEffect(() => {
        setIsLiked(like ? true : false);
    }, [like]);

    // mutations
    const [createLike, { isLoading: isLoadingCreateLike }] = reviewApiSlice.useCreateLikeMutation();
    const [removeLike, { isLoading: isLoadingRemoveLike }] = reviewApiSlice.useRemoveLikeMutation();

    const buttonClickHandler = () => {
        if (isLiked && like && !isLoadingCreateLike) {
            removeLike(like);
            setIsLiked(false);
            setLikeCounter((prev) => prev - 1);
        } else if (user && !isLoadingRemoveLike) {
            createLike({ reviewId: review.id, userId: user?.id });
            setIsLiked(true);
            setLikeCounter((prev) => prev + 1);
        }
    };
    return (
        <Wrapper>
            <Avatar src={user?.imageUrl || blankAvatar.src} />
            <InfoBlock>
                <Name>{user?.displayName}</Name>
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
        </Wrapper>
    );
};
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
`;
const Text = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color: #353945;
    padding-bottom: 8px;
`;
const Star = styled.img`
    width: 16px;
    height: 16px;
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
    padding-bottom: 8px;
`;
const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
`;
const Avatar = styled.img`
    border-radius: 48px;
    width: 72px;
    height: 72px;
`;
const Wrapper = styled.div`
    display: flex;
    column-gap: 40px;
`;

export default Review;
