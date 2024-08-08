"use client";
import { useAppSelector } from "@/store/hooks";
import styled from "styled-components";
import AddressCard from "./AddressCard";

const AddressSection = () => {
    const user = useAppSelector((state) => state.user);
    return (
        <Wrapper>
            <Title>Address</Title>
            <AddressesBlock>
                {user.addresses?.map((el, index) => <AddressCard key={index} address={el} />)}
            </AddressesBlock>
        </Wrapper>
    );
};
const AddressesBlock = styled.div`
    display: grid;
    grid-template-columns: auto;
    column-gap: 23px;
    row-gap: 24px;
    @media screen and (min-width: 1120px) {
        grid-template-columns: auto auto;
    }
`;
const Title = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    line-height: 32px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    row-gap: 19px;
    width: 312px;
    min-width: auto;
    @media screen and (min-width: 1120px) {
        min-width: 851px;
        width: auto;
        padding: 0 72px;
    }
`;

export default AddressSection;
