import { IReview } from "@/app/_types/types";
import React, { FC } from "react";
import styled from "styled-components";
import Review from "./Review";

interface IProps {
    reviews: IReview[];
}

const ReviewsList: FC<IProps> = ({ reviews }) => {
    return (
        <Wrapper>
            {reviews.map((el, index) => {
                return <Review key={index} review={el} />;
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default ReviewsList;
