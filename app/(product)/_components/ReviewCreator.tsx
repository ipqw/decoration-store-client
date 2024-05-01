"use client";
import { IProductGroup, IReview } from "@/app/_types/types";
import { useAppSelector } from "@/store/hooks";
import { reviewApiSlice } from "@/store/services/reviewApiSlice";
import React, { FC, useState } from "react";
import styled from "styled-components";

interface IProps {
    productGroup?: IProductGroup;
    reviews: IReview[];
}

const ReviewCreator: FC<IProps> = ({ productGroup, reviews }) => {
    const [textareaValue, setTextareaValue] = useState<string>("");
    const [textareaHeight, setTextareaHeight] = useState<number | string>(52);
    const textareaInputHandler = (el: any) => {
        setTextareaHeight(el.target.scrollHeight);
        setTextareaValue(el.target.value);
    };

    const user = useAppSelector((state) => state.user);

    // mutations
    const [createReview, { isLoading: isLoadingCreateReview }] =
        reviewApiSlice.useCreateReviewMutation();

    const submitButtonHandler = () => {
        if (user.id && !isLoadingCreateReview && productGroup) {
            createReview({
                rate: 1,
                userId: user.id,
                productGroupId: productGroup.id,
                text: textareaValue,
            });
            setTextareaValue("");
        }
    };
    return (
        <Wrapper>
            <Textarea
                value={textareaValue}
                onInput={textareaInputHandler}
                $height={textareaHeight}
            />
            <SubmitButton onClick={submitButtonHandler}>Write Review</SubmitButton>
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
const SubmitButton = styled.p`
    height: 40px;
    padding: 6px 40px;
    margin-left: 15px;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    background-color: #141718;
    border-radius: 80px;
    cursor: pointer;
    min-width: 180px;
`;

export default ReviewCreator;
