import React, { FC } from "react";
import styled from "styled-components";

interface ILogo {
    mainColor?: string;
    dotColor?: string;
}
const Logo: FC<ILogo> = ({ mainColor, dotColor }) => {
    return (
        <LogoWrapper className="poppins">
            3legant<LogoSpan>.</LogoSpan>
        </LogoWrapper>
    );
};
const LogoWrapper = styled.p<ILogo>`
    color: ${(props) => props?.mainColor || "#000000"};
    font-weight: 500;
    font-size: 24px;
`;
const LogoSpan = styled.span<ILogo>`
    color: ${(props) => props?.dotColor || "#6c7275"};
`;
export default Logo;
