// export interface IUser {
//     id: CreationOptional<number>;
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     displayName: string | null;
//     imageUrl: string | null;
//     role: string;
//     cart?: CartModel;
//     wishlist?: WishlistModel;
//     reviews?: ReviewModel[];
//     likes?: LikeModel[];
//     addresses?: AddressModel[];
//     orders?: OrderModel[];
// }

// export interface AddressModel
//     extends Model<
//         InferAttributes<AddressModel>,
//         InferCreationAttributes<AddressModel>
//     > {
//     id: CreationOptional<number>;
//     name: string;
//     recipientName: string;
//     phoneNumber: string;
//     country: string;
//     city: string;
//     zipcode: string | null;
//     street: string;
//     houseNumber: number;
//     userId: ForeignKey<UserModel['id']>;
//     orders?: OrderModel[];
// }

// export interface OrderModel
//     extends Model<
//         InferAttributes<OrderModel>,
//         InferCreationAttributes<OrderModel>
//     > {
//     id: CreationOptional<number>;
//     status: string;
//     price: number;
//     paymentMethod: string;
//     addressId: ForeignKey<AddressModel['id']>;
//     userId: ForeignKey<UserModel['id']>;
//     order_products?: OrderProductModel[];
// }
// export interface OrderProductModel
//     extends Model<
//         InferAttributes<OrderProductModel>,
//         InferCreationAttributes<OrderProductModel>
//     > {
//     id: CreationOptional<number>;
//     orderId: ForeignKey<OrderModel['id']>;
//     productId: ForeignKey<ProductModel['id']>;
// }

// export interface CartModel
//     extends Model<
//         InferAttributes<CartModel>,
//         InferCreationAttributes<CartModel>
//     > {
//     id: CreationOptional<number>;
//     userId: ForeignKey<UserModel['id']>;
//     cart_products?: CartProductModel[];
// }

// export interface CartProductModel
//     extends Model<
//         InferAttributes<CartProductModel>,
//         InferCreationAttributes<CartProductModel>
//     > {
//     id: CreationOptional<number>;
//     productId: number;
//     cartId: ForeignKey<CartModel['id']>;
// }
// export interface WishlistModel
//     extends Model<
//         InferAttributes<WishlistModel>,
//         InferCreationAttributes<WishlistModel>
//     > {
//     id: CreationOptional<number>;
//     userId: ForeignKey<UserModel['id']>;
//     wishlist_products?: WishlistProductModel[];
// }
// export interface WishlistProductModel
//     extends Model<
//         InferAttributes<WishlistProductModel>,
//         InferCreationAttributes<WishlistProductModel>
//     > {
//     id: CreationOptional<number>;
//     productId: number;
//     wishlistId: ForeignKey<WishlistModel['id']>;
// }
export interface IProduct {
    id: number;
    name: string;
    images: string[] | null;
    averageRate: number;
    price: number;
    discountPrice: number | null;
    typeId: number;
    createdAt: string;
    updatedAt: string;
    discount?: IDiscount;
    reviews?: IReview[];
    product_infos: IProductInfo[];
    // cart_products?: CartProductModel[];
    // wishlist_products?: WishlistProductModel[];
    // order_products?: OrderProductModel[];
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
// export interface TypeModel
//     extends Model<
//         InferAttributes<TypeModel>,
//         InferCreationAttributes<TypeModel>
//     > {
//     id: CreationOptional<number>;
//     name: string;
// }
export interface IReview {
    id: number;
    rate: number;
    text: string;
    userId: number;
    productId: number;
}
// export interface LikeModel
//     extends Model<
//         InferAttributes<LikeModel>,
//         InferCreationAttributes<LikeModel>
//     > {
//     id: CreationOptional<number>;
//     userId: ForeignKey<UserModel['id']>;
//     reviewId: ForeignKey<ReviewModel['id']>;
// }
