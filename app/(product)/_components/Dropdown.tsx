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
        <Wrapper onClick={() => setIsOpened((prev) => !prev)} $isOpened={isOpened}>
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
            <Arrow $isOpened={isOpened} src={arrowIcon.src} />
        </Wrapper>
    );
};
const Arrow = styled.img<{ $isOpened: boolean }>`
    width: 24px;
    height: 24px;
    user-select: none;
    display: ${({ $isOpened }) => ($isOpened ? "none" : "flex")};
`;
const DropdownItem = styled.div<{ $isActive: boolean; $isOpened: boolean }>`
    user-select: none;
    display: ${({ $isOpened, $isActive }) => {
        if ($isOpened) {
            return "flex";
        } else if ($isActive) {
            return "flex";
        } else {
            return "none";
        }
    }};
    align-items: center;
    background-color: ${({ $isActive, $isOpened }) => {
        if (!$isOpened) {
            return "transparent";
        } else if ($isActive) {
            return "#F3F5F7";
        } else {
            return "#FFFFFF";
        }
    }};
    border-radius: 8px;
    width: 100%;
    height: ${({ $isOpened }) => ($isOpened ? "42px" : "32px")};
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    color: #141718;
    padding: 0 8px;
`;
const DropdownItems = styled.div<{ $isOpened: boolean }>`
    width: ${({ $isOpened }) => ($isOpened ? "100%" : "fit-content")};
`;
const Wrapper = styled.div<{ $isOpened: boolean }>`
    display: flex;
    min-width: 256px;
    border-radius: 8px;
    border: 2px #e8ecef solid;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    cursor: pointer;
`;

export default Dropdown;
