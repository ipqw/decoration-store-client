"use client";
import { FC } from "react";
import styled from "styled-components";

interface ILogo {
    maincolor?: string;
    dotcolor?: string;
    small?: boolean;
}
const Logo: FC<ILogo> = ({ maincolor, dotcolor, small }) => {
    return (
        <LogoWrapper $maincolor={maincolor} $small={small}>
            3legant<LogoSpan $dotcolor={dotcolor}>.</LogoSpan>
        </LogoWrapper>
    );
};
const LogoWrapper = styled.p<{ $maincolor?: string; $small?: boolean }>`
    color: ${({ $maincolor }) => $maincolor || "#000000"};
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    font-size: ${({ $small }) => ($small ? "16px" : "24px")};
    cursor: default;
    user-select: none;
    width: fit-content;
`;
const LogoSpan = styled.span<{ $dotcolor?: string }>`
    color: ${({ $dotcolor }) => $dotcolor || "#6c7275"};
`;
export default Logo;
