import { FC, UIEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProductCard from "@/app/_components/ProductCard";
import { IProduct } from "@/app/_types/types";

interface IProps {
    products: IProduct[];
}

const ProductCarousel: FC<IProps> = ({ products }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    return (
        <Wrapper
            ref={ref}
            $isScrollbarVisible={
                ref.current?.scrollWidth && ref.current?.clientWidth
                    ? ref.current?.scrollWidth > ref.current?.clientWidth
                        ? true
                        : false
                    : false
            }>
            {products?.map((product, index) => {
                return <ProductCard product={product} key={index} />;
            })}
        </Wrapper>
    );
};
const Wrapper = styled.div<{ $isScrollbarVisible: boolean }>`
    width: 100%;
    display: flex;
    padding-bottom: ${({ $isScrollbarVisible }) => ($isScrollbarVisible ? "48px" : 0)};
    column-gap: 24px;
    overflow: auto;
    &::-webkit-scrollbar {
        height: 4px;
        width: 1120px;
    }
    &::-webkit-scrollbar-track {
        background: #e8ecef;
    }
    &::-webkit-scrollbar-thumb {
        background: #343839;
    }
`;

export default ProductCarousel;
