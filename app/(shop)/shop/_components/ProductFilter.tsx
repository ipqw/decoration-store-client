"use client";
import { IProduct } from "@/app/_types/types";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

import filterIcon from "@/public/icons/shop/filter.svg";
import { typeApiSlice } from "@/store/services/typeApiSlice";
import CheckboxInput from "@/app/_components/CheckboxInput";

interface IProps {
    products: IProduct[];
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
}

const ProductFilter: FC<IProps> = ({ products, setProducts }) => {
    // queries
    const { data: types, isLoading, error, refetch } = typeApiSlice.useGetAllTypesQuery(null);

    // hooks
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [activePrice, setActivePrice] = useState<string | number>("all");

    const [isActiveAllPrice, setIsActiveAllPrice] = useState<boolean>(true);
    const [isActiveZeroPrice, setIsActiveZeroPrice] = useState<boolean>(false);
    const [isActiveHundredPrice, setIsActiveHundredPrice] = useState<boolean>(false);
    const [isActiveTwoHundredPrice, setIsActiveTwoHundredPrice] = useState<boolean>(false);
    const [isActiveThreeHundredPrice, setIsActiveThreeHundredPrice] = useState<boolean>(false);
    const [isActiveFourHundredPrice, setIsActiveFourHundredPrice] = useState<boolean>(false);
    useEffect(() => {
        if (activeCategory === "all") {
            setProducts(products);
        } else {
            setProducts([...products].filter((el) => el.type.name === activeCategory));
        }
    }, [activeCategory, setProducts]);

    useEffect(() => {
        setProducts(() => {
            const arr: IProduct[] = [];
            if (isActiveAllPrice) {
                return products;
            }
            if (isActiveZeroPrice) {
                arr.push(
                    ...[...products].filter((el) =>
                        el.discountPrice ? el.discountPrice < 100 : el.price < 100,
                    ),
                );
            }
            if (isActiveHundredPrice) {
                arr.push(
                    ...[...products].filter((el) =>
                        el.discountPrice
                            ? el.discountPrice >= 100 && el.discountPrice < 200
                            : el.price >= 100 && el.price < 200,
                    ),
                );
            }
            if (isActiveTwoHundredPrice) {
                arr.push(
                    ...[...products].filter((el) =>
                        el.discountPrice
                            ? el.discountPrice >= 200 && el.discountPrice < 300
                            : el.price >= 200 && el.price < 300,
                    ),
                );
            }
            if (isActiveThreeHundredPrice) {
                arr.push(
                    ...[...products].filter((el) =>
                        el.discountPrice
                            ? el.discountPrice >= 300 && el.discountPrice < 400
                            : el.price >= 300 && el.price < 400,
                    ),
                );
            }
            if (isActiveFourHundredPrice) {
                arr.push(
                    ...[...products].filter((el) =>
                        el.discountPrice ? el.discountPrice >= 400 : el.price >= 400,
                    ),
                );
            }
            console.log(arr);
            return arr;
        });
    }, [
        isActiveAllPrice,
        isActiveZeroPrice,
        isActiveHundredPrice,
        isActiveTwoHundredPrice,
        isActiveThreeHundredPrice,
        isActiveFourHundredPrice,
    ]);
    return (
        <Wrapper>
            <TitleSection>
                <TitleIcon src={filterIcon.src} />
                <Title>Filter</Title>
            </TitleSection>
            <CategoriesSection>
                <CategoriesTitle>CATEGORIES</CategoriesTitle>
                <CategoriesBlock>
                    <CategoryText
                        onClick={() => setActiveCategory("all")}
                        $active={activeCategory === "all"}>
                        All Rooms
                    </CategoryText>
                    {types?.map((el, index) => {
                        return (
                            <CategoryText
                                onClick={() => setActiveCategory(el.name)}
                                $active={activeCategory === el.name}
                                key={index}>
                                {el.name}
                            </CategoryText>
                        );
                    })}
                </CategoriesBlock>
            </CategoriesSection>
            <PriceSection>
                <PriceTitle>PRICE</PriceTitle>
                <PriceBlock>
                    <PriceElement>
                        <PriceText
                            onClick={() => setActivePrice("all")}
                            $active={activePrice === "all"}>
                            All Price
                        </PriceText>
                        <CheckboxInput
                            setIsActive={setIsActiveAllPrice}
                            outlined={false}
                            isActive={isActiveAllPrice}
                        />
                    </PriceElement>
                    <PriceElement>
                        <PriceText onClick={() => setActivePrice(0)} $active={activePrice === 0}>
                            $0.00 - 99.99
                        </PriceText>
                        <CheckboxInput
                            setIsActive={setIsActiveZeroPrice}
                            outlined={false}
                            isActive={isActiveZeroPrice}
                        />
                    </PriceElement>
                    <PriceElement>
                        <PriceText
                            onClick={() => setActivePrice(100)}
                            $active={activePrice === 100}>
                            $100.00 - 199.99
                        </PriceText>
                        <CheckboxInput
                            setIsActive={setIsActiveHundredPrice}
                            outlined={false}
                            isActive={isActiveHundredPrice}
                        />
                    </PriceElement>
                    <PriceElement>
                        <PriceText
                            onClick={() => setActivePrice(200)}
                            $active={activePrice === 200}>
                            $200.00 - 299.99
                        </PriceText>
                        <CheckboxInput
                            setIsActive={setIsActiveTwoHundredPrice}
                            outlined={false}
                            isActive={isActiveTwoHundredPrice}
                        />
                    </PriceElement>
                    <PriceElement>
                        <PriceText
                            onClick={() => setActivePrice(300)}
                            $active={activePrice === 300}>
                            $300.00 - 399.99
                        </PriceText>
                        <CheckboxInput
                            setIsActive={setIsActiveThreeHundredPrice}
                            outlined={false}
                            isActive={isActiveThreeHundredPrice}
                        />
                    </PriceElement>
                    <PriceElement>
                        <PriceText
                            onClick={() => setActivePrice(400)}
                            $active={activePrice === 400}>
                            $400.00+
                        </PriceText>
                        <CheckboxInput
                            setIsActive={setIsActiveFourHundredPrice}
                            outlined={false}
                            isActive={isActiveFourHundredPrice}
                        />
                    </PriceElement>
                </PriceBlock>
            </PriceSection>
        </Wrapper>
    );
};
const PriceText = styled.p<{ $active: boolean }>`
    color: ${({ $active }) => ($active ? "#121212" : "#807E7E")};
    font-family: "Inter", sans-serif;
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    border-bottom: ${({ $active }) => ($active ? "solid 1px #121212" : "none")};
    cursor: pointer;
    width: fit-content;
`;
const PriceElement = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const PriceBlock = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
`;
const PriceTitle = styled.p`
    color: #121212;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
`;
const PriceSection = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
`;

const CategoryText = styled.p<{ $active: boolean }>`
    color: ${({ $active }) => ($active ? "#121212" : "#807E7E")};
    font-family: "Inter", sans-serif;
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    border-bottom: ${({ $active }) => ($active ? "solid 1px #121212" : "none")};
    cursor: pointer;
    width: fit-content;
`;
const CategoriesBlock = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
`;
const CategoriesTitle = styled.p`
    color: #121212;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
`;
const CategoriesSection = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    min-width: 262px;
`;
const TitleIcon = styled.img`
    width: 24px;
    height: 24px;
`;
const Title = styled.p`
    color: #121212;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
`;
const TitleSection = styled.section`
    display: flex;
    align-items: center;
    height: 38.5px;
    column-gap: 8px;
`;

export default ProductFilter;
