"use client";
import { IProductGroup, IReview } from "@/app/_types/types";
import { useAppSelector } from "@/store/hooks";
import { reviewApiSlice } from "@/store/services/reviewApiSlice";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

interface IProps {
    productGroup?: IProductGroup;
    reviews: IReview[];
    rate: number;
    setRate: Dispatch<SetStateAction<number>>;
}

const ReviewCreator: FC<IProps> = ({ productGroup, reviews, rate, setRate }) => {
    const router = useRouter();
    const user = useAppSelector((state) => state.user);
    const previousReview = reviews.find((el) => el.userId === user.id);

    const [textareaValue, setTextareaValue] = useState<string>(previousReview?.text || "");
    const [textareaHeight, setTextareaHeight] = useState<number | string>(52);

    useEffect(() => {
        setTextareaValue(previousReview?.text || "");
        setRate(previousReview?.rate || 5);
    }, [previousReview, setRate]);

    const textareaInputHandler = (el: any) => {
        setTextareaHeight(el.target.scrollHeight);
        setTextareaValue(el.target.value);
    };

    // mutations
    const [createReview, { isLoading: isLoadingCreateReview }] =
        reviewApiSlice.useCreateReviewMutation();
    const [updateReview, { isLoading: isLoadingUpdateReview }] =
        reviewApiSlice.useUpdateReviewMutation();

    const submitButtonHandler = () => {
        if (
            user.id &&
            !isLoadingCreateReview &&
            !isLoadingUpdateReview &&
            productGroup &&
            textareaValue
        ) {
            if (previousReview) {
                updateReview({
                    id: previousReview.id,
                    text: textareaValue,
                    rate,
                });
            } else {
                createReview({
                    rate,
                    userId: user.id,
                    productGroupId: productGroup.id,
                    text: textareaValue,
                });
            }
        } else if (!user.id) {
            router.replace("/signin");
        }
    };
    return (
        <Wrapper>
            <Textarea
                value={textareaValue}
                onInput={textareaInputHandler}
                $height={textareaHeight}
            />
            <SubmitButton
                $disabled={!user.id ? true : false}
                $updateReview={previousReview ? true : false}
                onClick={submitButtonHandler}>
                {previousReview ? "Update Review" : "Write Review"}
            </SubmitButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    border-radius: 16px;
    min-height: 72px;
    width: 100%;
    border: #e8ecef solid 2px;
    background-color: #fefefe;
    padding: 16px 24px;
`;
const Textarea = styled.textarea<{ $height: number | string }>`
    height: ${({ $height }) => (typeof $height === "string" ? $height : $height + "px")};
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color: #353945;
    width: 100%;
    resize: none;
    &:focus {
        border: none;
        outline: none;
    }
    &::after {
        visibility: hidden;
    }
`;
const SubmitButton = styled.p<{ $updateReview: boolean; $disabled: boolean }>`
    height: 40px;
    padding: 6px 40px;
    margin-left: 15px;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    user-select: none;
    margin-top: 5px;
    background-color: ${({ $disabled }) => ($disabled ? "#4a4d4e" : "#141718")};
    border-radius: 80px;
    cursor: pointer;
    min-width: ${({ $updateReview }) => ($updateReview ? "196px" : "180px")};
`;

export default ReviewCreator;
