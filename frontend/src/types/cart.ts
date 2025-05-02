export interface CartItem{
    cartItemsId: string,
    quantity: number,
    product: {
        productId: string,
        subCategory: {
            name: string
        },
        name: string,
        price: number,
        mainImage: string
    }
}