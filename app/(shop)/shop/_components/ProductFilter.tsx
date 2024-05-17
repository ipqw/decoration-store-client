"use client";
import { IProduct } from "@/app/_types/types";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

import filterIcon from "@/public/icons/shop/filter.svg";
import firstGridIcon from "@/public/icons/shop/firstGridIcon.svg";
import secondGridIcon from "@/public/icons/shop/secondGridIcon.svg";
import thirdGridIcon from "@/public/icons/shop/thirdGridIcon.svg";
import fourthGridIcon from "@/public/icons/shop/fourthGridIcon.svg";
import { typeApiSlice } from "@/store/services/typeApiSlice";
import CheckboxInput from "@/app/_components/CheckboxInput";
import Dropdown from "./Dropdown";
import {
    GridButton,
    GridButtonIcon,
    GridButtonsBlock,
    SettingsBlock,
    SortBlock,
    SortText,
} from "./ProductGrid";

interface IProps {
    products: IProduct[];
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
    activeCategory: string;
    setActiveCategory: Dispatch<SetStateAction<string>>;
    activeGridButton: number;
    setActiveGridButton: Dispatch<SetStateAction<number>>;
}

const ProductFilter: FC<IProps> = ({
    products,
    setProducts,
    activeCategory,
    setActiveCategory,
    activeGridButton,
    setActiveGridButton,
}) => {
    // queries
    const { data: types } = typeApiSlice.useGetAllTypesQuery(null);

    // hooks
    const [activePrice, setActivePrice] = useState<{ text: string; value: string }>({
        text: "All Price",
        value: "all",
    });

    const [isActiveAllPrice, setIsActiveAllPrice] = useState<boolean>(true);
    const [isActiveZeroPrice, setIsActiveZeroPrice] = useState<boolean>(false);
    const [isActiveHundredPrice, setIsActiveHundredPrice] = useState<boolean>(false);
    const [isActiveTwoHundredPrice, setIsActiveTwoHundredPrice] = useState<boolean>(false);
    const [isActiveThreeHundredPrice, setIsActiveThreeHundredPrice] = useState<boolean>(false);
    const [isActiveFourHundredPrice, setIsActiveFourHundredPrice] = useState<boolean>(false);

    const [isCategoryDropdownOpened, setIsCategoryDropdownOpened] = useState<boolean>(false);

    const [isPriceDropdownOpened, setIsPriceDropdownOpened] = useState<boolean>(false);
    useEffect(() => {
        if (activeCategory === "All Rooms") {
            setProducts(products);
        } else {
            setProducts([...products].filter((el) => el.type.name === activeCategory));
        }
    }, [activeCategory, setProducts]);

    const setFiltersToDefault = () => {
        setIsActiveAllPrice(false);
        setIsActiveZeroPrice(false);
        setIsActiveHundredPrice(false);
        setIsActiveTwoHundredPrice(false);
        setIsActiveThreeHundredPrice(false);
        setIsActiveFourHundredPrice(false);
    };
    useEffect(() => {
        switch (activePrice.value) {
            case "all":
                setFiltersToDefault();
                setIsActiveAllPrice(true);
                break;
            case "0":
                setFiltersToDefault();
                setIsActiveZeroPrice(true);
                break;
            case "100":
                setFiltersToDefault();
                setIsActiveHundredPrice(true);
                break;
            case "200":
                setFiltersToDefault();
                setIsActiveTwoHundredPrice(true);
                break;
            case "300":
                setFiltersToDefault();
                setIsActiveThreeHundredPrice(true);
                break;
            case "400":
                setFiltersToDefault();
                setIsActiveFourHundredPrice(true);
                break;
            default:
                break;
        }
    }, [activePrice]);

    // filtering
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
            <FirstVariation $isVisible={activeGridButton === 0}>
                <TitleSection>
                    <TitleIcon src={filterIcon.src} />
                    <Title>Filter</Title>
                </TitleSection>
                <CategoriesSection>
                    <CategoriesTitle>CATEGORIES</CategoriesTitle>
                    <CategoriesBlock>
                        <CategoryText
                            onClick={() => setActiveCategory("All Rooms")}
                            $active={activeCategory === "All Rooms"}>
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
                                onClick={() => setActivePrice({ text: "All Price", value: "all" })}
                                $active={activePrice.value === "all"}>
                                All Price
                            </PriceText>
                            <CheckboxInput
                                setIsActive={setIsActiveAllPrice}
                                outlined={false}
                                isActive={isActiveAllPrice}
                            />
                        </PriceElement>
                        <PriceElement>
                            <PriceText
                                onClick={() =>
                                    setActivePrice({ text: "$0.00 - 99.99", value: "0" })
                                }
                                $active={Number(activePrice) === 0}>
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
                                onClick={() =>
                                    setActivePrice({ text: "$100.00 - 199.99", value: "100" })
                                }
                                $active={Number(activePrice) === 100}>
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
                                onClick={() =>
                                    setActivePrice({ text: "$200.00 - 299.99", value: "200" })
                                }
                                $active={Number(activePrice) === 200}>
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
                                onClick={() =>
                                    setActivePrice({ text: "$300.00 - 399.99", value: "300" })
                                }
                                $active={Number(activePrice) === 300}>
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
                                onClick={() => setActivePrice({ text: "$400.00+", value: "400" })}
                                $active={Number(activePrice) === 400}>
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
            </FirstVariation>
            <SecondVariation $isVisible={activeGridButton > 0}>
                <DropdownsWrapper>
                    <DropdownWrapper>
                        <DropdownText>CATEGORIES</DropdownText>
                        <Dropdown
                            items={
                                types
                                    ? [
                                          { text: "All Rooms", value: "All Rooms" },
                                          ...types.map((el) => {
                                              return { text: el.name, value: el.name };
                                          }),
                                      ]
                                    : [{ text: "All Rooms", value: "All Rooms" }]
                            }
                            activeItem={activeCategory}
                            setCategoryActiveItem={setActiveCategory}
                            isOpened={isCategoryDropdownOpened}
                            setIsOpened={setIsCategoryDropdownOpened}
                        />
                    </DropdownWrapper>
                    <DropdownWrapper>
                        <DropdownText>PRICE</DropdownText>
                        <Dropdown
                            items={[
                                { text: "All Price", value: "all" },
                                { text: "$0.00 - 99.99", value: "0" },
                                { text: "$100.00 - 199.99", value: "100" },
                                { text: "$200.00 - 299.99", value: "200" },
                                { text: "$300.00 - 399.99", value: "300" },
                                { text: "$400.00+", value: "400" },
                            ]}
                            activeItem={activePrice}
                            setPriceActiveItem={setActivePrice}
                            isOpened={isPriceDropdownOpened}
                            setIsOpened={setIsPriceDropdownOpened}
                        />
                    </DropdownWrapper>
                </DropdownsWrapper>
                <SettingsBlock $isVisible={true}>
                    <SortBlock>
                        <SortText>Sort by</SortText>
                    </SortBlock>
                    <GridButtonsBlock>
                        <GridButton
                            onClick={() => setActiveGridButton(0)}
                            $active={activeGridButton === 0}>
                            <GridButtonIcon src={firstGridIcon.src} />
                        </GridButton>
                        <GridButton
                            onClick={() => setActiveGridButton(1)}
                            $active={activeGridButton === 1}>
                            <GridButtonIcon src={secondGridIcon.src} />
                        </GridButton>
                        <GridButton
                            onClick={() => setActiveGridButton(2)}
                            $active={activeGridButton === 2}>
                            <GridButtonIcon src={thirdGridIcon.src} />
                        </GridButton>
                        <GridButton
                            onClick={() => setActiveGridButton(3)}
                            $active={activeGridButton === 3}>
                            <GridButtonIcon src={fourthGridIcon.src} />
                        </GridButton>
                    </GridButtonsBlock>
                </SettingsBlock>
            </SecondVariation>
        </Wrapper>
    );
};
const DropdownsWrapper = styled.div`
    display: flex;
    column-gap: 24px;
`;
const DropdownText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 26px;
    font-weight: 600;
    color: #6c7275;
`;
const DropdownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
`;
const SecondVariation = styled.div<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    justify-content: space-between;
    align-items: flex-end;
`;
const FirstVariation = styled.div<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    flex-direction: column;
    row-gap: 32px;
    min-width: 262px;
`;
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
const Wrapper = styled.div``;
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