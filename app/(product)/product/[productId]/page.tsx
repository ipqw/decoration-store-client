"use client";
import { productApiSlice } from "@/store/services/productApiSlice";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import ImageSlider from "../../_components/ImageSlider";
import emptyStar from "@/public/icons/emptyStar.svg";
import fullStar from "@/public/icons/fullStar.svg";
import arrow from "@/public/icons/arrow.svg";
import wishlistIcon from "@/public/icons/product/Wishlist.svg";
import filledWishlistIcon from "@/public/icons/product/FilledWishlist.svg";
import Timer from "../../_components/Timer";
import Counter from "../../_components/Counter";
import { useRouter } from "next/navigation";
import { wishlistApiSlice } from "@/store/services/wishlistApiSlice";
import { cartApiSlice } from "@/store/services/cartApiSlice";
import Tabs from "../../_components/Tabs";
import { useAppSelector } from "@/store/hooks";
import ReviewsList from "../../_components/ReviewList";

interface IProps {
    params: { productId: string };
}

const ProductPage: FC<IProps> = ({ params }) => {
    const router = useRouter();
    const user = useAppSelector((state) => state.user);
    const [counter, setCounter] = useState<number>(0);
    const [isAddedToWishlistBtn, setIsAddedToWishlistBtn] = useState<boolean>(false);

    // queries
    const {
        data: product,
        isLoading,
        error: productError,
    } = productApiSlice.useGetOneProductQuery(Number(params.productId));

    // mutations
    const [createWishlistProduct, { isLoading: isLoadingCreateWishlistProduct }] =
        wishlistApiSlice.useCreateWishlistProductMutation();
    const [deleteWishlistProduct, { isLoading: isLoadingDeleteWishlistProduct }] =
        wishlistApiSlice.useDeleteWishlistProductMutation();

    const [createCartProduct, { isLoading: isLoadingCreateCartProduct }] =
        cartApiSlice.useCreateCartProductMutation();

    // set average rate of product
    const [averageRate, setAverageRate] = useState<number>(0);
    useEffect(() => {
        let sum = 0;
        product?.product_group?.reviews?.forEach((el) => {
            sum += el.rate;
        });
        setAverageRate(sum / Number(product?.product_group?.reviews?.length));
    }, [product]);

    const wishlistButtonHandler = () => {
        if (isAddedToWishlistBtn && user?.wishlist && product) {
            if (!isLoadingDeleteWishlistProduct) {
                deleteWishlistProduct({ productId: product.id, wishlistId: user.wishlist.id });
                setIsAddedToWishlistBtn(false);
            }
        } else {
            if (!isLoadingCreateWishlistProduct && product && user?.wishlist) {
                createWishlistProduct({ productId: product?.id, wishlistId: user.wishlist.id });
                setIsAddedToWishlistBtn(true);
            }
        }
    };
    const cartButtonHandler = () => {
        if (!isLoadingCreateCartProduct && user?.cart && product) {
            createCartProduct({ productId: product.id, cartId: user.cart.id, amount: counter });
            setCounter(0);
        }
    };

    // additional section
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <Wrapper $invisible={productError || !product ? true : false || isLoading}>
            <ProductSection>
                <ProductImages>
                    <ImageSlider backgroundColor="F3F5F7" product={product} />
                </ProductImages>
                <ProductInfoAside>
                    <ProductInfo>
                        <ProductRatingWrapper>
                            <StarsWrapper>
                                <Star src={averageRate >= 1 ? fullStar.src : emptyStar.src} />
                                <Star src={averageRate >= 2 ? fullStar.src : emptyStar.src} />
                                <Star src={averageRate >= 3 ? fullStar.src : emptyStar.src} />
                                <Star src={averageRate >= 4 ? fullStar.src : emptyStar.src} />
                                <Star src={averageRate == 5 ? fullStar.src : emptyStar.src} />
                            </StarsWrapper>
                            <ProductRatingText>
                                {product?.product_group?.reviews?.length}{" "}
                                {(product?.product_group?.reviews?.length || 0) > 1
                                    ? "Reviews"
                                    : "Review"}
                            </ProductRatingText>
                        </ProductRatingWrapper>
                        <ProductInfoTitle>{product?.name}</ProductInfoTitle>
                        <ProductInfoText>
                            {product?.product_infos?.find((el) => el.name === "about")?.text}
                        </ProductInfoText>
                        <ProductPriceWrapper>
                            <ProductPrice>
                                $
                                {product?.discountPrice
                                    ? product?.discountPrice.toString().split(".")[1]
                                        ? product?.discountPrice
                                        : `${product?.discountPrice}.00`
                                    : product?.price.toString().split(".")[1]
                                      ? product?.price
                                      : `${product?.price}.00`}
                            </ProductPrice>
                            <ProductOldPrice $invisible={product?.discountPrice ? false : true}>
                                $
                                {product?.price.toString().split(".")[1]
                                    ? product?.price
                                    : `${product?.price}.00`}
                            </ProductOldPrice>
                        </ProductPriceWrapper>
                    </ProductInfo>
                    <DiscountWrapper
                        $invisible={(Number(product?.discount?.expiresIn) || 0) - Date.now() < 0}>
                        <DiscountText>Offer expires in:</DiscountText>
                        <Timer time={product?.discount?.expiresIn || 0} />
                    </DiscountWrapper>
                    <MeasurementsWrapper>
                        <MeasurementsTitle>Measurements</MeasurementsTitle>
                        <MeasurementsText>
                            {product?.product_infos?.find((el) => el.name === "measurements")?.text}
                        </MeasurementsText>
                    </MeasurementsWrapper>
                    <ColorWrapper>
                        <ColorTitleWrapper>
                            <ColorTitle>Choose Color</ColorTitle>
                            <ColorIcon src={arrow.src} />
                        </ColorTitleWrapper>
                        <ColorText>
                            {`${product?.product_infos
                                ?.find((el) => el.name === "color")
                                ?.text[0].toLocaleUpperCase()}${product?.product_infos
                                ?.find((el) => el.name === "color")
                                ?.text.slice(1)}`}
                        </ColorText>
                        <ColorImagesWrapper>
                            <ColorImageWrapper $main>
                                <ColorImage src={product?.images ? product.images[0] : ""} />
                            </ColorImageWrapper>
                            {product?.product_group?.products?.map((el, index) => {
                                if (el.id === product.id) {
                                    return null;
                                }
                                return (
                                    <ColorImageWrapper
                                        onClick={() => {
                                            router.replace(el.id.toString());
                                        }}
                                        key={index}>
                                        <ColorImage src={el?.images ? el.images[0] : ""} />
                                    </ColorImageWrapper>
                                );
                            })}
                        </ColorImagesWrapper>
                    </ColorWrapper>
                    <AddProductBlock>
                        <AddProductTop>
                            <Counter counter={counter} setCounter={setCounter} />
                            <WishlistButton onClick={wishlistButtonHandler}>
                                {isAddedToWishlistBtn ? (
                                    <WishlistIcon src={filledWishlistIcon.src} />
                                ) : (
                                    <WishlistIcon src={wishlistIcon.src} />
                                )}
                                <WishlistText>Wishlist</WishlistText>
                            </WishlistButton>
                        </AddProductTop>
                        <CartButton onClick={cartButtonHandler}>
                            <CartText>Add to Cart</CartText>
                        </CartButton>
                    </AddProductBlock>
                    <CategoryWrapper>
                        <CategoryBlock>
                            <CategoryTitle>SKU</CategoryTitle>
                            <CategoryText>{product?.id}</CategoryText>
                        </CategoryBlock>
                        <CategoryBlock>
                            <CategoryTitle>Category</CategoryTitle>
                            <CategoryText>{product?.type?.name}</CategoryText>
                        </CategoryBlock>
                    </CategoryWrapper>
                </ProductInfoAside>
            </ProductSection>
            <AdditionalSection>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 2 && (
                    <ReviewsList
                        productGroup={product?.product_group}
                        averageRate={averageRate}
                        reviews={product?.product_group?.reviews || []}
                    />
                )}
            </AdditionalSection>
        </Wrapper>
    );
};
const AdditionalSection = styled.section`
    width: 1120px;
`;

const CategoryText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
`;
const CategoryTitle = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    width: 123px;
    text-align: left;
`;
const CategoryBlock = styled.div`
    display: flex;
`;
const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 24px;
    padding-bottom: 24px;
    border-top: 1px solid #e8ecef;
    row-gap: 8px;
`;

const CartText = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
    color: #ffffff;
`;
const CartButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    border-radius: 8px;
    height: 52px;
    background-color: #141718;
`;
const WishlistText = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
    color: #141718;
    margin-left: 8px;
`;
const WishlistIcon = styled.img`
    width: 24px;
    height: 24px;
`;
const WishlistButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 357px;
    height: 52px;
    border-radius: 8px;
    border: 1px solid #141718;
    user-select: none;
    cursor: pointer;
`;
const AddProductTop = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`;
const AddProductBlock = styled.div`
    margin-top: 48px;
    padding-bottom: 32px;
`;
const ColorImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    pointer-events: none;
    user-select: none;
`;
const ColorImageWrapper = styled.div<{ $main?: boolean }>`
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${({ $main }) => ($main ? "1px #141718 solid" : "none")};
    cursor: pointer;
    user-select: none;
`;
const ColorImagesWrapper = styled.div`
    display: flex;
    column-gap: 16px;
    margin-top: 16px;
`;
const ColorText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 20px;
    line-height: 32px;
    color: #000000;
    font-weight: 400;
    margin-top: 8px;
`;
const ColorIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-left: 4px;
`;
const ColorTitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const ColorTitle = styled.p`
    color: #6c7275;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    font-family: "Inter", sans-serif;
`;
const ColorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    cursor: default;
`;
const MeasurementsText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 20px;
    line-height: 32px;
    color: #000000;
    font-weight: 400;
`;
const MeasurementsTitle = styled.p`
    color: #6c7275;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    font-family: "Inter", sans-serif;
`;
const MeasurementsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 24px;
    row-gap: 8px;
    border-top: 1px solid #e8ecef;
`;
const DiscountText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color: #343839;
    padding-bottom: 7px;
`;
const DiscountWrapper = styled.div<{ $invisible: boolean }>`
    padding-top: 24px;
    padding-bottom: 24px;
    display: ${({ $invisible }) => ($invisible ? "none" : "flex")};
    flex-direction: column;
    border-top: 1px solid #e8ecef;
    row-gap: 12px;
`;
const ProductPrice = styled.p`
    color: #121212;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 28px;
    line-height: 34px;
`;
const ProductOldPrice = styled.p<{ $invisible: boolean }>`
    display: ${({ $invisible }) => ($invisible ? "none" : "block")};
    color: #6c7275;
    font-size: 20px;
    line-height: 28px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-decoration: line-through;
`;
const ProductPriceWrapper = styled.div`
    display: flex;
    column-gap: 12px;
    align-items: center;
`;
const ProductInfoText = styled.p`
    color: #6c7275;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
`;
const ProductInfo = styled.div`
    display: flex;
    row-gap: 16px;
    flex-direction: column;
    padding-bottom: 24px;
`;
const ProductInfoTitle = styled.p`
    color: #141718;
    font-family: "Poppins", sans-serif;
    font-size: 40px;
    line-height: 44px;
    font-weight: 500;
`;
const ProductRatingText = styled.p`
    color: #141718;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
`;
const ProductRatingWrapper = styled.div`
    display: flex;
    column-gap: 10px;
    align-items: center;
`;
const Star = styled.img`
    width: 16px;
    height: 16px;
`;
const StarsWrapper = styled.div`
    display: flex;
    column-gap: 2px;
    align-items: center;
`;
const ProductImages = styled.aside`
    width: fit-content;
    max-width: 547px;
`;
const ProductInfoAside = styled.aside`
    width: fit-content;
    max-width: 508px;
`;
const ProductSection = styled.section`
    display: flex;
    justify-content: center;
    column-gap: 63px;
`;

const Wrapper = styled.div<{ $invisible?: boolean }>`
    visibility: ${({ $invisible }) => ($invisible ? "hidden" : "visible")};
    border-top: 1px solid #f3f5f7;
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default ProductPage;
