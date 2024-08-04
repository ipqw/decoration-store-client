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
    grid-template-columns: auto auto;
    column-gap: 23px;
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
    padding: 0 72px;
    row-gap: 19px;
    min-width: 851px;
`;

export default AddressSection;
