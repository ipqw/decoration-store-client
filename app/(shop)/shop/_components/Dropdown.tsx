"use client";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import arrowIcon from "@/public/icons/product/arrowDown.svg";

interface IProps {
    isOpened: boolean;
    setIsOpened: Dispatch<SetStateAction<boolean>>;
    activeItem: string;
    setActiveItem: Dispatch<SetStateAction<string>>;
    items: string[];
}

const Dropdown: FC<IProps> = ({ isOpened, setIsOpened, activeItem, setActiveItem, items }) => {
    useEffect(() => {
        setActiveItem(items[0]);
    }, []);
    return (
        <Wrapper onClick={() => setIsOpened((prev) => !prev)}>
            <DropdownOpener>
                <DropdownOpenerText>{activeItem}</DropdownOpenerText>
                <Arrow $isOpened={isOpened} src={arrowIcon.src} />
            </DropdownOpener>
            <DropdownItems $isOpened={isOpened}>
                {items.map((el, index) => {
                    return (
                        <DropdownItem
                            $isOpened={isOpened}
                            $isActive={activeItem === el ? true : false}
                            key={index}
                            onClick={() => setActiveItem(el)}>
                            {el}
                        </DropdownItem>
                    );
                })}
            </DropdownItems>
        </Wrapper>
    );
};
const DropdownOpenerText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    color: #141718;
    user-select: none;
`;
const Arrow = styled.img<{ $isOpened: boolean }>`
    width: 24px;
    height: 24px;
    user-select: none;
    transform: ${({ $isOpened }) => ($isOpened ? "scaleY(-1)" : "none")};
`;
const DropdownItem = styled.div<{ $isActive: boolean; $isOpened: boolean }>`
    user-select: none;
    display: flex;
    align-items: center;
    background-color: ${({ $isActive }) => {
        if ($isActive) {
            return "#F3F5F7";
        } else {
            return "transparent";
        }
    }};
    border-radius: 8px;
    width: 100%;
    height: ${({ $isOpened }) => ($isOpened ? "42px" : "32px")};
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    color: ${({ $isActive }) => ($isActive ? "#141718;" : "#6C7275")};
    padding: 8px;
    cursor: pointer;
`;
const DropdownItems = styled.div<{ $isOpened: boolean }>`
    display: ${({ $isOpened }) => ($isOpened ? "flex" : "none")};
    flex-direction: column;
    row-gap: 8px;
    border: 1.5px solid #f3f5f7;
    border-radius: 12px;
    width: 100%;
    padding: 8px;
`;
const DropdownOpener = styled.div`
    display: flex;
    min-width: 262px;
    border-radius: 8px;
    border: 2px #6c7275 solid;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    cursor: pointer;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
`;

export default Dropdown;
