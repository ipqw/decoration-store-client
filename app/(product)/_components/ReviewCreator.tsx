"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ReviewCreator = () => {
    const [textareaHeight, setTextareaHeight] = useState<number | string>(52);
    const textareaInputHandler = (el: any) => {
        setTextareaHeight(el.target.scrollHeight);
    };
    return (
        <Wrapper>
            <Textarea onInput={textareaInputHandler} $height={textareaHeight} />
            <SubmitButton>Write Review</SubmitButton>
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
