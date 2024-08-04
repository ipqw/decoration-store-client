import { FC, ReactNode, useState } from "react";
import styled from "styled-components";
import arrowIcon from "@/public/icons/product/arrowDown.svg";

interface IProps {
    title: string;
    children?: ReactNode;
}

const MobileTab: FC<IProps> = ({ title, children }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    return (
        <Wrapper>
            <TopBlock onClick={() => setIsActive((prev) => !prev)}>
                <Text $isActive={isActive}>{title}</Text>
                <Arrow src={arrowIcon.src} $isActive={isActive} />
            </TopBlock>
            <Content $isVisible={isActive}>{children}</Content>
        </Wrapper>
    );
};
const Content = styled.div<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;
const Arrow = styled.img<{ $isActive: boolean }>`
    width: 24px;
    height: 24px;
    transform: ${({ $isActive }) => ($isActive ? "scaleY(-1)" : "none")};
`;
const Text = styled.p<{ $isActive: boolean }>`
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
    color: ${({ $isActive }) => ($isActive ? "#141718" : "#6C7275")};
`;
const TopBlock = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px #6c7275 solid;
`;

export default MobileTab;
