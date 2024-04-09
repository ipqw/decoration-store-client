export interface IUser {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName: string | null;
    imageUrl: string | null;
    role: string;
    cart?: ICart;
    wishlist?: IWishlist;
    reviews?: IReview[];
    likes?: ILike[];
    addresses?: IAddress[];
    orders?: IOrder[];
}

export interface IAddress {
    id: number;
    name: string;
    recipientName: string;
    phoneNumber: string;
    country: string;
    city: string;
    zipcode: string | null;
    street: string;
    houseNumber: number;
    userId: IUser["id"];
    orders?: IOrder[];
}

export interface IOrder {
    id: number;
    status: string;
    price: number;
    paymentMethod: string;
    addressId: IAddress["id"];
    userId: IUser["id"];
    order_products?: IOrderProduct[];
}
export interface IOrderProduct {
    id: number;
    orderId: IOrder["id"];
    productId: IProduct["id"];
}

export interface ICart {
    id: number;
    userId: IUser["id"];
    cart_products?: ICartProduct[];
}

export interface ICartProduct {
    id: number;
    productId: number;
    cartId: ICart["id"];
}
export interface IWishlist {
    id: number;
    userId: IUser["id"];
    wishlist_products?: IWishlistProduct[];
}
export interface IWishlistProduct {
    id: number;
    productId: number;
    wishlistId: IWishlist["id"];
}
export interface IProduct {
    id: number;
    name: string;
    images: string[] | null;
    averageRate: number;
    price: number;
    discountPrice: number | null;
    typeId: IType["id"];
    type: IType;
    createdAt: string;
    updatedAt: string;
    discount?: IDiscount;
    reviews?: IReview[];
    product_infos: IProductInfo[];
    product_group?: IProductGroup;
    cart_products?: ICartProduct[];
    wishlist_products?: IWishlistProduct[];
    order_products?: IOrderProduct[];
}
export interface IProductGroup {
    id: number;
    createdAt: string;
    updatedAt: string;
    products?: IProduct[];
}
export interface IDiscount {
    id: number;
    percent: number;
    startsIn: number;
    expiresIn: number;
    productId: number;
}
export interface IProductInfo {
    id: number;
    name: string;
    text: string;
}
export interface IType {
    id: number;
    name: string;
    products?: IProduct[];
}
export interface IReview {
    id: number;
    rate: number;
    text: string;
    userId: number;
    productId: number;
}
export interface ILike {
    id: number;
    userId: IUser["id"];
    reviewId: IReview["id"];
}
