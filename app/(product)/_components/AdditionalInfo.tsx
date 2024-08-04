"use client";
import { IProductInfo } from "@/app/_types/types";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Info from "./Info";

interface IProps {
    infos: IProductInfo[];
}

const AdditionalInfo: FC<IProps> = ({ infos }) => {
    const [filteredInfos, setFilteredInfos] = useState<IProductInfo[]>([]);
    useEffect(() => {
        setFilteredInfos(() => {
            return [...infos].filter(
                (info) =>
                    info.name !== "about" && info.name !== "measurements" && info.name !== "color",
            );
        });
    }, [infos]);
    return (
        <Wrapper>
            {filteredInfos.map((el, index) => {
                return <Info title={el.name} text={el.text} key={index} />;
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    padding-top: 16px;
    width: 100%;
`;

export default AdditionalInfo;
