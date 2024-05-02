"use client";
import { IReview } from "@/app/_types/types";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Review from "./Review";

interface IProps {
    reviews: IReview[];
    activeItem: string;
}

const FilteredReviews: FC<IProps> = ({ reviews, activeItem }) => {
    const [filteredReviews, setFilteredReviews] = useState<IReview[]>();
    useEffect(() => {
        if (activeItem === "Newest") {
            setFilteredReviews(
                [...reviews].sort(
                    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
                ),
            );
        } else if (activeItem === "Oldest") {
            setFilteredReviews(
                [...reviews].sort(
                    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
                ),
            );
        } else if (activeItem === "Most liked") {
            setFilteredReviews(
                [...reviews].sort((a, b) => Number(b.likes?.length) - Number(a.likes?.length)),
            );
        }
    }, [activeItem, reviews]);
    return (
        <Wrapper>
            {filteredReviews?.map((el, index) => {
                return <Review key={index} review={el} />;
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default FilteredReviews;
