import { IReview } from "@/app/_types/types";
import React, { FC, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import Dropdown from "./Dropdown";

interface IProps {
    reviews: IReview[];
}

const ReviewsList: FC<IProps> = ({ reviews }) => {
    // dropdown
    const [isOpenedDropdown, setIsOpenedDropdown] = useState<boolean>(false);
    const [activeDropdownItem, setActiveDropdownItem] = useState<string>("");
    return (
        <Wrapper>
            <LeftAside>
                <TitleBlock>
                    <Title>{reviews.length} Reviews</Title>
                </TitleBlock>
                <ReviewsBlock>
                    {reviews.map((el, index) => {
                        return <Review key={index} review={el} />;
                    })}
                </ReviewsBlock>
            </LeftAside>
            <RightAside>
                <Dropdown
                    isOpened={isOpenedDropdown}
                    setIsOpened={setIsOpenedDropdown}
                    activeItem={activeDropdownItem}
                    setActiveItem={setActiveDropdownItem}
                    items={["Newest", "Oldest", "Most liked"]}
                />
            </RightAside>
        </Wrapper>
    );
};
const LeftAside = styled.aside``;
const RightAside = styled.aside``;
const ReviewsBlock = styled.div`
    display: flex;
    flex-direction: column;
`;
const TitleBlock = styled.div`
    display: flex;
    justify-content: space-between;
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
    justify-content: space-between;
`;

export default ReviewsList;
