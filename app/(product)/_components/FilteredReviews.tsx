"use client";
import { IReview } from "@/app/_types/types";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Review from "./Review";

interface IProps {
    reviews: IReview[];
    activeItem: string;
    userReview?: IReview;
}

const FilteredReviews: FC<IProps> = ({ reviews, activeItem, userReview }) => {
    const [filteredReviews, setFilteredReviews] = useState<IReview[]>();
    useEffect(() => {
        if (activeItem === "Newest") {
            setFilteredReviews(
                userReview
                    ? [
                          userReview,
                          ...[
                              ...reviews.toSpliced(
                                  reviews.findIndex((value) => value.id === userReview.id),
                                  reviews.find((value) => value.id === userReview.id) ? 1 : 0,
                              ),
                          ].sort(
                              (a, b) =>
                                  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
                          ),
                      ]
                    : [...reviews].sort(
                          (a, b) =>
                              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
                      ),
            );
        } else if (activeItem === "Oldest") {
            setFilteredReviews(
                userReview
                    ? [
                          userReview,
                          ...[
                              ...reviews.toSpliced(
                                  reviews.findIndex((value) => value.id === userReview.id),
                                  reviews.find((value) => value.id === userReview.id) ? 1 : 0,
                              ),
                          ].sort(
                              (a, b) =>
                                  new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
                          ),
                      ]
                    : [...reviews].sort(
                          (a, b) =>
                              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
                      ),
            );
        } else if (activeItem === "Most liked") {
            setFilteredReviews(
                userReview
                    ? [
                          userReview,
                          ...[
                              ...reviews.toSpliced(
                                  reviews.findIndex((value) => value.id === userReview.id),
                                  reviews.find((value) => value.id === userReview.id) ? 1 : 0,
                              ),
                          ].sort((a, b) => Number(b.likes?.length) - Number(a.likes?.length)),
                      ]
                    : [...reviews].sort(
                          (a, b) => Number(b.likes?.length) - Number(a.likes?.length),
                      ),
            );
        }
    }, [activeItem, reviews, userReview]);
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
