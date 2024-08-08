"use client";
import { IAddress } from "@/app/_types/types";
import { FC } from "react";
import styled from "styled-components";
import editIcon from "@/public/icons/account/edit.svg";

const AddressCard: FC<{ address: IAddress }> = ({ address }) => {
    return (
        <Wrapper>
            <TitleBlock>
                <Title>{address.name}</Title>
                <EditButton>
                    <EditButtonIcon src={editIcon.src} />
                    <EditButtonText>Edit</EditButtonText>
                </EditButton>
            </TitleBlock>
            <InfoBlock>
                <InfoText>{address.recipientName || "Unknown"}</InfoText>
                <InfoText>{address.phoneNumber || "Unknown"}</InfoText>
                <InfoText>
                    {address.houseNumber} {address.street || "Unknown"}, {address.city},{" "}
                    {address.country}
                </InfoText>
            </InfoBlock>
        </Wrapper>
    );
};
const InfoText = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #000000;
`;
const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4px;
`;
const EditButtonText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
`;
const EditButtonIcon = styled.img`
    width: 16px;
    height: 16px;
`;
const EditButton = styled.div`
    display: flex;
    column-gap: 4px;
    align-items: center;
    cursor: pointer;
    height: fit-content;
`;
const Title = styled.p`
    color: #000000;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
`;
const TitleBlock = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Wrapper = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    border-radius: 8px;
    border: 1px solid #6c7275;
    min-width: auto;
    min-height: 140px;
    width: 312px;
    @media screen and (min-width: 1120px) {
        min-width: 342px;
        width: auto;
    }
`;

export default AddressCard;
