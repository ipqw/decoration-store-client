"use client";
import { IProductGroup, IReview } from "@/app/_types/types";
import { useAppSelector } from "@/store/hooks";
import { reviewApiSlice } from "@/store/services/reviewApiSlice";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import submitArrowIcon from "@/public/icons/product/ArrowRight.svg";

interface IProps {
    productGroup?: IProductGroup;
    userReview?: IReview;
    rate: number;
    setRate: Dispatch<SetStateAction<number>>;
}

const ReviewCreator: FC<IProps> = ({ productGroup, userReview, rate, setRate }) => {
    const router = useRouter();
    const user = useAppSelector((state) => state.user);

    const [textareaValue, setTextareaValue] = useState<string>(userReview?.text || "");
    const [textareaHeight, setTextareaHeight] = useState<number | string>(52);

    useEffect(() => {
        setTextareaValue(userReview?.text || "");
        setRate(userReview?.rate || 5);
    }, [userReview, setRate]);

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
            if (userReview) {
                updateReview({
                    id: userReview.id,
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
        } else if (!(typeof window !== "undefined" ? localStorage.getItem("token") : false)) {
            router.push("/signin");
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
                $updateReview={userReview ? true : false}
                onClick={submitButtonHandler}>
                {userReview ? "Update Review" : "Write Review"}
            </SubmitButton>
            <MobileSubmitButton>
                <MobileSubmitIcon src={submitArrowIcon.src} />
            </MobileSubmitButton>
        </Wrapper>
    );
};
const MobileSubmitButton = styled.div`
    display: flex;
    width: 32px;
    height: 32px;
    background-color: #141718;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 1120px) {
        display: none;
    }
`;
const MobileSubmitIcon = styled.img`
    width: 24px;
    height: 24px;
`;
const Wrapper = styled.div`
    display: flex;
    column-gap: 15px;
    border-radius: 16px;
    min-height: 64px;
    width: 100%;
    border: #e8ecef solid 2px;
    background-color: #fefefe;
    padding: 16px 24px;
    align-items: center;
    justify-content: space-between;
    @media screen and (min-width: 1120px) {
        align-items: normal;
        min-height: 72px;
    }
`;
const Textarea = styled.textarea<{ $height: number | string }>`
    height: ${({ $height }) => (typeof $height === "string" ? $height : $height + "px")};
    width: 85%;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color: #353945;
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
    display: none;
    height: 40px;
    padding: 6px 40px;
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
    @media screen and (min-width: 1120px) {
        display: block;
    }
`;

export default ReviewCreator;
