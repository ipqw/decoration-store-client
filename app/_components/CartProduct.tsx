"use client";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ICartProduct, IProduct } from "../_types/types";
import Counter from "./Counter";
import crossIcon from "@/public/icons/cross.svg";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import { useAppSelector } from "@/store/hooks";

interface IProps {
    cartProducts: ICartProduct[];
    product: IProduct;
}

const CartProduct: FC<IProps> = ({ cartProducts, product }) => {
    const user = useAppSelector((state) => state.user);
    const [deleteCartProduct, { isLoading: isLoadingDeletingCartProduct }] =
        cartApiSlice.useDeleteCartProductMutation();
    const [createCartProduct, { isLoading: isLoadingCreatingCartProduct }] =
        cartApiSlice.useCreateCartProductMutation();
    const [counter, setCounter] = useState<number>(cartProducts.length);

    const color = product?.product_infos?.find((el) => el.name === "color")?.text;

    const deleteButtonHandler = () => {
        cartProducts.forEach((el) => {
            deleteCartProduct(el.id);
        });
    };
    useEffect(() => {
        if (counter > cartProducts.length) {
            if (!isLoadingCreatingCartProduct && user?.cart && product) {
                createCartProduct({ productId: product.id, cartId: user.cart.id, amount: 1 });
            }
        } else if (counter < cartProducts.length) {
            if (!isLoadingDeletingCartProduct && user?.cart && product) {
                deleteCartProduct(cartProducts[0].id);
            }
        }
    }, [counter]);
    return (
        <Wrapper>
            <LeftBlock>
                <ImageWrapper>
                    <Image alt="product image" src={product?.images ? product?.images[0] : ""} />
                </ImageWrapper>
                <InfoBlock>
                    <Title href={`./product/${product?.id}`}>{product?.name}</Title>
                    <ColorText>
                        Color: {color ? color[0].toUpperCase() + color.substring(1) : "undefined"}
                    </ColorText>
                    <Counter counter={counter} setCounter={setCounter} small />
                </InfoBlock>
            </LeftBlock>
            <PriceBlock>
                <PriceText>
                    $
                    {product?.discountPrice
                        ? (product?.discountPrice * counter).toString().split(".")[1]
                            ? product?.discountPrice * counter
                            : `${product?.discountPrice * counter}.00`
                        : (product?.price * counter).toString().split(".")[1]
                          ? product?.price * counter
                          : `${product?.price * counter}.00`}
                </PriceText>
                <DeleteButton onClick={deleteButtonHandler} src={crossIcon.src} />
            </PriceBlock>
        </Wrapper>
    );
};
const LeftBlock = styled.div`
    display: flex;
`;
const DeleteButton = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    user-select: none;
`;
const PriceText = styled.p`
    color: #121212;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    line-height: 22px;
    padding-bottom: 8px;
`;
const PriceBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 25px;
`;
const ColorText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
`;
const Title = styled.a`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    user-select: none;
    cursor: pointer;
`;
const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 96px;
    margin-right: 16px;
    background-color: #f3f5f7;
    user-select: none;
`;
const Wrapper = styled.div`
    display: flex;
    width: 365px;
    height: 144px;
    padding: 24px 0;
    border-bottom: 1px solid #e8ecef;
    justify-content: space-between;
`;

export default CartProduct;
