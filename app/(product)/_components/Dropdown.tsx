import { Dispatch, FC, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import arrowIcon from "@/public/icons/product/arrowDown.svg";
import { useRouter } from "next/navigation";

interface IProps {
    isOpened: boolean;
    setIsOpened: Dispatch<SetStateAction<boolean>>;
    activeItem: string;
    setActiveItem: Dispatch<SetStateAction<string>>;
    items: string[];
    absolute?: boolean;
    mobile?: boolean;
}

const Dropdown: FC<IProps> = ({
    isOpened,
    setIsOpened,
    activeItem,
    setActiveItem,
    items,
    absolute,
    mobile,
}) => {
    const router = useRouter();
    useEffect(() => {
        setActiveItem(items[0]);
    }, []);
    return (
        <Wrapper
            $mobile={mobile}
            $absolute={absolute}
            onClick={() => setIsOpened((prev) => !prev)}
            $isOpened={isOpened}>
            <DropdownItems $isOpened={isOpened}>
                {items.map((el, index) => {
                    return (
                        <DropdownItem
                            $mobile={mobile}
                            $isOpened={isOpened}
                            $isActive={activeItem === el ? true : false}
                            key={index}
                            onClick={() =>
                                el === "Log Out"
                                    ? () => {
                                          typeof window !== "undefined"
                                              ? localStorage.removeItem("token")
                                              : "";
                                          router.push("/signin");
                                      }
                                    : setActiveItem(el)
                            }>
                            {el[0].toUpperCase() + el.substring(1)}
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
const DropdownItem = styled.div<{ $isActive: boolean; $isOpened: boolean; $mobile?: boolean }>`
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
const Wrapper = styled.div<{ $isOpened: boolean; $absolute?: boolean; $mobile?: boolean }>`
    display: flex;
    position: ${({ $absolute }) => ($absolute ? "absolute" : "static")};
    top: 0;
    right: 0;
    min-width: 256px;
    border-radius: 8px;
    border: 2px #e8ecef solid;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    cursor: pointer;
    background-color: ${({ $mobile }) => ($mobile ? "#FFFFFF" : "transparent")};
    @media screen and (min-width: 1120px) {
        display: ${({ $mobile }) => ($mobile ? "none" : "flex")};
    }
`;

export default Dropdown;
