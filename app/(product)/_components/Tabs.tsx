import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

interface IProps {
    activeTab: number;
    setActiveTab: Dispatch<SetStateAction<number>>;
}

const Tabs: FC<IProps> = ({ activeTab, setActiveTab }) => {
    return (
        <Wrapper>
            <Text onClick={() => setActiveTab(0)} $active={activeTab === 0}>
                Additional Info
            </Text>
            <Text onClick={() => setActiveTab(1)} $active={activeTab === 1}>
                Reviews
            </Text>
        </Wrapper>
    );
};

const Text = styled.p<{ $active: boolean }>`
    color: ${({ $active }) => ($active ? "#121212" : "#807E7E")};
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
    height: 32px;
    border-bottom: ${({ $active }) => ($active ? "#121212 solid 1px" : "transparent solid 1px")};
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
`;
const Wrapper = styled.div`
    display: flex;
    column-gap: 80px;
    border-bottom: solid 1px #e8ecef;
    align-items: center;
`;

export default Tabs;
